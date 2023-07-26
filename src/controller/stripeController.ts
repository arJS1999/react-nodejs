const router = require("express").Router();
const crypto = require("crypto");
import { NextFunction, Request, Response } from "express";
require("dotenv").config();

const Stripe = require("stripe");
const stripe = Stripe(`${process.env.STRIPE_ID}`);

let endpointSecret;
endpointSecret =
  "whsec_004080a6d6e5ea88fcd7221a04a02e45bde273e31ed5c462d5abd3f02d0f71ce";
import { Orderdata } from "../entity/Order";
import { OrderAddress } from "../entity/OrderAddress";
import { User } from "../entity/User";
import { Promotion } from "../entity/Coupon";
import AppDataSource from "../data-source";
import jwt = require("jsonwebtoken");

export default class PaymentClass {
  async orderPayment(req: Request, res: Response) {
    console.log("cartdetail", req.body);
    const data = req.body;
    console.log("userid", res.locals.jwtPayload.userid);
    const customer = await stripe.customers.create({
      metadata: {
        userId: res.locals.jwtPayload.userid,
      },
    });
    let percent: number, promocode: string;
    await AppDataSource.getRepository(Promotion)
      .find()
      .then((result) => {
        promocode = result[0].promo_code;
        // percent = result[0].percentage;
        percent = 25; //not a database percentage
        console.log("promocode", promocode, percent);
      })
      .catch((err) => {
        console.log(err);
      });
    const coupon = await stripe.coupons.create({ percent_off: percent });
    const couponid = coupon.id;
    console.log("coupon", couponid);
    try {
      const promotionCode = await stripe.promotionCodes.create({
        coupon: couponid,
        code: promocode,
      });
    } catch (err) {
      console.log(err);
    }
    const line_items = data.map((item) => {
      return {
        price_data: {
          currency: "inr",
          product_data: {
            name: item.cart_name,
            images: [item.cart_image],
            metadata: {
              id: item.cart_id,
            },
          },
          // coupon: 'VIPCODE',

          unit_amount: item.cart_price * 100,
        },
        quantity: item.cart_quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      shipping_address_collection: {
        allowed_countries: ["IN"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 0,
              currency: "inr",
            },
            display_name: "Free shipping",
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 5,
              },
              maximum: {
                unit: "business_day",
                value: 7,
              },
            },
          },
        },
      ],
      line_items,
      customer: customer.id,
      phone_number_collection: {
        enabled: true,
      },
      mode: "payment",
      // discounts: [{
      //   coupon: '{{123}}',
      // }],
      allow_promotion_codes: true,
      success_url: "http://localhost:4000/payment/success",
      cancel_url: "http://localhost:3000/payment/cancel",
    });

    res.send({ url: session.url });
  }

  async verifyPayment(request: Request, response: Response) {
    const order = async (orderdetail, customerdetail) => {
      console.log("customer", customerdetail);
      console.log("order", orderdetail);

      const address: any = {
        city: customerdetail.address.city,
        country: customerdetail.address.country,
        line1: customerdetail.address.line1,
        line2: customerdetail.address.line2,
        postal_code: customerdetail.address.postal_code,
        state: customerdetail.address.state,
      };
      console.log("address", address);
      let orderDetail: any = [];
      let cartdet;
      const order_email = customerdetail.email;
      const order_phone = customerdetail.phone;
      const order = orderdetail.metadata.userId;
      await AppDataSource.getRepository(User)
        .findOne({ where: { id: order }, relations: ["userid"] })
        .then((result) => {
          console.log(result);
          cartdet = result.userid;
        })
        .catch((err) => console.log(err));
      console.log("orderdetail");
      console.log("cartdet:", cartdet);
      const orderModel = new Orderdata();
      const addressmodel = new OrderAddress();
      cartdet.map(async (item: any) => {
        orderModel.order_name = item.cart_name;
        orderModel.order_image = item.cart_image;
        orderModel.order_total = item.cart_quantity * item.cart_price;
        orderModel.order_email = order_email;
        orderModel.order_phone = order_phone;
        addressmodel.address = address;
        addressmodel.order_detail = order;
        orderModel.order = order;
        await AppDataSource.getRepository(Orderdata).save(orderModel);
        await AppDataSource.getRepository(OrderAddress).save(addressmodel);
      });
      console.log("order Data", orderModel);
      console.log("address Data", addressmodel);
      // try {
      //   console.log("Order detail", orderModel);
      // AppDataSource.getRepository(Orderdata).save(orderModel);
      // AppDataSource.getRepository(OrderAddress).save(addressmodel);
      // } catch (err) {
      //   console.log(err);
      // } // orderDetail.push({order_name,order_image,order_total});

      console.log("finaladdress:", address);
      console.log("finalorder:", order_email, order_phone, order);
      return;
      const ordermodel = new Orderdata();
      ordermodel.order_name = orderDetail[0].order_name;
      ordermodel.order_image = orderDetail[0].order_image;
      ordermodel.order_total = orderDetail[0].order_total;
      ordermodel.order_email = order_email;
      ordermodel.order_phone = order_phone;
      ordermodel.order = order;
      console.log("order:", ordermodel);

      try {
        console.log("Order detail", ordermodel);
        await AppDataSource.getRepository(Orderdata).save(ordermodel);
      } catch (err) {
        console.log(err);
      }
    };

    const payloadString = JSON.stringify(request.body);
    const secret =
      "whsec_004080a6d6e5ea88fcd7221a04a02e45bde273e31ed5c462d5abd3f02d0f71ce";
    const header = stripe.webhooks.generateTestHeaderString({
      payload: payloadString,
      secret,
    });
    let event;
    if (endpointSecret) {
      let signature = request.headers["stripe-signature"];
      try {
        event = stripe.webhooks.constructEvent(payloadString, header, secret);
        console.log("event", event);
        console.log("hooks verified");
      } catch (err) {
        console.log(` Webhook signature verification failed.`, err.message);
        return response.sendStatus(400);
      }
    }
    console.log("ent", event.type);
    let type = event.type;
    let data = event.data.object;
    let data1 = data.customer_details;
    if (type == "checkout.session.completed") {
      stripe.customers
        .retrieve(data.customer)
        .then((customer) => {
          console.log("orderdet:", customer);
          console.log("customerdet:", data1);
          console.log("object", data);
          order(customer, data1);
        })
        .catch((err) => console.log(err.message));
    }
    response.send().end();
  }
}

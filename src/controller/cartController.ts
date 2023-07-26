import { NextFunction, Request, Response } from "express";
import { Cart } from "../entity/Cart";
import { User } from "../entity/User";
import jwt = require("jsonwebtoken");
import AppDataSource from "../data-source";

export default class CartClass {
  async cartRelation(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization.split(" ")[1];
    const token1 = JSON.parse(token);
    console.log(token1);
    let jwtPayload;
    try {
      jwtPayload = jwt.verify(token1, "secret");
      console.log("pay", jwtPayload);
      res.locals.jwtPayload = jwtPayload;
      console.log("final", jwtPayload);
      const userid = jwtPayload.userid;
      console.log(userid);
      res.setHeader("token", jwtPayload);
      const root = await AppDataSource.getRepository(User).find({
        where: { id: userid },
        relations: ["userid"],
      });

      res.send(root);
    } catch (err) {
      res.status(401).send();
      return;
    }
  }

  async addCart(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization.split(" ")[1];
    const token1 = JSON.parse(token);
    console.log(token1);
    let jwtPayload;

    jwtPayload = jwt.verify(token1, "secret");
    console.log("pay", jwtPayload);
    res.locals.jwtPayload = jwtPayload;
    console.log("final", jwtPayload);
    const userid = jwtPayload.userid;
    console.log(userid);
    const email = jwtPayload.email;
    console.log(email);
    console.log("name", req.body.image);
    const cart_name1 = req.body.name;
    // const cart1 = await AppDataSource.getRepository(User).find({
    //   where: { id: userid },
    //   relations: ["userid"],
    // });
    const cart1 = await AppDataSource.getRepository(Cart).findOne({
      where: { user_email: email, cart_name: cart_name1 },
    });
    console.log("finalresponse", cart1);
    console.log("find cart", typeof cart1);
    if (cart1 != null) {
      console.log("already", cart1);
      console.log(typeof cart1);
      cart1.cart_quantity = cart1.cart_quantity + 1;
      const addcart1 = await AppDataSource.getRepository(Cart).save(cart1);
      res.send(addcart1);
    } else {
      console.log("newly added");
      const cart = new Cart();
      cart.cart_name = req.body.name;
      cart.cart_price = req.body.price;
      cart.cart_image = req.body.image;
      cart.cart_quantity = 1;
      cart.user_email = email;
      cart.cart = userid;
      console.log("cart", cart);
      var CartRepository = AppDataSource.getRepository(Cart);
      const addcart = await CartRepository.save(cart);
      console.log(addcart);
      res.send(addcart);
    }
  }

  async incQuantity(req: Request, res: Response, next: NextFunction) {
    const updateid = req.body.id;
    console.log("quantity", updateid);
    const updatedata = {
      cart_quantity: req.body.quantity,
    };
    console.log("dataupdate", updatedata);
    var CartRepository = AppDataSource.getRepository(Cart);
    await CartRepository.update(updateid, updatedata)
      .then((response) => {
        res.json({
          response,
        });
      })
      .catch((error) => {
        res.json({
          error,
        });
      });
  }

  async decQuantity(req: Request, res: Response, next: NextFunction) {
    const updateid = req.body.id;
    console.log("quantity", updateid);
    const updatedata = {
      cart_quantity: req.body.quantity,
    };
    console.log("dataupdate", updatedata);
    var CartRepository = AppDataSource.getRepository(Cart);
    await CartRepository.update(updateid, updatedata)
      .then((response) => {
        res.json({
          response,
        });
      })
      .catch((error) => {
        res.json({
          error,
        });
      });
  }

  async deleteCart(req: Request, res: Response) {
    const getid = req.params.id;
    let root = AppDataSource.getRepository(Cart);
    await root
      .delete(getid)
      .then((result) => {
        res.json({
          status: true,
          result: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  }
}

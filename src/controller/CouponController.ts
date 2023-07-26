import { NextFunction, Request, Response } from "express";
import { Promotion } from "../entity/Coupon";
import AppDataSource from "../data-source";

export default class CouponClass {
  async addCoupon(req: Request, res: Response, next: NextFunction) {
    const promotion = new Promotion();
    var PromotionRepository = AppDataSource.getRepository(Promotion);
    promotion.promo_code = req.body.code;
    promotion.percentage = req.body.percentage;
    await PromotionRepository.save(promotion)
      .then((result) => {
        res.json({
          msg: "PromotionCode Created",
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

  async getCoupon(req: Request, res: Response, next: NextFunction) {
    let root = await AppDataSource.getRepository(Promotion);
    await root
      .find()
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

  async updateCoupon(req: Request, res: Response, next: NextFunction) {
    console.log(req.body);
    const updateid = req.body.id;
    const updatedata = {
      promo_code: req.body.promo_code,
    };
    var CartRepository = AppDataSource.getRepository(Promotion);
    await CartRepository.update(updateid, updatedata)
      .then((response) => {
        res.json({
          result: response,
        });
      })
      .catch((error) => {
        res.json({
          error,
        });
      });
  }
}

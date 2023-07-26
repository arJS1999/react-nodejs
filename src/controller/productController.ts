import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import { Category } from "../entity/Category";
import { Product } from "../entity/Product";
import AppDataSource from "../data-source";
import { Review } from "../entity/Review";
import { count } from "console";
import { check, validationResult } from "express-validator";
import { Like } from "typeorm";
import { createClient } from "redis";

export default class ProductClass {
  // async filter(req: Request, res: Response) {
  //   AppDataSource.getRepository(Product).createQueryBuilder("products")
  //   .
  // }
  async ordering(req: Request, res: Response) {
    AppDataSource.getRepository(Product)
      .createQueryBuilder("products")
      .orderBy("products.product_order")
      .getMany()
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

  async paginateOrdering(req: Request, res: Response) {
    const take: any = req.query.limit;
    const skip1: any = req.query.page;
    console.log(take, skip1);
    AppDataSource.getRepository(Product)
      .createQueryBuilder("products")
      .orderBy("products.product_order")
      .skip(skip1 * take)
      .take(take)
      .getManyAndCount()
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

  async searchProduct(req: Request, res: Response) {
    const catename = req.params.name;

    await AppDataSource.getRepository(Product)
      .findAndCountBy({ product_name: Like(`%${catename}%`) })
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

  async updateOrder(req: Request, res: Response, next: NextFunction) {
    console.log(req.body.id, req.body.product_order);
    const updateid = req.body.id;
    const updatedata = {
      product_order: req.body.product_order,
    };
    var CartRepository = AppDataSource.getRepository(Product);
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

  async singleProduct(req: Request, res: Response) {
    const id = req.params.name;
    const review = await AppDataSource.getRepository(Review)
      .createQueryBuilder("review")
      .select("AVG(review.review_rating)", "rating")
      .where("review.reviewid=:id", { id })
      .getRawOne();
    await AppDataSource.getRepository(Product)
      .find({ relations: ["reviewid"], where: { id: +id } })

      .then((result) => {
        res.json({
          status: true,
          result: result,
          rating: review,
          // rat:review1
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  }

  async getProduct(req: Request, res: Response) {
    try {
      const client = createClient();
      client.on("error", (err) => console.log("redis err", err));
      await client.connect();
      const keydata = "key";
      const CacheData = await client.get(keydata);
      if (CacheData) {
        console.log("Cache Hit");
        return res.json({ status: JSON.parse(CacheData) });
      } else {
        console.log("Cache Miss");
        let root = AppDataSource.getRepository(Product);
        await root
          .find({ relations: ["product"] })
          .then((result: any) => {
            res.json({
              status: true,
              result: result,
            });
            client.set(keydata, JSON.stringify(result));
          })
          .catch((err) => {
            res.status(500).json({
              error: err,
            });
          });
      }
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  async getProduct1(req: Request, res: Response) {
    let take: any = req.query.limit;
    let skip1: any = req.query.page;
    console.log(take, skip1);
    let root = AppDataSource.getRepository(Product);
    await root
      .findAndCount({ relations: ["product"], take, skip: skip1 * take })
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

  async updateProduct(req: Request, res: Response, next: NextFunction) {
    console.log(req.body);
    const updateid = req.body.id;
    const updatedata = {
      product_name: req.body.name,
      product_price: req.body.price,
      product_image: req.file.filename,
    };
    var CartRepository = AppDataSource.getRepository(Product);
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

  async deleteProduct(req: Request, res: Response) {
    const getid = req.params.id;
    let root = AppDataSource.getRepository(Product);
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

  async addProduct(req: Request, res: Response) {
    console.log(req.body);
    const error = validationResult(req);

    if (!error.isEmpty()) {
      const err = error.array();
      return res.json({ error: err });
    }
    console.log("image", req.file.filename);
    const product = new Product();
    product.product_name = req.body.name;
    product.product_price = req.body.price;
    product.product_image = req.file.filename;
    product.product = req.body.product_id;
    product.product_order = 1;
    // return;

    var ProductRepository = AppDataSource.getRepository(Product);
    await ProductRepository.save(product)
      .then((result) => {
        res.json({
          msg: "Product Created",
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

  async editProduct(req: Request, res: Response) {
    const id = req.params.id;
    await AppDataSource.getRepository(Product)
      .find({ where: { id: +id } })
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

  // async filter(req: Request, res: Response) {
  //   await AppDataSource.getRepository(Product);
  // }
}

import { NextFunction, Request, Response } from "express";
import { Category } from "../entity/Category";
import AppDataSource from "../data-source";
import { Like } from "typeorm";
import * as redis from "redis";
const { check, validationResult } = require("express-validator");

const redisUrl: any = "redis:/127.0.0.1:6379";
const client = redis.createClient(redisUrl);
export default class CategoryClass {
  async addCategory(req: Request, res: Response) {
    const category = new Category();

    category.category_name = req.body.name;
    console.log(category);
    var CateRepository = AppDataSource.getRepository(Category);
    const error = validationResult(req);
    if (!error.isEmpty()) {
      const err = error.array();
      return res.json({ error: err });
    }
    await CateRepository.save(category)
      .then((result) => {
        res.json({
          msg: "Category Created",
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

  async relation(req: Request, res: Response) {
    let root = await AppDataSource.getRepository(Category);
    await root
      .find({ relations: ["categoryid"] })
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

  async getCategory(req: Request, res: Response) {
    let root = await AppDataSource.getRepository(Category);
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

  async getPagination(req: Request, res: Response) {
    let take: any = req.query.limit;
    let skip1: any = req.query.page;
    console.log(take, skip1);
    let root = await AppDataSource.getRepository(Category);
    await root
      .findAndCount({ skip: skip1 * take, take })
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

  async editCategory(req: Request, res: Response) {
    const catename = req.params.name;
    await AppDataSource.getRepository(Category)
      .find({ where: { category_name: catename } })
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

  async searchCategory(req: Request, res: Response) {
    const catename = req.params.name;

    await AppDataSource.getRepository(Category)
      .findAndCountBy({ category_name: Like(`%${catename}%`) })
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

  async editCategory1(req: Request, res: Response) {
    const id = req.params.id;
    await AppDataSource.getRepository(Category)
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

  async updateCategory(req: Request, res: Response, next: NextFunction) {
    console.log(req.body);
    const updateid = req.body.id;
    const updatedata = {
      category_name: req.body.category_name,
    };
    var CartRepository = AppDataSource.getRepository(Category);
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

  async deleteCategory(req: Request, res: Response) {
    const getid = req.params.id;
    let root = AppDataSource.getRepository(Category);
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

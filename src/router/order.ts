import * as express from "express";
const router = express.Router();
import OrderClass from "../controller/orderController";

const obj = new OrderClass();

router.get("/orderrel", obj.orderRelation);

export = router;

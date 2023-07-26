import * as express from "express";
const router = express.Router();
import PaymentClass from "../controller/stripeController";
import { verifyToken } from "../middleware/jwtverify";

const obj = new PaymentClass();

router.post("/order", verifyToken, obj.orderPayment);
router.post("/verify", obj.verifyPayment);
// router.post('/orderdata'  ,obj.orderdata1);

export = router;

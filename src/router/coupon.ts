import * as express from "express";
const router = express.Router();
import CouponClass from "../controller/CouponController";

const obj = new CouponClass();

router.post("/addcoupon", obj.addCoupon);
router.patch("/updatecoupon", obj.updateCoupon);
router.get("/getcoupon", obj.getCoupon);
export = router;

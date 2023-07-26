import * as express from "express";
const router = express.Router();
import CartClass from "../controller/cartController";

const obj = new CartClass();

router.post("/addcart", obj.addCart);
router.post("/delcart/:id", obj.deleteCart);
router.get("/cartrel", obj.cartRelation);
router.post("/incupdate", obj.incQuantity);
router.post("/decupdate", obj.decQuantity);

export = router;

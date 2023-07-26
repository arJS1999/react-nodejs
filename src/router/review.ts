import * as express from "express";
const router = express.Router();
import ReviewClass from "../controller/reviewController";

const obj = new ReviewClass();

router.post("/addreview", obj.addReview);

export = router;

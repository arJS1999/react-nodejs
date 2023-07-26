import * as express from "express";
const router = express.Router();
import CategoryClass from "../controller/categoryController";
import { verifyToken } from "../middleware/jwtverify";
const { check, validationResult } = require("express-validator");

const obj = new CategoryClass();

router.post(
  "/addcategory",
  // [
  //   check("name", "Name length should be 5 to 20 characters")
  //     .isLength({ min: 5 })
  //     .isAlpha()
  //     .withMessage("Name must be alphabetic."),
  // ],
  obj.addCategory
);
router.get("/searchcategory/:name", obj.searchCategory);
router.get("/getcategory", obj.getCategory);
router.post("/delcategory/:id", obj.deleteCategory);
router.get("/editcategory/:name", obj.editCategory);
router.get("/editcategory1/:id", obj.editCategory1);
router.post("/updatecategory", obj.updateCategory);
router.get("/relation", obj.relation);
router.get("/getpagination", obj.getPagination);

export = router;

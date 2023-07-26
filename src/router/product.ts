import * as express from "express";
const router = express.Router();
import ProductClass from "../controller/productController";
import { verifyToken } from "../middleware/jwtverify";
const { check, validationResult } = require("express-validator");

const obj = new ProductClass();

router.post(
  "/addproduct",
  [
    check("name", "Name length should be 5 to 20 characters")
      .isLength({ min: 5 })
      .withMessage("Name must be alphabetic."),
    check("price", "Price should be greater than 1000").isInt({ gt: 1000 }),
    //   .isInt()
    //   .withMessage("Price Must be a integer"),
    check("product_id", "Product Id should between 0 to 5").isInt({
      gt: 0,
      lt: 5,
    }),
    //   .isInt()
    //   .withMessage("Product Id Must be a integer"),
    check("image")
      .custom((value, { req }) => {
        if (req.file.mimetype === "image/jpeg" && req.file.size < 1024 * 1024) {
          return ".jpg";
        } else {
          return false;
        }
      })
      .withMessage(
        "Please only choose jpg format and Image no longer 1MB size"
      ),
  ],
  obj.addProduct
);
router.get("/getproduct", obj.getProduct);
router.get("/searchproduct/:name", obj.searchProduct);
router.get("/ordering", obj.ordering);
router.get("/pagination", obj.paginateOrdering);
router.get("/editproduct/:id", obj.editProduct);
router.post("/updateorder", obj.updateOrder);
router.get("/getproduct1", obj.getProduct1);
router.post("/delproduct/:id", obj.deleteProduct);
router.post("/updateproduct", obj.updateProduct);
router.get("/singleproduct/:name", obj.singleProduct);

export = router;

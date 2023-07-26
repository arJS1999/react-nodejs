import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as multer from "multer";
import AppDataSource from "./data-source";
import userRouter = require("./router/user");
import cartRouter = require("./router/cart");
import payRouter = require("./router/stripe");
import cateRouter = require("./router/category");
import orderRouter = require("./router/order");
import productRouter = require("./router/product");
import reviewRouter = require("./router/review");
import mailRouter = require("./router/mail");
import couponRouter = require("./router/coupon");
import passwordRouter = require("./router/password");

import * as path from "path";

const app = express();
//app.use("/api", swaggerui.serve, swaggerui.setup(swaggerapi));
// app.get('/',obj.relation)

const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load(path.join(__dirname, './swagger.yaml'))

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

var session = require("express-session")({
  secret: "secret",
  resave: false,
  saveUninitialized: true,
});
app.use(session);
declare module "express-session" {
  export interface SessionData {
    users: string;
  }
}
app.use(function (req, res, next) {
  res.locals.users = req.session.users;
  next();
});
app.use(bodyParser.json());
app.use(cors());
app.use("/Images", express.static(path.join(__dirname, "Images")));

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    cb(null, "frontend/public/Images");
  },
  filename: async (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
app.use(multer({ storage: storage }).single("image"));

//route
app.use("/user", userRouter);
app.use("/cart", cartRouter);
app.use("/payment", payRouter);
app.use("/order", orderRouter);
app.use("/product", productRouter);
app.use("/category", cateRouter);
app.use("/review", reviewRouter);
app.use("/mail", mailRouter);
app.use("/coupon", couponRouter);
app.use("/password", passwordRouter);

AppDataSource.initialize()
  .then(async () => {
    console.log("Database connected");
  })
  .catch((error) => console.log(error));

export const server = app.listen(8000, () =>
  console.log("lisenting on port 8000")
);

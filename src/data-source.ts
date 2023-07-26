import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Category } from "./entity/Category";
import { Product } from "./entity/Product";
import { Cart } from "./entity/Cart";
import { Orderdata } from "./entity/Order";
import { OrderAddress } from "./entity/OrderAddress";
import { Review } from "./entity/Review";
import { Promotion } from "./entity/Coupon";
import { Password } from "./entity/Password";

const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "projectdb",
  entities: [
    User,
    Category,
    Product,
    Cart,
    Orderdata,
    Password,
    Promotion,
    OrderAddress,
    Review,
  ],
  synchronize: true,
  subscribers: [],
  migrations: [],
  cache: true,
});

export default AppDataSource;

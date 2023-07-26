import * as express from "express";
const router = express.Router();
import UserClass from "../controller/userController";

const obj = new UserClass();

router.post("/signup", obj.signUp);
router.post("/login", obj.login);
router.get("/getuser", obj.getUser);
router.post("/deluser/:id", obj.deleteUser);

export = router;

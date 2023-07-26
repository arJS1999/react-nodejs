import * as express from "express";
const router = express.Router();
import PasswordClass from "../controller/passwordController";

const obj = new PasswordClass();

router.post("/sendemail", obj.emailSend);
router.post("/updatepsw", obj.changePassword);

export = router;

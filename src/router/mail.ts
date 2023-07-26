import * as express from "express";
const router = express.Router();
import MailClass from "../controller/mailController";

const obj = new MailClass();

router.post("/sendmail", obj.sendMail);

export = router;

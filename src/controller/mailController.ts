import * as nodemailer from "nodemailer";
// mailtrap
import { NextFunction, Request, Response } from "express";
require("dotenv").config();
export default class MailClass {
  async sendMail(req: Request, res: Response) {
    console.log(req.body);
    const transporter = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: `${process.env.USER_ID}`,
        pass: `${process.env.USER_PASS}`,
      },
    });
    const mailOptions = {
      from: req.body.address,
      to: "abdul@gmail.com",
      subject: "Customer Query",
      text: req.body.message,
    };

    transporter.sendMail(mailOptions, async (err, info) => {
      if (err) {
        console.log(err);
        return err;
      }
      return res.status(200).json({
        message: "Email successfully sent.",
      });
    });
  }
}

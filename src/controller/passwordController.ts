import { NextFunction, Request, Response } from "express";
import { Password } from "../entity/Password";
import AppDataSource from "../data-source";
import { User } from "../entity/User";
import * as nodemailer from "nodemailer";
import bcrypt = require("bcryptjs");
require("dotenv").config();

export default class PasswordClass {
  async emailSend(req: Request, res: Response) {
    const sendMail = (email: string, otp: number) => {
      console.log("email", email, otp);
      const transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: `${process.env.USER_ID}`,
          pass: `${process.env.USER_PASS}`,
        },
      });
      const mailOptions = {
        from: "admin@gmail.com",
        to: email,
        subject: "OTP Authentication",
        html: `<h3>Your OTP is ${otp}</h3>`,
      };

      transporter.sendMail(mailOptions, async (err, info) => {
        if (err) {
          console.log(err);
          return err;
        }
        console.log("Email send");
      });
    };
    let data = await AppDataSource.getRepository(User).findOneBy({
      email: req.body.email,
    });
    console.log(data, req.body.email);
    if (data) {
      const otpcode = Math.floor(Math.random() * 10000);
      const pwd = new Password();
      pwd.code = otpcode;
      pwd.email = req.body.email;
      pwd.expireIn = new Date().getTime() + 300 * 1000;
      await sendMail(req.body.email, otpcode);

      await AppDataSource.getRepository(Password).save(pwd);
      res.status(200).json({ msg: "Please Check Email" });
    } else {
      res.status(200).json({ error: "Email Id not Exist" });
    }
  }

  async changePassword(req: Request, res: Response) {
    let data = await AppDataSource.getRepository(Password).findOneBy({
      code: req.body.code,
    });
    // console.log("check", data.email);
    if (data) {
      let current = new Date().getTime();
      let match = data.expireIn - current;
      console.log(match);
      if (match < 0) {
        res.json({ error: "Token expire" });
      } else {
        let userdata = await AppDataSource.getRepository(User).findOneBy({
          email: data.email,
        });
        const salt = await bcrypt.genSalt(10);
        var password = await bcrypt.hash(req.body.password, salt);
        userdata.password = password;
        // userdata.password = req.body.password;
        AppDataSource.getRepository(User).save(userdata);
        res.json({ message: "Password Changes Successfully" });
      }
    } else {
      res.json({ error: "Invalid OTP" });
    }
  }
}

import nodemailer from "nodemailer";
import { GMAIL_APP_PASSWORD, GMAIL_USER } from "../config/global.ts";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_APP_PASSWORD,
  },
});

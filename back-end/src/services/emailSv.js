import doten from "dotenv";
import moment from "moment";
doten.config();

import nodemailer from "nodemailer";

// async..await is not allowed in global scope, must use a wrapper

let transporter = nodemailer.createTransport({
  host: "Booking Health",
  port: 587,
  service: "Gmail",
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_APP_USERNAME, // generated ethereal user
    pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
  },
});


export async function sendVerifyCodeEmail(data) {
  let info = await transporter.sendMail({
    from: `"Booking Health 👻" <${process.env.EMAIL_APP_USERNAME}>`, // sender address
    to: `${data.email}`, // list of receivers
    subject: "Mã xác nhận tạo tài khoản mới tại Health Booking ", // Subject line
    text: `Dear ${data.name}`, // plain text body
    html: `
    <p>${data.name} thân mến !</p>
    <span>Đây là mã xác nhận tạo tài khoản mới tại Health Booking </span>  <br />
    <p>Mã của bạn là: <b>${data.token}</b> </p>  <br />
    <span>Nếu bạn không thực hiện việc tạo tài khoản. Hãy bỏ qua mail này </span>  <br />
    <span>Cảm ơn đã dùng dịch vụ của Health Booking</span>  <br />
    `, // html body
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

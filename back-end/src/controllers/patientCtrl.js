import { delay } from "../utils/commonUtils.js";
import User from "../schemas/User.js";
import Patient from "../schemas/Patient.js";
import { sendVerifyCodeEmail } from "../services/emailSv.js";
import { genOtp, verifyOtp } from "../utils/otp.js";

export async function resendOtpPatient(req, res) {
  let token = genOtp(req.query.email);
  await sendVerifyCodeEmail({
    email: req.query.email,
    name: req.query.name,
    token,
  });
  return res.status(200).json({ msg: "Đã gửi lại mã xác nhận" });
}

export async function checkCreatePatient(req, res) {
  await delay(1000);
  if (!req.query.username || !req.query.email)
    return res.status(400).json({ msg: "Thiếu thông tin" });
  let checkUser = await User.findOne({ username: req.query.username });
  let checkPatient = await Patient.findOne({ email: req.query.email });
  if (checkPatient) {
    return res.status(400).json({ msg: "Email đã tồn tại" });
  }
  if (checkUser) {
    return res.status(400).json({ msg: "Tên tài khoản đã tồn tại" });
  }
  let token = genOtp(req.query.email);
  await sendVerifyCodeEmail({
    email: req.query.email,
    name: req.query.name,
    token,
  }).catch((e) => {});
  return res.status(200).json({ msg: "Tài khoản hợp lệ" });
}

export async function createPatient(req, res) {
  await delay(1000);
  if (!req.body.token || !req.body.email)
    return res.status(400).json({ msg: "Thiếu thông tin" });

  let verify = verifyOtp(req.body.token, req.body.email);
  if (!verify) return res.status(400).json({ msg: "Mã xác nhận không đúng" });
  const newPatient = new Patient({
    name: req.body.name,
    age: req.body.age,
    address: req.body.address,
    phone: req.body.phone,
    email: req.body.email,
    gender: req.body.gender,
  });
  const newUser = new User({
    username: req.body.username,
    password: req.body.pass,
    role: "patient",
    patient: newPatient._id,
  });
  newPatient.user = newUser._id;
  await newPatient.save();
  await newUser.save();

  return res.status(200).json({ msg: "Tạo tài khoản thành công" });
}

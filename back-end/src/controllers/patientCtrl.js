import { delay } from "../utils/commonUtils.js";
import User from "../schemas/User.js";
import Patient from "../schemas/Patient.js";
import { sendVerifyCodeEmail } from "../services/emailSv.js";
import { genOtp, verifyOtp } from "../utils/otp.js";
import Booking from "../schemas/Booking.js";
import Schedule from "../schemas/Schedule.js";



export async function deleteBooking(req, res) {
  console.log(req.query);
  await delay(1000);
  if (!req.query._id) return res.status(400).json({ msg: "Thiếu thông tin" });
  try {
    await Booking.findByIdAndDelete(req.query._id);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ msg: `Đã hủy lịch khám không thành công ` });
  }
  return res.status(200).json({ msg: `Đã hủy lịch khám thành công  ` });
}

export async function createBookingLab(req, res) {
  await delay(1000);
  if (!req.body.patient || !req.body.lab || !req.body.record)
    return res.status(400).json({ msg: "Thiếu thông tin" });
  try {
    console.log(req.body);
    let checkbooking = await Booking.findOne({
      lab: req.body.lab,
      record: req.body.record,
      patient: req.body.patient,
    });
    if (!checkbooking) {
      let booking = new Booking({
        lab: req.body.lab,
        record: req.body.record,
        patient: req.body.patient,
        hour: req.body.hour,
        date: req.body.date,
        // services:
        status: req.body.status,
      });
      await booking.save();
    }
    if (checkbooking) {
      checkbooking.hour = req.body.hour;
      checkbooking.date = req.body.date;
      await checkbooking.save();
    }
  } catch (e) {
    console.log(e);
    return res.status(400).json({ msg: `Đã đặt lịch khám không thành công ` });
  }
  return res.status(200).json({ msg: `Đã đặt lịch khám thành công  ` });
}

export async function createBooking(req, res) {
  await delay(1000);
  if (!req.body.patient || !req.body.schedule || !req.body.services)
    return res.status(400).json({ msg: "Thiếu thông tin" });
  try {
    console.log(req.body);
    let checkBooking = await Booking.findOne({
      patient: req.body.patient,
      hour: req.body.schedule.hour,
      date: req.body.schedule.date,
      doctor: req.body.doctor,
      clinic: req.body.clinic,
    });
    if (checkBooking)
      return res.status(400).json({ msg: `Đã tồn tại lịch khám vào giờ này` });
    let booking = new Booking({
      clinic: req.body.clinic,
      patient: req.body.patient,
      services: req.body.services,
      hour: req.body.schedule.hour,
      date: req.body.schedule.date,
      doctor: req.body.doctor,
      status: req.body.status,
    });
    await booking.save();
  } catch (e) {
    console.log(e);
    return res.status(400).json({ msg: `Đã đặt lịch khám không thành công ` });
  }
  return res.status(200).json({ msg: `Đã đặt lịch khám thành công  ` });
}

export async function editProfile(req, res) {
  await delay(1000);
  if (!req.body._id) return res.status(400).json({ msg: "Thiếu thông tin" });
  try {
    await Patient.findByIdAndUpdate(req.body._id, {
      name: req.body.name,
      age: req.body.age,
      address: req.body.address,
      phone: req.body.phone,
      gender: req.body.gender,
      image: req.body.image,
    });
  } catch (e) {
    console.log(e);
    return res
      .status(400)
      .json({ msg: `Đã lưu không thành công thông tin cá nhân` });
  }
  return res.status(200).json({ msg: `Đã lưu thành công thông tin cá nhân ` });
}

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

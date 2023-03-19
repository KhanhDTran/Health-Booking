import { delay } from "../utils/commonUtils.js";
import Booking from "../schemas/Booking.js";
import Record from "../schemas/Record.js";
import Result from "../schemas/Result.js";

export async function indicateLabs(req, res) {
  await delay(1000);
  if (!req.body._id) return res.status(400).json({ msg: "Thiếu thông tin" });
  try {
    await Record.findByIdAndUpdate(req.body._id, req.body.query);
    await Result.deleteMany({ record: req.body._id });
    let list = [];
    req.body.query.labs.map((item) => {
      let x = {};
      (x.record = req.body._id), (x.lab = item);
      list.push(x);
    });
    await Result.insertMany(list);
  } catch (e) {
    console.log(e);
    return res
      .status(400)
      .json({ msg: `Đã lưu danh sách chỉ định không thành công ` });
  }
  return res
    .status(200)
    .json({ msg: `Đã lưu danh sách chỉ định  thành công  ` });
}

export async function editPatientRecord(req, res) {
  await delay(1000);
  if (!req.body._id) return res.status(400).json({ msg: "Thiếu thông tin" });
  try {
    await Record.findByIdAndUpdate(req.body._id, req.body.query);
  } catch (e) {
    console.log(e);
    return res
      .status(400)
      .json({ msg: `Đã lưu hồ sơ bệnh án không thành công ` });
  }
  return res.status(200).json({ msg: `Đã lưu hồ sơ bệnh án  thành công  ` });
}

export async function editBookingToPending(req, res) {
  await delay(1000);
  if (!req.body._id) return res.status(400).json({ msg: "Thiếu thông tin" });
  try {
    await Booking.findByIdAndUpdate(req.body._id, req.body.query);

    await Record.findOneAndDelete({ booking: req.body._id });
  } catch (e) {
    console.log(e);
    return res
      .status(400)
      .json({ msg: `Đã chuyển sang đang chờ khám không thành công ` });
  }
  return res
    .status(200)
    .json({ msg: `Đã chuyển sang đang chờ khám  thành công  ` });
}

export async function editBookingToExamining(req, res) {
  await delay(1000);
  if (!req.body._id) return res.status(400).json({ msg: "Thiếu thông tin" });
  try {
    await Booking.findByIdAndUpdate(req.body._id, req.body.query);
    let newRecord = new Record({
      booking: req.body._id,
    });
    await newRecord.save();
  } catch (e) {
    console.log(e);
    return res
      .status(400)
      .json({ msg: `Đã chuyển sang đang khám không thành công ` });
  }
  return res
    .status(200)
    .json({ msg: `Đã chuyển sang đang khám  thành công  ` });
}

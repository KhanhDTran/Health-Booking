import { delay } from "../utils/commonUtils.js";
import Patient from "../schemas/Patient.js";
import User from "../schemas/User.js";
import Specialty from "../schemas/Specialty.js";
import Clinic from "../schemas/Clinic.js";

export async function editClinic(req, res) {
  await delay(1000);
  if (!req.body._id || !req.body.user)
    return res.status(400).json({ msg: "Thiếu thông tin" });
  try {
    await Clinic.updateOne(
      { _id: req.body._id },
      {
        name: req.body.name,
        username: req.body.username,
        room: req.body.room,
        address: req.body.address,
        hospital: req.body.hospital,
        province: req.body.province,
        image: req.body.image,
        specialty: req.body.specialty,
      }
    );
    await User.updateOne(
      { _id: req.body.user._id },
      {
        username: req.body.user.username,
        password: req.body.user.password,
      }
    );
  } catch (e) {
    console.log(e);
    return res.status(400).json({ msg: `Đã lưu thanh đổi không thành công` });
  }
  return res.status(200).json({ msg: `Đã lưu thanh đổi thành công` });
}

export async function deleteClinic(req, res) {
  await delay(1000);
  if (!req.query._id) return res.status(400).json({ msg: "Thiếu thông tin" });
  await Clinic.deleteOne({ _id: req.query._id });
  return res
    .status(200)
    .json({ msg: `Đã xóa thành công phòng khám chuyên khoa` });
}

export async function createClinic(req, res) {
  await delay(1000);
  if (!req.body.username || !req.body.password || !req.body.name)
    return res.status(400).json({ msg: "Thiếu thông tin" });
  console.log(req.body);
  let checkUser = await User.findOne({ username: req.body.username });
  let checClinic = await Clinic.findOne({ name: req.body.name });
  if (checkUser)
    return res.status(400).json({ msg: `Tên tài khoản đã tồn tại` });
  if (checClinic)
    return res
      .status(400)
      .json({ msg: `Tên phòng khám chuyên khoa đã tồn tại` });
  let newUser = new User({
    username: req.body.username,
    password: req.body.password,
    role: "clinic",
  });

  let newClinic = new Clinic({
    user: newUser._id,
    name: req.body.name,
    username: req.body.username,
    room: req.body.room,
    address: req.body.address,
    hospital: req.body.hospital,
    province: req.body.province,
    image: req.body.image,
    specialty: req.body.specialty,
  });
  newUser.clinic = newClinic._id;
  try {
    await newClinic.save();
    await newUser.save();
  } catch (e) {
    return res.status(400).json({ msg: `Đã có lỗi xảy ra!` });
  }

  return res.status(200).json({ msg: `Đã tạo công phòng khám chuyên khoa` });
}

export async function deleteSpecialty(req, res) {
  await delay(1000);
  if (!req.query._id) return res.status(400).json({ msg: "Thiếu thông tin" });
  await Specialty.deleteOne({ _id: req.query._id });
  return res.status(200).json({ msg: `Đã xóa thành công chuyên khoa` });
}

export async function editSpecialty(req, res) {
  await delay(1000);
  if (
    !req.body._id ||
    !req.body.name ||
    !req.body.description ||
    !req.body.image
  )
    return res.status(400).json({ msg: "Thiếu thông tin" });
  let name = req.body.name.trim();
  let description = req.body.description.trim();
  let image = req.body.image.trim();
  await Specialty.updateOne(
    { _id: req.body._id },
    { name, description, image }
  );
  return res.status(200).json({ msg: `Đã lưu thanh đổi thành công` });
}

export async function createSpecialty(req, res) {
  await delay(1000);
  if (!req.body.name || !req.body.description || !req.body.image)
    return res.status(400).json({ msg: "Thiếu thông tin" });
  let name = req.body.name.trim();
  let description = req.body.description.trim();
  let image = req.body.image.trim();
  let checkSpecialty = await Specialty.findOne({ name });
  if (!checkSpecialty) {
    let newSpecialty = new Specialty({
      name,
      description,
      image,
    });
    await newSpecialty.save();
    return res
      .status(200)
      .json({ msg: `Đã tạo thành công chuyên khoa: ${name}` });
  } else {
    return res
      .status(400)
      .json({ msg: `Chuyên khoa "${name}" đã tồn tại trên hệ thống` });
  }
}

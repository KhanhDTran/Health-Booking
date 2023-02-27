import { delay } from "../utils/commonUtils.js";
import Patient from "../schemas/Patient.js";
import Specialty from "../schemas/Specialty.js";

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

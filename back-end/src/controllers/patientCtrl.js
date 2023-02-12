import { delay } from "../utils/commonUtils.js";
import User from "../schemas/User.js";
import Patient from "../schemas/Patient.js";
import { createPatientSv } from "../services/patientSv.js";

export async function createPatient(req, res) {
  await delay(1000);
  console.log(req.body);
  if (!req.body.username || !req.body.password || !req.body.email)
    return res.status(400).json({ msg: "Thiếu thông tin" });

  let checkUser = await User.findOne({ username: req.body.username });
  let checkPatient = await Patient.findOne({ email: req.body.email });
  if (checkPatient) {
    return res.status(400).json({ msg: "Email đã tồn tại" });
  }
  if (checkUser) {
    return res.status(400).json({ msg: "Tên tài khoản đã tồn tại" });
  }
  let rs = await createPatientSv(req.body);
  return res.status(200).json(rs);
}


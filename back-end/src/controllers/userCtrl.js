import { delay } from "../utils/commonUtils.js";
import User from "../schemas/User.js";
import { createUserSv } from "../services/userSv.js";
import Patient from "../schemas/Patient.js";

export async function createUser(req, res) {
  await delay(500);
  if (!req.body.username || !req.body.password || !req.body.role)
    return res.status(400).json({ msg: "Thiếu thông tin" });
  let [username, password, role] = [
    req.body.username,
    req.body.password,
    req.body.role,
  ];
  let checkUser = await User.findOne({ username: username });
  if (!checkUser) {
    let rs = await createUserSv(username, password, role);
    return res.status(200).json(rs);
  } else {
    return res.status(400).json({ msg: "Tên tài khoản đã tồn tại" });
  }
}

export async function login(req, res) {
  await delay(1000);
  if (!req.query.username || !req.query.password)
    return res.status(400).json({ msg: "Thiếu thông tin" });
  let [username, password] = [req.query.username, req.query.password];
  let user = await User.findOne({ username: username });
  if (!user) return res.status(400).json({ msg: "Tài khoản không tồn tại " });
  if (password !== user.password)
    return res.status(400).json({ msg: "Mật khẩu không đúng" });
  if (user.role === "admin")
    return res.status(200).json({
      msg: `Chào mừng Quản trị viên`,
      data: {
        user: {
          role: "admin",
        },
      },
    });
  let data = {};
  if (user.role === "patient") {
    data = await Patient.findOne({ user: user._id }).populate("user");
  }
  data.user.password = undefined;
  return res.status(200).json({ msg: `Chào mừng ${data.name}`, data });
}

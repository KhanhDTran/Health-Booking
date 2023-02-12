import { delay } from "../utils/commonUtils.js";
import User from "../schemas/User.js";
import { createUserSv } from "../services/userSv.js";

export async function createUser(req, res) {
  await delay(1000);
  if (!req.body.username || !req.body.password || !req.body.role)
    return res.status(400).json({ msg: "Thiếu thông tin" });
  let [username, password, role] = [
    req.body.username,
    req.body.password,
    req.body.role,
  ];
  console.log(req.body);

  let checkUser = await User.findOne({ username: username });
  if (!checkUser) {
    let rs = await createUserSv(username, password, role);
    return res.status(200).json(rs);
  } else {
    return res.status(400).json({ msg: "Tài khoản đã tồn tại" });
  }
}

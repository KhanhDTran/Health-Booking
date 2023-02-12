import User from "../schemas/User.js";

export async function createUserSv(username, password, role) {
  let user = await User.create({ username, password, role });
  return { msg: "Tạo tài khoản thành công", user };
}

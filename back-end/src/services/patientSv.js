import User from "../schemas/User.js";
import Patient from "../schemas/Patient.js";

export async function createPatientSv(data) {
  let user = new User({
    username: data.username,
    password: data.password,
    role: "patient",
  });
  await user.save();
  let patient = new Patient({
    user: user._id,
    name: data.name,
    email: data.email,
    address: data.address,
    phone: data.phone,
    age: data.age,
    gender: data.gender,
  });
  await patient.save();
  return { msg: "Tạo tài khoản thành công", patient };
}

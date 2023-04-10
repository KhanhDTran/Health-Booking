import { delay } from "../utils/commonUtils.js";
import Result from "../schemas/Result.js";

export async function editResult(req, res) {
  await delay(1000);
  if (!req.body._id) return res.status(400).json({ msg: "Thiếu thông tin" });
  try {
    await Result.findByIdAndUpdate(req.body._id, req.body.query);
  } catch (e) {
    console.log(e);
    return res
      .status(400)
      .json({ msg: `Đã lưu không thành công kết quả khám` });
  }
  return res.status(200).json({ msg: `Đã lưu thành công kết quả khám` });
}

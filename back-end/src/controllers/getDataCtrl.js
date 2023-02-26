import { delay } from "../utils/commonUtils.js";
import Patient from "../schemas/Patient.js";
import Speciaalty from "../schemas/Specialty.js";

export async function getSpecialties(req, res) {
  let specialties = await Speciaalty.find();
  return res.status(200).json({ specialties });
}

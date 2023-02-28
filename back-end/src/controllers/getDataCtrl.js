import { delay } from "../utils/commonUtils.js";
import Patient from "../schemas/Patient.js";
import Speciaalty from "../schemas/Specialty.js";
import Clinic from "../schemas/Clinic.js";
import Lab from "../schemas/Laboratory.js";
import Doctor from "../schemas/Doctor.js";
import Schedule from "../schemas/Schedule.js";

export async function getSchedules(req, res) {
  let schedules = await Schedule.find(req.query).populate(["clinic", "lab"]);
  return res.status(200).json({ schedules });
}

export async function getDoctors(req, res) {
  let doctors = await Doctor.find().populate(["clinic", "specialty"]);
  return res.status(200).json({ doctors });
}

export async function getLabs(req, res) {
  let labs = await Lab.find().populate(["user"]);
  return res.status(200).json({ labs });
}

export async function getClinics(req, res) {
  let clinics = await Clinic.find().populate(["specialty", "user"]);
  return res.status(200).json({ clinics });
}

export async function getSpecialties(req, res) {
  let specialties = await Speciaalty.find();
  return res.status(200).json({ specialties });
}

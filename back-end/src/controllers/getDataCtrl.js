import { delay } from "../utils/commonUtils.js";
import Patient from "../schemas/Patient.js";
import Speciaalty from "../schemas/Specialty.js";
import Clinic from "../schemas/Clinic.js";
import Lab from "../schemas/Laboratory.js";
import Doctor from "../schemas/Doctor.js";
import Schedule from "../schemas/Schedule.js";
import Service from "../schemas/Service.js";
import Booking from "../schemas/Booking.js";

export async function getBookings(req, res) {
  console.log(req);
  let bookings = await Booking.find(req.query).populate([
    "clinic",
    "lab",
    "schedule",
    "services",
    "doctor",
  ]);
  return res.status(200).json({ bookings });
}

export async function getPatients(req, res) {
  console.log(req);
  let patients = await Patient.find(req.query);
  return res.status(200).json({ patients });
}

export async function getServices(req, res) {
  let services = await Service.find(req.query);
  return res.status(200).json({ services });
}

export async function getSchedules(req, res) {
  let schedules = await Schedule.find(req.query).populate(["patients"]);
  return res.status(200).json({ schedules });
}

export async function getDoctors(req, res) {
  let doctors = await Doctor.find(req.query).populate(["clinic", "specialty"]);
  return res.status(200).json({ doctors });
}

export async function getLabs(req, res) {
  let labs = await Lab.find(req.query).populate(["user"]);
  return res.status(200).json({ labs });
}

export async function getClinics(req, res) {
  let clinics = await Clinic.find(req.query).populate([
    "specialty",
    "user",
    "doctor",
  ]);
  return res.status(200).json({ clinics });
}

export async function getSpecialties(req, res) {
  let specialties = await Speciaalty.find(req.query);
  return res.status(200).json({ specialties });
}

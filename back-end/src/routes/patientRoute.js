import expess from "express";
import dotenv from "dotenv";
dotenv.config();

let router = expess.Router();

import {
  createPatient,
  resendOtpPatient,
  checkCreatePatient,
  editProfile,
  createBooking,
  deleteBooking,
  createBookingLab,
} from "../controllers/patientCtrl.js";

export function patientRoute(app) {
  //patients
  router.get("/api/resend-otp-patient", resendOtpPatient);
  router.get("/api/check-create-patient", checkCreatePatient);
  router.post("/api/create-patient", createPatient);

  router.put("/api/patient/edit-profile", editProfile);
  router.post("/api/patient/create-booking", createBooking);
  router.delete("/api/patient/delete-booking", deleteBooking);

  router.post("/api/patient/create-booking-lab", createBookingLab);

  // Vui lòng tham khảo thêm tại code demo

  return app.use("", router);
}

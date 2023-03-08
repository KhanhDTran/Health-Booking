import expess from "express";

let router = expess.Router();

import {
  createPatient,
  resendOtpPatient,
  checkCreatePatient,
  editProfile
} from "../controllers/patientCtrl.js";

export function patientRoute(app) {
  
  //patients
  router.get("/api/resend-otp-patient", resendOtpPatient);
  router.get("/api/check-create-patient", checkCreatePatient);
  router.post("/api/create-patient", createPatient);

  router.put("/api/patient/edit-profile", editProfile);

  return app.use("", router);
}

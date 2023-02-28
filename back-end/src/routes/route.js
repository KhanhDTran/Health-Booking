import expess from "express";

let router = expess.Router();

import { createUser, login } from "../controllers/userCtrl.js";

import {
  createPatient,
  resendOtpPatient,
  checkCreatePatient,
} from "../controllers/patientCtrl.js";

import {
  createSpecialty,
  deleteSpecialty,
  editSpecialty,
  createClinic,
  deleteClinic,
  editClinic,
  deleteLab,
  createLab,
  editLab,
  deleteDoctor,
  createDoctor,
  editDoctor,
  upsertSchedule,
} from "../controllers/adminCtrl.js";

import {
  getSpecialties,
  getClinics,
  getLabs,
  getDoctors,
} from "../controllers/getDataCtrl.js";

export function webRoute(app) {
  //Users
  router.post("/api/create-user", createUser);
  router.get("/api/login", login);

  //patients
  router.get("/api/resend-otp-patient", resendOtpPatient);
  router.get("/api/check-create-patient", checkCreatePatient);
  router.post("/api/create-patient", createPatient);

  // Admin

  router.post("/api/upsert-schedule", upsertSchedule);

  router.post("/api/create-doctor", createDoctor);
  router.delete("/api/delete-doctor", deleteDoctor);
  router.put("/api/edit-doctor", editDoctor);

  router.post("/api/create-doctor", createDoctor);
  router.delete("/api/delete-doctor", deleteDoctor);
  router.put("/api/edit-doctor", editDoctor);

  router.post("/api/create-lab", createLab);
  router.delete("/api/delete-lab", deleteLab);
  router.put("/api/edit-lab", editLab);

  router.post("/api/create-clinic", createClinic);
  router.delete("/api/delete-clinic", deleteClinic);
  router.put("/api/edit-clinic", editClinic);

  router.post("/api/create-specialty", createSpecialty);
  router.delete("/api/delete-specialty", deleteSpecialty);
  router.put("/api/edit-specialty", editSpecialty);

  // getData
  router.get("/api/getData/all-doctors", getDoctors);
  router.get("/api/getData/all-clinics", getClinics);
  router.get("/api/getData/all-specialties", getSpecialties);
  router.get("/api/getData/all-labs", getLabs);

  return app.use("", router);
}

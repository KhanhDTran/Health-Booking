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
  deleteService,
  createService,
  editService,
  upsertSchedule,
} from "../controllers/adminCtrl.js";

import {
  getSpecialties,
  getClinics,
  getLabs,
  getDoctors,
  getSchedules,
  getServices,
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

  router.put("/api/upsert-schedule", upsertSchedule);

  router.post("/api/create-service", createService);
  router.delete("/api/delete-service", deleteService);
  router.put("/api/edit-service", editService);

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
  router.get("/api/getData/get-schedules", getSchedules);
  router.get("/api/getData/get-services", getServices);

  return app.use("", router);
}

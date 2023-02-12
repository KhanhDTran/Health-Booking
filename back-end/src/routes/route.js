import expess from "express";

let router = expess.Router();

import { createUser, login } from "../controllers/userCtrl.js";

import {
  createPatient,
  // checkCreatePatient,
} from "../controllers/patientCtrl.js";

export function webRoute(app) {
  //Users
  router.post("/api/create-user", createUser);
  router.get("/api/login", login);

  //patients
  // router.get("/api/check-create-patient", checkCreatePatient);
  router.post("/api/create-patient", createPatient);

  return app.use("", router);
}

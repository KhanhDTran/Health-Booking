import expess from "express";

let router = expess.Router();

import {
  getSpecialties,
  getClinics,
  getLabs,
  getDoctors,
  getSchedules,
  getServices,
  getPatients,
  getBookings,
} from "../controllers/getDataCtrl.js";

export function getDataRoute(app) {
  // getData
  router.get("/api/getData/all-doctors", getDoctors);
  router.get("/api/getData/all-clinics", getClinics);
  router.get("/api/getData/all-specialties", getSpecialties);
  router.get("/api/getData/all-labs", getLabs);
  router.get("/api/getData/get-schedules", getSchedules);
  router.get("/api/getData/get-services", getServices);
  router.get("/api/getData/get-patients", getPatients);
  router.get("/api/getData/get-bookings", getBookings);
  return app.use("", router);
}

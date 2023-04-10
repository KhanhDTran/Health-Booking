import expess from "express";

let router = expess.Router();

import {
  editBookingToExamining,
  editBookingToPending,
  editPatientRecord,
  indicateLabs,
} from "../controllers/clinicCtrl.js";

export function clinicRoute(app) {
  // clinic

  router.put("/api/clinic/edit-booking-to-examining", editBookingToExamining);
  router.put("/api/clinic/edit-booking-to-pending", editBookingToPending);
  router.put("/api/clinic/edit-patient-record", editPatientRecord);
  router.put("/api/clinic/indicate-labs", indicateLabs);

  //   router.put("/api/clinic/upsert-schedule", upsertSchedule);
  //   router.put("/api/clinic/upsert-schedule", upsertSchedule);

  return app.use("", router);
}

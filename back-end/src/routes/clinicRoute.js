import expess from "express";

let router = expess.Router();

// import {

// } from "../controllers/clinicCtrl.js";

export function clinicRoute(app) {
  // clinic

//   router.put("/api/clinic/upsert-schedule", upsertSchedule);
//   router.put("/api/clinic/upsert-schedule", upsertSchedule);
//   router.put("/api/clinic/upsert-schedule", upsertSchedule);


  return app.use("", router);
}

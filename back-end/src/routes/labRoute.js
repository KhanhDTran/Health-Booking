import expess from "express";

let router = expess.Router();

import { editResult } from "../controllers/labCtrl.js";

export function labRoute(app) {
  // lab

  router.put("/api/lab/edit-result", editResult);
  //   router.put("/api/lab/upsert-schedule", upsertSchedule);
  //   router.put("/api/lab/upsert-schedule", upsertSchedule);

  return app.use("", router);
}

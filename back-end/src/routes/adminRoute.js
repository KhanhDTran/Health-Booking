import expess from "express";

let router = expess.Router();

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

export function adminRoute(app) {
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

  return app.use("", router);
}

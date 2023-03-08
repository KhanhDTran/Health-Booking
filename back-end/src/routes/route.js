import expess from "express";

let router = expess.Router();

import { createUser, login } from "../controllers/userCtrl.js";

export function webRoute(app) {
  //Users
  router.post("/api/create-user", createUser);
  router.get("/api/login", login);

  
  

  return app.use("", router);
}

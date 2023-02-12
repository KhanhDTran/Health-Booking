import expess from "express";

let router = expess.Router();

import { createUser } from "../controllers/userCtrl.js";

export function webRoute(app) {
  // router.get("/users", (req, res) => {
  //   res.send("users page");
  // });

  //Users
  router.get("/api/create-user", createUser);

  return app.use("", router);
}

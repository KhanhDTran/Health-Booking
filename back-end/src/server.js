import expess from "express";
import bodyParser from "body-parser";
import process from "process";
import { webRoute } from "./routes/route.js";
import { adminRoute } from "./routes/adminRoute.js";
import { clinicRoute } from "./routes/clinicRoute.js";
import { patientRoute } from "./routes/patientRoute.js";
import { labRoute } from "./routes/labRoute.js";
import { getDataRoute } from "./routes/getDataRoute.js";
import { paymentRoute } from "./routes/paymentRoute.js";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

let app = expess();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_DB_URI)
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
  });

app.get("/", (req, res) => {
  res.send("Hello from Health Booking backend");
});

webRoute(app);
adminRoute(app);
clinicRoute(app);
patientRoute(app);
labRoute(app);
paymentRoute(app);
getDataRoute(app);

let PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log("Server running at port :", PORT);
});

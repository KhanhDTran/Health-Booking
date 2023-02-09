import expess from "express";
import bodyParser from "body-parser";
import process from "process";
import { webRoute } from "./routes/route.js";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

let app = expess();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
mongoose.set("strictQuery", true);
// mongoose.connect(process.env.MONGO_DB_URI);
mongoose.connect(process.env.MONGO_DB_URI).then(() => {
    console.log("Connected to Database");
    }).catch((err) => {
        console.log("Not Connected to Database ERROR! ", err);
    });

app.get("/", (req, res) => {
  res.send("Hello from Health Booking backend");
});

webRoute(app);

let PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log("Server running at port :", PORT);
});

import mongoose from "mongoose";
const { Schema } = mongoose;

const scheduleSchema = new Schema(
  {
    clinic: { type: Schema.Types.String, ref: "Clinic" },
    lab: { type: Schema.Types.String, ref: "Laboratory" },
    date: Date,
    hour: String,
    patients: [ { type: Schema.Types.String, ref: "Patient" }]
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Schedule", scheduleSchema);

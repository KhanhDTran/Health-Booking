import mongoose from "mongoose";
const { Schema } = mongoose;

const BookingSchema = new Schema(
  {
    clinic: { type: Schema.Types.String, ref: "Clinic" },
    laboratory: { type: Schema.Types.String, ref: "Laboratory" },
    patient: { type: Schema.Types.String, ref: "Patient" },
    hour: String,
    date: Date,
    status: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Booking", BookingSchema);

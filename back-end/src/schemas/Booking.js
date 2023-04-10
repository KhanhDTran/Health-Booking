import mongoose from "mongoose";
const { Schema } = mongoose;

const BookingSchema = new Schema(
  {
    clinic: { type: Schema.Types.String, ref: "Clinic" },
    doctor: { type: Schema.Types.String, ref: "Doctor" },
    lab: { type: Schema.Types.String, ref: "Laboratory" },
    patient: { type: Schema.Types.String, ref: "Patient" },
    services: [{ type: Schema.Types.String, ref: "Service" }],
    record: { type: Schema.Types.String, ref: "Record" },
    date: Date,
    hour: String,
    status: String,
    preBooking: { type: Schema.Types.ObjectId, ref: "Booking" },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Booking", BookingSchema);

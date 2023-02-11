import mongoose from "mongoose";
const { Schema } = mongoose;

const clinicSchema = new Schema(
  {
    user: { type: Schema.Types.String, ref: "User" },
    name: String,
    room: String,
    specialtyId: { type: Schema.Types.String, ref: "Specialty" },
    doctor: { type: Schema.Types.String, ref: "Doctor" },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Clinic", clinicSchema);

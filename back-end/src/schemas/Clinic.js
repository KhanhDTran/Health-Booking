import mongoose from "mongoose";
const { Schema } = mongoose;

const clinicSchema = new Schema(
  {
    user: { type: Schema.Types.String, ref: "User" },
    name: String,
    username: String,
    room: String,
    address: String,
    hospital: String,
    province: String,
    image: String,
    specialty: { type: Schema.Types.String, ref: "Specialty" },
    doctor: { type: Schema.Types.String, ref: "Doctor" },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Clinic", clinicSchema);

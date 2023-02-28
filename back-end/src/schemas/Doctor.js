import mongoose from "mongoose";
const { Schema } = mongoose;

const doctorSchema = new Schema(
  {
    name: String,
    age: String,
    address: String,
    phone: String,
    email: String,
    position: String,
    description: String,
    image: String,
    specialty: { type: Schema.Types.String, ref: "Specialty" },
    clinic:{type: Schema.Types.String, ref: "Clinic" }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Doctor", doctorSchema);

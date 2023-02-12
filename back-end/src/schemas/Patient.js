import mongoose from "mongoose";
const { Schema } = mongoose;

const patientSchema = new Schema(
  {
    user: { type: Schema.Types.String, ref: "User" },
    name: String,
    age: String,
    address: String,
    phone: String,
    email: String,
    gender: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Patient", patientSchema);

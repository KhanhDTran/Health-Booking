import mongoose from "mongoose";
const { Schema } = mongoose;

const patientSchema = new Schema(
  {
    userdsff: { type: Schema.Types.String, ref: "User" },
    name: String,
    age: String,
    address: String,
    phone: String,
    email: String
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Patient", patientSchema);

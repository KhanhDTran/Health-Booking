import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: String,
    password: String,
    role: String,
    patient: { type: Schema.Types.String, ref: "Patient" },
    lab: { type: Schema.Types.String, ref: "Laboratory" },
    clinic: { type: Schema.Types.String, ref: "Clinic" },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);

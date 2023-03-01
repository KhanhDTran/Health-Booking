import mongoose from "mongoose";
const { Schema } = mongoose;

const serviceSchema = new Schema(
  {
    clinic: { type: Schema.Types.String, ref: "Clinic" },
    lab: { type: Schema.Types.String, ref: "Laboratory" },
    name: String,
    unit: String,
    unitPrice: String
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Service", serviceSchema);

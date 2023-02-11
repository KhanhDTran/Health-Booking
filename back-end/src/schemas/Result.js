import mongoose from "mongoose";
const { Schema } = mongoose;

const resultSchema = new Schema(
  {
    laboratory: { type: Schema.Types.String, ref: "Laboratory" },
    patient: { type: Schema.Types.String, ref: "Patient" },
    content: String
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Result", resultSchema);

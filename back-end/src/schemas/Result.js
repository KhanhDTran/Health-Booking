import mongoose from "mongoose";
const { Schema } = mongoose;

const resultSchema = new Schema(
  {
    record: { type: Schema.Types.ObjectId, ref: "Record" },
    lab: { type: Schema.Types.ObjectId, ref: "Laboratory" },
    result: String,
    resultHtml: String,
    images: [String],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Result", resultSchema);

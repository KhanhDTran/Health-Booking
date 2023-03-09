import mongoose from "mongoose";
const { Schema } = mongoose;

const recordSchema = new Schema(
  {
    booking: { type: Schema.Types.ObjectId, ref: "Booking" },
    laboratores: [{ type: Schema.Types.ObjectId, ref: "Laboratory" }],
    LabServices: [
      {
        service: { type: Schema.Types.ObjectId, ref: "Service" },
        quantity: String,
        price: String,
      },
    ],
    results: [{ type: Schema.Types.ObjectId, ref: "Result" }],
    conclusion: String,
    conclusionHtml: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Record", recordSchema);

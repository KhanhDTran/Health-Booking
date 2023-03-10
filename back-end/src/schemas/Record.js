import mongoose from "mongoose";
const { Schema } = mongoose;

const recordSchema = new Schema(
  {
    booking: { type: Schema.Types.ObjectId, ref: "Booking" },
    labs: [{ type: Schema.Types.ObjectId, ref: "Laboratory" }],
    labServices: [
      {
        service: { type: Schema.Types.ObjectId, ref: "Service" },
        quantity: String,
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

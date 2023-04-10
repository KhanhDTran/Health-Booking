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
    payment: {
      responseCode: String,
      amount: String,
      orderInfo: String,
      transactionVnPayNo: String,
      bankCode: String,
      date: String,
    },
    conclusion: String,
    conclusionHtml: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Record", recordSchema);

import mongoose from "mongoose";
const { Schema } = mongoose;

const recordSchema = new Schema(
  {
    patient: { type: Schema.Types.String, ref: "Patient" },
    doctor: { type: Schema.Types.String, ref: "Doctor" },
    clinic: { type: Schema.Types.String, ref: "Clinic" },
    laboratores : [{ type: Schema.Types.ObjectId, ref: 'Laboratory' }],
    services : [{
        service:  { type: Schema.Types.ObjectId, ref: 'Service' },
        quantity: String,
        price: String,
    }]
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Record", recordSchema);

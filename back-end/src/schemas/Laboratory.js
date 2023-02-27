import mongoose from "mongoose";
const { Schema } = mongoose;

const laboratorySchema = new Schema(
  {
    user: { type: Schema.Types.String, ref: "User" },
    name: String,
    description: String,
    room: String,
    type: String,
    address: String,
    hospital: String,
    province: String,
    image: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Laboratory", laboratorySchema);

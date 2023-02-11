import mongoose from "mongoose";
const { Schema } = mongoose;

const laboratorySchema = new Schema(
  {
    user: { type: Schema.Types.String, ref: "User" },
    name: String,
    room: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Laboratory", laboratorySchema);

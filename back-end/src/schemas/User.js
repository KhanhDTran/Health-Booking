import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: String,
    password: String,
    role: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);

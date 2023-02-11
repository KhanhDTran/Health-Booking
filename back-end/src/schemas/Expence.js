import mongoose from "mongoose";
const { Schema } = mongoose;

const expenseSchema = new Schema(
  {
    record: { type: Schema.Types.String, ref: "Record" },
    totalPrice: String,
    status: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Expense", expenseSchema);

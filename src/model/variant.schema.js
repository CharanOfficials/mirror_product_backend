// Variants:
import mongoose from "mongoose";
const variantSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    sku_id: {
      type: String,
      unique: true,
      required: true,
    },
    additional_cost: {
      type: Number,
      required: true,
    },
    stock_count: {
      type: Number,
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
    },
  },
  { timestamps: true }
);
const Variants = mongoose.model("variants", variantSchema);
export default Variants;

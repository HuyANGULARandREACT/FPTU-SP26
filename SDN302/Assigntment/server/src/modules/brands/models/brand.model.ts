import mongoose, { Schema } from "mongoose";
import { IBrand } from "../../../types/brand.type";

export const brandSchema = new Schema(
  {
    brandName: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);
export const Brand = mongoose.model<IBrand>("Brand", brandSchema);

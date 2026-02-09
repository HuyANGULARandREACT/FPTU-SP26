import mongoose, { Schema } from "mongoose";
import { IPerfume } from "../../../types/perfume.type";
import { commentSchema } from "../../comments/models/comment.model";

const perfumeSchema = new Schema<IPerfume>(
  {
    perfumeName: { type: String, required: true },
    uri: { type: String, required: true },
    price: { type: Number, required: true },
    concentration: { type: String, required: true },
    description: { type: String, required: true },
    ingredients: { type: String, required: true },
    volume: { type: Number, required: true },
    targetAudience: { type: String, required: true },
    comments: [commentSchema],
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Perfume = mongoose.model<IPerfume>("Perfume", perfumeSchema);

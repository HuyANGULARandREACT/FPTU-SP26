import mongoose, { Schema } from "mongoose";
import { IComment } from "../../../types/comment.type";

export const commentSchema = new Schema<IComment>(
  {
    rating: { type: Number, min: 1, max: 3, required: true },
    content: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      required: true,
    },
    perfume: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Perfume",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// Ensure one feedback per member per perfume
commentSchema.index({ author: 1, perfume: 1 }, { unique: true });

export const Comment = mongoose.model<IComment>("Comment", commentSchema);

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
  },
  {
    timestamps: true,
  },
);
export const Comment = mongoose.model<IComment>("Comment", commentSchema);

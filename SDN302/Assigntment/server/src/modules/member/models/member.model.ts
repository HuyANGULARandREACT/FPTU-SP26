import { IMember } from "../../../types/member.type";
import mongoose, { Schema } from "mongoose";
const memberSchema = new Schema<IMember>(
  {
    memberFirstName: { type: String, required: true },
    memberLastName: { type: String, required: true },
    googleId: { type: String, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    YOB: { type: Date, required: true },
    gender: { type: Boolean, required: true }, //true = male, false = femail
    isAdmin: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);
export const Member = mongoose.model<IMember>("Member", memberSchema);

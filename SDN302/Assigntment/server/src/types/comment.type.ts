import { Types } from "mongoose";
import { IMember } from "./member.type";
import { IPerfume } from "./perfume.type";

export interface IComment {
  _id?: Types.ObjectId;
  rating: number; // 1-3
  content: string;
  author: Types.ObjectId | IMember; // Reference đến Member
  perfume: Types.ObjectId | IPerfume; // Reference to Perfume
  createdAt?: Date;
  updatedAt?: Date;
}

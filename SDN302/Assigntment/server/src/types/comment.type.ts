import { Types } from "mongoose";
import { IMember } from "./member.type";

export interface IComment {
  _id?: Types.ObjectId;
  rating: number; // 1-3
  content: string;
  author: Types.ObjectId | IMember; // Reference đến Member
  createdAt?: Date;
  updatedAt?: Date;
}

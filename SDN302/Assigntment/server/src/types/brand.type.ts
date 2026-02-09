import { Types } from "mongoose";
export interface IBrand {
  _id?: Types.ObjectId;
  brandName: string;
  createdAt?: Date;
  updatedAt?: Date;
}

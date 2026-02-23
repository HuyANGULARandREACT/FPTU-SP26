import { Types } from "mongoose";

export interface IMember {
  _id?: Types.ObjectId;
  googleId: string;
  memberFirstName: string;
  memberLastName: string;
  email: string;
  YOB: Date;
  gender: Boolean;
  password: string;
  isAdmin: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

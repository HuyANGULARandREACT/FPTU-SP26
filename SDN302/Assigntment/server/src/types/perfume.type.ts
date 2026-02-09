import { IBrand } from "./brand.type";
import { IComment } from "./comment.type";
import { Types } from "mongoose";

export interface IPerfume {
  perfumeName: string;
  uri: string;
  price: number;
  concentration: string; // Extrait, EDP, EDT, etc.
  description: string;
  ingredients: string;
  volume: number;
  targetAudience: string; // 'male' | 'female' | 'unisex'
  comments: IComment[];
  brand: Types.ObjectId | IBrand; // Reference đến Brand
  createdAt?: Date;
  updatedAt?: Date;
}

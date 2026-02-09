import mongoose from "mongoose";
import { Perfume } from "../models/perfume.model";
import { IPerfume } from "../../../types/perfume.type";

export const getAllPerfumes = async (): Promise<IPerfume[]> => {
  return await Perfume.find().populate("brand").exec();
};
export const getPerfumeById = async (
  perfumeId: string,
): Promise<IPerfume | null> => {
  if (!mongoose.Types.ObjectId.isValid(perfumeId)) return null;
  return await Perfume.findById(perfumeId).populate("brand").exec();
};
export const createPerfume = async (data: IPerfume): Promise<IPerfume> => {
  const newPerfume = new Perfume(data);
  return await newPerfume.save();
};
export const updatePerfume = async (
  id: string,
  data: Partial<IPerfume>,
): Promise<IPerfume | null> => {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  return await Perfume.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  })
    .populate("Brand")
    .exec();
};
export const deletePerfume = async (id: string): Promise<IPerfume | null> => {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  return await Perfume.findByIdAndDelete(id).exec();
};

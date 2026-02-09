import mongoose from "mongoose";
import { IBrand } from "../../../types/brand.type";
import { Brand } from "../models/brand.model";

export const getAllBrands = async (): Promise<IBrand[]> => {
  return await Brand.find();
};

export const getBrandById = async (brandId: string): Promise<IBrand | null> => {
  if (!mongoose.Types.ObjectId.isValid(brandId)) return null;
  return await Brand.findById(brandId);
};

export const createBrand = async (data: IBrand): Promise<IBrand> => {
  const brand = new Brand(data);
  return await brand.save();
};

export const updateBrand = async (
  id: string,
  data: Partial<IBrand>,
): Promise<IBrand | null> => {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  return await Brand.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

export const deleteBrand = async (id: string): Promise<IBrand | null> => {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  return await Brand.findByIdAndDelete(id);
};

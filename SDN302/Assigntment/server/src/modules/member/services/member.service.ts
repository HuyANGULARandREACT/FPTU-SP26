import mongoose from "mongoose";
import { IMember } from "../../../types/member.type";
import { IPerfume } from "../../../types/perfume.type";
import { Member } from "../models/member.model";

export const getAllMembers = async (): Promise<IMember[]> => {
  return await Member.find();
};
export const getMemberById = async (
  memberId: string,
): Promise<IPerfume | null> => {
  if (!mongoose.Types.ObjectId.isValid(memberId)) return null;
  return await Member.findById(memberId);
};
export const updateMember = async (id: string, data: Partial<IMember>) => {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  return await Member.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};
export const deletePerfume = async (id: string): Promise<IPerfume | null> => {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  return await Member.findByIdAndDelete(id);
};

import mongoose from "mongoose";
import { IComment } from "../../../types/comment.type";
import { Comment } from "../models/comment.model";
import { Perfume } from "../../perfume/models/perfume.model";

export const getAllComments = async (): Promise<IComment[]> => {
  return await Comment.find()
    .populate("author", "memberFirstName memberLastName email")
    .populate("perfume", "perfumeName");
};

export const getCommentsByPerfume = async (
  perfumeId: string,
): Promise<IComment[]> => {
  return await Comment.find({ perfume: perfumeId })
    .populate("author", "memberFirstName memberLastName email")
    .sort({ createdAt: -1 });
};

export const createComment = async (
  perfumeId: string,
  memberId: string,
  rating: number,
  content: string,
): Promise<IComment> => {
  // Check if perfume exists
  const perfume = await Perfume.findById(perfumeId);
  if (!perfume) {
    throw new Error("Perfume not found");
  }

  // Check if member already commented on this perfume
  const existingComment = await Comment.findOne({
    author: memberId,
    perfume: perfumeId,
  });

  if (existingComment) {
    throw new Error("You have already provided feedback for this perfume");
  }

  // Create comment
  const newComment = new Comment({
    rating,
    content,
    author: memberId,
    perfume: perfumeId,
  });

  const savedComment = await newComment.save();

  // Add comment to perfume's comments array
  perfume.comments.push(savedComment as any);
  await perfume.save();

  // Return populated comment
  return (await Comment.findById(savedComment._id)
    .populate("author", "memberFirstName memberLastName email")
    .populate("perfume", "perfumeName")) as IComment;
};

export const checkIfMemberCommented = async (
  perfumeId: string,
  memberId: string,
): Promise<boolean> => {
  const comment = await Comment.findOne({
    author: memberId,
    perfume: perfumeId,
  });
  return !!comment;
};

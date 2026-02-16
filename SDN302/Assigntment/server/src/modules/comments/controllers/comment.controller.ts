import { Request, Response } from "express";
import * as commentService from "../services/comment.service";

/**
 * Create a new feedback (comment + rating) for a perfume
 * Only authenticated members can provide feedback
 * Each member can only feedback once per perfume
 */
export const createFeedback = async (req: Request, res: Response) => {
  try {
    const { memberId,perfumeId, rating, content } = req.body;


   
    if (!memberId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Create comment
    const comment = await commentService.createComment(
      perfumeId,
      memberId,
      rating,
      content,
    );

    return res.status(201).json({
      message: "Feedback created successfully",
      data: comment,
    });
  } catch (error: any) {
    if (error.message === "Perfume not found") {
      return res.status(404).json({ message: error.message });
    }
    if (
      error.message === "You have already provided feedback for this perfume"
    ) {
      return res.status(409).json({ message: error.message });
    }
    console.error("Error creating feedback:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

/**
 * Get all comments for a specific perfume
 */
export const getCommentsByPerfume = async (req: Request, res: Response) => {
  try {
    const perfumeId = req.params.perfumeId as string;

    if (!perfumeId) {
      return res.status(400).json({ message: "Perfume ID is required" });
    }

    const comments = await commentService.getCommentsByPerfume(perfumeId);

    return res.status(200).json({
      message: "Comments retrieved successfully",
      data: comments,
      count: comments.length,
    });
  } catch (error: any) {
    console.error("Error getting comments:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

/**
 * Get all comments (admin or general purpose)
 */
export const getAllComments = async (req: Request, res: Response) => {
  try {
    const comments = await commentService.getAllComments();

    return res.status(200).json({
      message: "All comments retrieved successfully",
      data: comments,
      count: comments.length,
    });
  } catch (error: any) {
    console.error("Error getting all comments:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

/**
 * Check if current member has already commented on a perfume
 */
export const checkMemberFeedback = async (req: Request, res: Response) => {
  try {
    const perfumeId = req.params.perfumeId as string;
    const memberId = req.member?._id?.toString();

    if (!memberId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!perfumeId) {
      return res.status(400).json({ message: "Perfume ID is required" });
    }

    const hasCommented = await commentService.checkIfMemberCommented(
      perfumeId,
      memberId,
    );

    return res.status(200).json({
      hasCommented,
      message: hasCommented
        ? "You have already provided feedback for this perfume"
        : "You can provide feedback for this perfume",
    });
  } catch (error: any) {
    console.error("Error checking member feedback:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

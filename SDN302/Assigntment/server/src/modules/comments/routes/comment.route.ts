import express from "express";
import * as commentController from "../controllers/comment.controller";
import { authMiddleware } from "../../../middlewares/auth";

const router = express.Router();

/**
 * POST /api/comments
 * Create a new feedback (comment + rating)
 * Requires authentication
 * Body: { perfumeId, rating (1-3), content }
 */
router.post("/",  commentController.createFeedback);

/**
 * GET /api/comments/perfume/:perfumeId
 * Get all comments for a specific perfume
 * Public route
 */
router.get("/perfume/:perfumeId", commentController.getCommentsByPerfume);

/**
 * GET /api/comments
 * Get all comments
 * Public route
 */
router.get("/", commentController.getAllComments);

/**
 * GET /api/comments/check/:perfumeId
 * Check if current member has already commented on a perfume
 * Requires authentication
 */
router.get(
  "/check/:perfumeId",
  authMiddleware,
  commentController.checkMemberFeedback,
);

export default router;

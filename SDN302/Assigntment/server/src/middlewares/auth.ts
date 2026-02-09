import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Member } from "../modules/member/models/member.model";
import { IMember } from "../types/member.type";

const JWT_SECRET = process.env.JWT_SECRET || "";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, JWT_SECRET) as { memberId: string };
    const account = await Member.findById(decoded.memberId);
    if (!account) return res.status(401).json({ message: "user not found" });
    req.member = account;
    next();
  } catch (err: any) {
    res.status(401).json({ message: "Invalid Token" });
  }
};
export const checkAdminMiddleWare = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.member) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  if (!req.member.isAdmin) {
    return res.status(403).json({
      message: "Forbidden: Admin privileges required",
    });
  }
  next();
};
export const requireAdmin = [authMiddleware, checkAdminMiddleWare];
declare global {
  namespace Express {
    interface Request {
      member?: IMember;
    }
  }
}

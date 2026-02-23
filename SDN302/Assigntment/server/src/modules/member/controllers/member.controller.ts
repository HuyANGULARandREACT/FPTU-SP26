import { Request, Response, NextFunction } from "express";
import { Member } from "../models/member.model";
import bcrypt from "bcrypt";
import generateToken from "../../../utils/generateToken";
import * as memberService from "../services/member.service";
import { PaginatedResponse } from "../../../types/pagination.type";
import { IMember } from "../../../types/member.type";
import { comparePassword, hashPassword } from "../../../utils/hashPassword";
import passport from "passport";
import config from "../../../config/config";
export const registerMember = async (
  req: Request,
  res: Response,
): Promise<any> => {
  const { membername, password, email, YOB, gender } = req.body;
  try {
    let member = await Member.findOne({ email });
    if (member) {
      return res.status(400).json({ message: "Email already exist" });
    }
    member = new Member({ membername, password, email, YOB, gender });
    // const salt = await bcrypt.genSalt(10);
    // member.password = await bcrypt.hash(password, salt);
    member.password = await hashPassword(member.password);
    await member.save();
    res.status(201).json({
      message: "Register successfully",
    });
  } catch (err) {
    res.status(500).json({ message: "Server error at register", err });
  }
};
export const loginMember = async (
  req: Request,
  res: Response,
): Promise<any> => {
  const { email, password } = req.body;
  try {
    const member = await Member.findOne({ email });
    if (!member) {
      return res.status(400).json({ message: "Email doesn't exist" });
    }
    // const isMatch = await bcrypt.compare(password, member.password);
    const isMatch = await comparePassword(password, member.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const token = generateToken(member);
    res.status(200).json({
      message: "Login successful",
      success: true,
      token,
    });
  } catch (err: any) {
    res.status(500).send("Error at login");
  }
};
export const googleAuth = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("google", { scope: ["profile", "email"] })(req, res, next);
};
export const googleCallback = (req: Request, res: Response, next: NextFunction) => {
  const frontendUrl = config.FRONTEND_URL;
  passport.authenticate(
    "google",
    { failureRedirect: `${frontendUrl}/auth/login?error=auth_failed` },
    (err: any, member: IMember) => {
      if (err) {
        console.error("Authentication error:", err);
        return res.redirect(`${frontendUrl}/auth/login?error=auth_failed`);
      }
      if (member) {
        const token = generateToken(member);
        // Redirect to frontend with token
        return res.redirect(`${frontendUrl}/auth/callback?token=${token}`);
      }
      return res.redirect(`${frontendUrl}/auth/login?error=no_user`);
    },
  )(req, res, next);
};
//Implement the login action, using OAuth2 is a plus.
export const getAllMembers = async (req: Request, res: Response) => {
  try {
    const members = await memberService.getAllMembers();
    res.status(200).json(members);
  } catch (err) {
    res.status(500).json({ message: "Error fetching members", err });
  }
};

export const getMemberById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const member = await memberService.getMemberById(id as string);
    res.status(200).json(member);
  } catch (err) {
    res.status(500).json({ message: "Error fetching member" });
  }
};
export const updateMember = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const member = await memberService.updateMember(id as string, req.body);
    if (!member) {
      return res.status(404).json({ message: "Member not founds" });
    }
    res.status(200).json({ message: "Member updated successfully", member });
  } catch (err) {
    res.status(500).json({ message: "Error updating member" });
  }
};
export const deleteMember = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const member = await memberService.deletePerfume(id as string);
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }
    res.status(200).json({ message: "Member deleted successfully", member });
  } catch (err) {
    res.status(500).json({ message: "Error deleting member" });
  }
};
export const handleChangePassword = async (
  req: Request,
  res: Response,
): Promise<any> => {
  const { id, oldPassword, newPassword } = req.body;
  try {
    const member = await Member.findById({ _id: id });
    if (!member) {
      return res.status(404).json({ message: "member doesnot exists" });
    }
    const isMatch = await bcrypt.compare(oldPassword, member.password);
    if (!isMatch) {
      return res.status(400).json({ message: "password is not match" });
    }
    const salt = await bcrypt.genSalt(10);
    member.password = await bcrypt.hash(newPassword, salt);
    await member.save();
    res.json({ message: "Đổi mật khẩu thành công" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};
export const getMembersWithPagination = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 5;
    const membersData = await memberService.getAllMembers();
    if (page < 1 || pageSize < 1) {
      return res.status(400).json({
        message: "page and pageSize must >0",
      });
    }
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const paginatedData = membersData.slice(startIndex, endIndex);
    const total = membersData.length;
    const totalPages = Math.ceil(total / pageSize);
    const response: PaginatedResponse<IMember> = {
      data: paginatedData,
      pagination: {
        page,
        pageSize,
        total,
        totalPages,
      },
    };
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({ message: "Internal server error", err });
  }
};

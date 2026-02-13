import { Request, Response } from "express";
import { Member } from "../models/member.model";
import bcrypt from "bcrypt";
import generateToken from "../../../utils/generateToken";
import * as memberService from "../services/member.service";
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
    const salt = await bcrypt.genSalt(10);
    member.password = await bcrypt.hash(password, salt);

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
    const isMatch = await bcrypt.compare(password, member.password);
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

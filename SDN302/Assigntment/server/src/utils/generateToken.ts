import jwt from "jsonwebtoken";
import config from "../config/config";
import { IMember } from "../types/member.type";

const generateToken = (member: IMember) => {
  return jwt.sign(
    {
      memberId: member._id,
      memberFirstName: member.memberFirstName,
      memberLastName: member.memberLastName,
      email: member.email,
      isAdmin: member.isAdmin,
    },
    config.JWT_SECRET,
    {
      expiresIn: "1h",
    },
  );
};
export default generateToken;

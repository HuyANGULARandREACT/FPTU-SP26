import jwt from "jsonwebtoken";
import config from "../config/config";
import { IMember } from "../types/member.type";

const generateToken = (member: IMember) => {
  return jwt.sign(
    {
      memberId: member._id,
      membername: member.membername,
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

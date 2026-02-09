import express from "express";
import * as memberController from "../controllers/member.controller";

const memberRouter = express.Router();
memberRouter.post("/login", memberController.loginMember);
memberRouter.post("/register", memberController.registerMember);
memberRouter.get("/", memberController.getAllMembers);
memberRouter.get("/:id", memberController.getMemberById);
memberRouter.put("/:id", memberController.updateMember);
memberRouter.delete("/:id", memberController.deleteMember);
export default memberRouter;

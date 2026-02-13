import express from "express";
import * as memberController from "../controllers/member.controller";
import { requireAdmin } from "../../../middlewares/auth";

const memberRouter = express.Router();
memberRouter.post("/login", memberController.loginMember);
memberRouter.post("/register", memberController.registerMember);
memberRouter.get("/", memberController.getAllMembers);
memberRouter.get("/:id", memberController.getMemberById);
memberRouter.put("/:id", memberController.updateMember);
memberRouter.delete("/:id", requireAdmin, memberController.deleteMember);
memberRouter.put("/password/change", memberController.handleChangePassword);
export default memberRouter;

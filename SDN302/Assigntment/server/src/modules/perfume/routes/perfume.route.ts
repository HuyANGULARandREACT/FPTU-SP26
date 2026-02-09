import express from "express";
import { authMiddleware as auth } from "../../../middlewares/auth";
import {
  createPerfume,
  deletePerfume,
  getAllPerfume,
  getPerfumeById,
  updatePerfume,
} from "../controllers/perfume.controller";

const perfumeRouter = express.Router();

perfumeRouter.get("/", getAllPerfume);
perfumeRouter.get("/:id", getPerfumeById);
perfumeRouter.post("/", createPerfume);
perfumeRouter.put("/:id", updatePerfume);
perfumeRouter.delete("/:id", deletePerfume);
export default perfumeRouter;
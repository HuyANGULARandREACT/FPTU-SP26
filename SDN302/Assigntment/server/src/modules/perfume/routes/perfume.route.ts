import express from "express";
import { requireAdmin } from "../../../middlewares/auth";
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
perfumeRouter.post("/", requireAdmin, createPerfume);
perfumeRouter.put("/:id", requireAdmin, updatePerfume);
perfumeRouter.delete("/:id", requireAdmin, deletePerfume);
export default perfumeRouter;

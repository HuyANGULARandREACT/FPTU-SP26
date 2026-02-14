import express from "express";
import { requireAdmin } from "../../../middlewares/auth";
import {
  createPerfume,
  deletePerfume,
  getAllPerfume,
  getPerfumeById,
  updatePerfume,
} from "../controllers/perfume.controller";
import { getBrandsWithPagination } from "../../brands/controllers/brand.controller";

const perfumeRouter = express.Router();

perfumeRouter.get("/", getAllPerfume);
perfumeRouter.get("/:id", getPerfumeById);
perfumeRouter.post("/", requireAdmin, createPerfume);
perfumeRouter.put("/:id", requireAdmin, updatePerfume);
perfumeRouter.delete("/:id", requireAdmin, deletePerfume);
perfumeRouter.get("/perfumes/withPagination", getBrandsWithPagination);
export default perfumeRouter;

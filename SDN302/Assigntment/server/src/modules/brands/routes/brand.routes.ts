import express from "express";
import {
  getAllBrands,
  getBrandById,
  createBrand,
  updateBrand,
  deleteBrand,
} from "../controllers/brand.controller";
import { requireAdmin } from "../../../middlewares/auth";

const brandRouter = express.Router();

brandRouter.get("/", getAllBrands);
brandRouter.get("/:id", getBrandById);
brandRouter.post("/", requireAdmin, createBrand);
brandRouter.put("/:id", requireAdmin, updateBrand);
brandRouter.delete("/:id", requireAdmin, deleteBrand);

export default brandRouter;

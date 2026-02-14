import { Request, Response } from "express";
import * as perfumeService from "../services/perfume.service";
import { PaginatedResponse } from "../../../types/pagination.type";
import { IPerfume } from "../../../types/perfume.type";
export const getAllPerfume = async (req: Request, res: Response) => {
  try {
    const perfumes = await perfumeService.getAllPerfumes();
    res.status(200).json(perfumes);
  } catch (err) {
    res.status(500).json({ message: "Error fetching perfumes", err });
  }
};
export const getPerfumeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const perfume = await perfumeService.getPerfumeById(id as string);
    res.status(200).json(perfume);
  } catch (err) {
    res.status(500).json({ message: "Error fetching perfume", err });
  }
};
export const createPerfume = async (req: Request, res: Response) => {
  try {
    const perfume = await perfumeService.createPerfume(req.body);
    res.status(201).json(perfume);
  } catch (err) {
    res.status(500).json({ message: "Error creating perfume" });
  }
};
export const updatePerfume = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const perfume = await perfumeService.updatePerfume(id as string, req.body);
    if (!perfume) {
      return res.status(404).json({ message: "Perfume not found" });
    }
    res.status(200).json({ message: "Perfume updated successfully", perfume });
  } catch (err) {
    res.status(500).json({ message: "Error updating perfume" });
  }
};
export const deletePerfume = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const perfume = await perfumeService.deletePerfume(id as string);
    if (!perfume) {
      return res.status(404).json({ message: "Perfume not found" });
    }
    res.status(200).json({ message: "Perfume deleted successfully", perfume });
  } catch (err) {
    res.status(500).json({ message: "Error deleting perfume" });
  }
};
export const getPerfumesWithPagination = async (
  req: Request,
  res: Response,
) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 5;
    const perfumesData = await perfumeService.getAllPerfumes();
    if (page < 1 || pageSize < 1) {
      return res.status(400).json({
        message: "Page and pageSize muse > 0",
      });
    }
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const paginatedData = perfumesData.slice(startIndex, endIndex);
    const total = perfumesData.length;
    const totalPages = Math.ceil(total / pageSize);

    const response: PaginatedResponse<IPerfume> = {
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

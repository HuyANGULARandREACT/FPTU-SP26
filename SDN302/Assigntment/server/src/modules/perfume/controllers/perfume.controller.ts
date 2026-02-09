import { Request, Response } from "express";
import * as perfumeService from "../services/perfume.service";
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

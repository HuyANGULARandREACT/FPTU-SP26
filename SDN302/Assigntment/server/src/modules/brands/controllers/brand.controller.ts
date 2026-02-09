import { Request, Response } from "express";
import * as brandService from "../services/brand.service";

export const getAllBrands = async (req: Request, res: Response) => {
  try {
    const brands = await brandService.getAllBrands();
    res.status(200).json(brands);
  } catch (err) {
    res.status(500).json({ message: "Error fetching brands", err });
  }
};

export const getBrandById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const brand = await brandService.getBrandById(id as string);
    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }
    res.status(200).json(brand);
  } catch (err) {
    res.status(500).json({ message: "Error fetching brand", err });
  }
};

export const createBrand = async (req: Request, res: Response) => {
  try {
    const brand = await brandService.createBrand(req.body);
    res.status(201).json(brand);
  } catch (err) {
    res.status(500).json({ message: "Error creating brand", err });
  }
};

export const updateBrand = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const brand = await brandService.updateBrand(id as string, req.body);
    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }
    res.status(200).json({ message: "Brand updated successfully", brand });
  } catch (err) {
    res.status(500).json({ message: "Error updating brand", err });
  }
};

export const deleteBrand = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const brand = await brandService.deleteBrand(id as string);
    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }
    res.status(200).json({ message: "Brand deleted successfully", brand });
  } catch (err) {
    res.status(500).json({ message: "Error deleting brand", err });
  }
};

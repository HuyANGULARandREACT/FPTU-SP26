import { Request, Response } from "express";
import * as brandService from "../services/brand.service";
import { PaginatedResponse } from "../../../types/pagination.type";
import { IBrand } from "../../../types/brand.type";

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
      return res.status(404).json({ message: "Brand not founds" });
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
export const getBrandsWithPagination = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 5;
    const brandsData = await brandService.getAllBrands();
    if (page < 1 || pageSize < 1) {
      return res.status(400).json({
        message: "Page and pageSize muse > 0",
      });
    }
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const paginatedData = brandsData.slice(startIndex, endIndex);
    const total = brandsData.length;
    const totalPages = Math.ceil(total / pageSize);

    const response: PaginatedResponse<IBrand> = {
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

import React from "react";
import type { IBrand } from "../types/type";

interface BrandFilterProps {
  brands: IBrand[];
  selectedBrandId: string | null;
  onBrandSelect: (brandId: string | null) => void;
  loading: boolean;
  error: string;
}

// Helper function to get brand ID (handles both id and _id)
const getBrandId = (brand: IBrand): string | undefined => {
  return brand.id || brand._id;
};

const BrandFilter: React.FC<BrandFilterProps> = ({
  brands,
  selectedBrandId,
  onBrandSelect,
  loading,
  error,
}) => {
  return (
    <div className="flex items-center gap-4 mb-12 overflow-x-auto pb-4 no-scrollbar">
      <span className="text-sm font-bold uppercase tracking-widest text-primary/40 mr-4">
        Collections:
      </span>
      <button
        onClick={() => {
          console.log("Clicked: All Scents");
          onBrandSelect(null);
        }}
        className={`whitespace-nowrap px-6 py-2 rounded-full border font-bold text-sm transition-all ${
          selectedBrandId === null
            ? "border-primary text-primary bg-primary/5"
            : "border-primary/10 hover:border-primary/40 text-slate-600 dark:text-slate-400"
        }`}
      >
        All Scents
      </button>
      {loading ? (
        <span className="text-sm text-slate-500">Loading brands...</span>
      ) : error ? (
        <span className="text-sm text-red-500">{error}</span>
      ) : (
        brands.map((brand) => {
          const brandId = getBrandId(brand);
          return (
            <button
              key={brandId || brand.brandName}
              onClick={() => {
                console.log(
                  "Clicked brand:",
                  brand.brandName,
                  "with ID:",
                  brandId,
                );
                onBrandSelect(brandId || null);
              }}
              className={`whitespace-nowrap px-6 py-2 rounded-full border font-medium text-sm transition-all ${
                selectedBrandId === brandId
                  ? "border-primary text-primary bg-primary/5"
                  : "border-primary/10 hover:border-primary/40 text-slate-600 dark:text-slate-400"
              }`}
            >
              {brand.brandName}
            </button>
          );
        })
      )}
    </div>
  );
};

export default BrandFilter;

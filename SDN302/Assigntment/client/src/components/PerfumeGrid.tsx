import React from "react";
import type { IPerfume } from "../types/type";

interface PerfumeGridProps {
  perfumes: IPerfume[];
  loading: boolean;
  error: string;
}

const PerfumeGrid: React.FC<PerfumeGridProps> = ({
  perfumes,
  loading,
  error,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
      {loading ? (
        <span className="text-sm text-slate-500">Loading perfumes...</span>
      ) : error ? (
        <span className="text-sm text-red-500">{error}</span>
      ) : perfumes.length === 0 ? (
        <span className="text-sm text-slate-500">No perfumes available</span>
      ) : (
        perfumes.map((perfume) => (
          <div key={perfume.uri} className="group cursor-pointer">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 mb-4">
              <img
                alt={perfume.perfumeName}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                src={perfume.uri}
              />
              <div className="absolute top-4 left-4 bg-white/90 dark:bg-black/80 backdrop-blur px-3 py-1 rounded-full">
                <span className="text-[10px] font-bold uppercase tracking-tighter">
                  {perfume.targetAudience}
                </span>
              </div>
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-1">
              {perfume.brand?.brandName || "Unknown Brand"}
            </p>
            <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
              {perfume.perfumeName}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {perfume.concentration}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default PerfumeGrid;

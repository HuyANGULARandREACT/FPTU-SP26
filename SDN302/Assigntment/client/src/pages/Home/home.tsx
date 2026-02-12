import React, { useEffect, useState } from "react";
import type { IBrand, IPerfume } from "../../types/type";
import { brandApi } from "../../services/brandAPI";
import { perfumeAPI } from "../../services/perfumeAPI";
import BrandFilter from "./BrandFilter";
import PerfumeGrid from "./PerfumeGrid";
import Hero from "./Hero";

const Home = () => {
  const [brands, setBrands] = useState<IBrand[]>([]);
  const [perfumes, setPerfumes] = useState<IPerfume[]>([]);
  const [selectedBrandId, setSelectedBrandId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setLoading(true);
        const data = await brandApi.getAllBrands();
        console.log(data);

        setBrands(data);
        setError("");
      } catch (err) {
        setError("Failed to load perfume brands");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    const fetchPerfumes = async () => {
      try {
        setLoading(true);
        const data = await perfumeAPI.getAllPerfumes();
        console.log(data);
        setPerfumes(data);
      } catch (err) {
        setError("Failed to load perfume ");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPerfumes();
    fetchBrands();
  }, []);

  // Filter perfumes based on selected brand
  // Helper to get brand ID - handles both id and _id
  const getBrandId = (brand: IBrand | undefined): string | undefined => {
    if (!brand) return undefined;
    return brand._id;
  };

  const filteredPerfumes = selectedBrandId
    ? perfumes.filter((perfume) => {
        const perfumeBrandId = getBrandId(perfume.brand);
        console.log(
          "Comparing:",
          perfumeBrandId,
          "===",
          selectedBrandId,
          "=>",
          perfumeBrandId === selectedBrandId,
        );
        return perfumeBrandId === selectedBrandId;
      })
    : perfumes;

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <main className="max-w-7xl mx-auto px-6 lg:px-20 py-10">
        <Hero/>

        {/* Brand Filter */}
        <BrandFilter
          brands={brands}
          selectedBrandId={selectedBrandId}
          onBrandSelect={setSelectedBrandId}
          loading={loading}
          error={error}
        />

        {/* Perfume Grid */}
        <PerfumeGrid
          perfumes={filteredPerfumes}
          loading={loading}
          error={error}
        />

        <div className="mt-20 flex flex-col items-center gap-6">
          <button className="flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all">
            <span>View Full Collection</span>
            <span className="material-symbols-outlined">expand_more</span>
          </button>
          <div className="h-px w-24 bg-primary/20"></div>
        </div>
      </main>
    </div>
  );
};

export default Home;

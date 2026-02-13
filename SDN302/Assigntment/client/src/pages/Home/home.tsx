import { useState } from "react";
import { useHomeData } from "../../hooks";
import BrandFilter from "./BrandFilter";
import PerfumeGrid from "./PerfumeGrid";
import Hero from "./Hero";

const Home = () => {
  const { brands, perfumes, loading, error } = useHomeData();
  const [selectedBrandId, setSelectedBrandId] = useState<string | null>(null);

  // Filter perfumes based on selected brand
  const filteredPerfumes = selectedBrandId
    ? perfumes.filter((perfume) => perfume.brand?._id === selectedBrandId)
    : perfumes;

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <main className="max-w-7xl mx-auto px-6 lg:px-20 py-10">
        <Hero />

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

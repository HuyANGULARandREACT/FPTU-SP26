import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { IPerfume } from "../../types/type";
import { perfumeAPI } from "../../services/perfumeAPI";

const PerfumeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [perfume, setPerfume] = useState<IPerfume | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchPerfume = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const data = await perfumeAPI.getPerfumeById(id);
        setPerfume(data);
        setError("");
      } catch (err) {
        setError("Failed to load perfume details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPerfume();
  }, [id]);

  if (loading) {
    return (
      <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 transition-colors duration-300 min-h-screen flex items-center justify-center">
        <span className="text-lg text-slate-500">
          Loading perfume details...
        </span>
      </div>
    );
  }

  if (error || !perfume) {
    return (
      <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 transition-colors duration-300 min-h-screen flex items-center justify-center">
        <span className="text-lg text-red-500">
          {error || "Perfume not found"}
        </span>
      </div>
    );
  }

  // Image gallery (using uri as main image, could be extended for multiple images)

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 transition-colors duration-300 min-h-screen">
      <main className="max-w-7xl mx-auto px-6 lg:px-20 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery Section */}
          <div className="flex flex-col gap-6">
            {/* Main Image */}
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800">
              <img
                alt={perfume.perfumeName}
                className="w-full h-full object-cover"
                src={perfume.uri}
              />
              {/* Image Overlay Badges */}
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="bg-primary text-white text-xs font-bold uppercase px-3 py-1 rounded-full">
                  {perfume.concentration}
                </span>
                <span className="bg-white/90 dark:bg-black/80 backdrop-blur text-xs font-bold uppercase px-3 py-1 rounded-full">
                  {perfume.targetAudience}
                </span>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="flex flex-col gap-8">
            {/* Brand */}
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-primary mb-2">
                {perfume.brand?.brandName || "Unknown Brand"}
              </p>
              <h1 className="text-4xl lg:text-5xl font-black leading-tight">
                {perfume.perfumeName}
              </h1>
            </div>

            {/* Rating (if available) */}
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-primary text-lg">
                    ★
                  </span>
                ))}
              </div>
              <span className="text-sm font-semibold">
                ({perfume.comments?.length || 0} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-4">
              <span className="text-4xl font-black text-primary">
                ${perfume.price.toFixed(2)}
              </span>
              <span className="text-xs font-bold uppercase tracking-widest bg-primary/10 text-primary px-3 py-1 rounded-full">
                {perfume.concentration}
              </span>
            </div>

            {/* Specs Grid */}
            <div className="grid grid-cols-3 gap-4 py-6 border-y border-slate-200 dark:border-slate-700">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">
                  Concentration
                </p>
                <p className="font-bold">{perfume.concentration}</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">
                  Volume
                </p>
                <p className="font-bold">{perfume.volume}ml</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">
                  Audience
                </p>
                <p className="font-bold capitalize">{perfume.targetAudience}</p>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest mb-3">
                About This Scent
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {perfume.description}
              </p>
            </div>

            {/* Ingredients */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest mb-3">
                Key Ingredients
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {perfume.ingredients}
              </p>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        {/* {perfume.comments && perfume.comments.length > 0 && (
          <div className="mt-20 py-12 border-t border-slate-200 dark:border-slate-700">
            <h2 className="text-3xl font-black mb-8">Customer Reviews</h2>
            <div className="grid gap-6">
              {perfume.comments.map((comment) => (
                <div
                  key={comment._id}
                  className="p-6 border border-slate-200 dark:border-slate-700 rounded-xl"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-bold">{comment.author?.membername || "Anonymous"}</p>
                      <div className="flex gap-1 text-primary text-sm">
                        {[...Array(comment.rating)].map((_, i) => (
                          <span key={i}>★</span>
                        ))}
                      </div>
                    </div>
                    <span className="text-xs text-slate-500">
                      {comment.createdAt
                        ? new Date(comment.createdAt).toLocaleDateString()
                        : "Recent"}
                    </span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400">{comment.content}</p>
                </div>
              ))}
            </div>
          </div>
        )} */}
      </main>
    </div>
  );
};

export default PerfumeDetail;

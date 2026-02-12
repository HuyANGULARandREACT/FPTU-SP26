import React from "react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden rounded-3xl mb-20 group">
      <div className="grid grid-cols-1 lg:grid-cols-2 bg-background-dark text-white min-h-[500px]">
        <div className="flex flex-col justify-center p-10 lg:p-20 space-y-6 z-10">
          <div className="flex items-center gap-2 text-primary">
            <span className="h-px w-8 bg-primary"></span>
            <span className="text-xs font-bold uppercase tracking-widest">
              Editor&apos;s Choice
            </span>
          </div>
          <h2 className="text-5xl lg:text-7xl font-black leading-none">
            Oud <br />
            Nocturne
          </h2>
          <p className="text-slate-400 text-lg max-w-md leading-relaxed">
            A poetic journey through the heart of the night. Featuring rare
            Cambodian oud, Bulgarian rose, and dark leather.
          </p>
          <div className="flex items-center gap-4 pt-4">
            <button className="bg-primary text-white px-8 py-4 rounded-xl font-bold hover:scale-105 transition-transform flex items-center gap-2">
              Explore the Scent
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
            <button className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-bold backdrop-blur-md transition-all">
              View Story
            </button>
          </div>
        </div>
        <div className="relative h-64 lg:h-auto overflow-hidden">
          <img
            alt="Featured Perfume"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            data-alt="Luxury dark glass perfume bottle with gold accents"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgWrmqYHbRZGBwZtKP5Acb5zXN4Gf-aljovSoQfbovliq-S1_PXQXgkuDfgEFwcst6IuxPt6hF70sHHLZvVt5iKLlu5ssYW_Mwz3W0kLJUO2HpO9d8tvb9O-CympZ0AnH1L2QSn1x4r9vkwOK7AKEStXSgilSnoAs5w-jp0N2hMoOxqzuJhTPwGk_uv5amOL2pT-tylY_MgdPRi12jvrtg7a1qIfB9lKJQzGtwENnSEO08wDZC_KIHiDoTVx_F_Z8qu7MYEOuRzic"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background-dark via-transparent to-transparent"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

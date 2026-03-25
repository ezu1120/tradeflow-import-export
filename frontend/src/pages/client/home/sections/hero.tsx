import { motion } from "framer-motion";
import { ArrowRight, Globe2, TrendingUp, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSiteSettings } from "@/hooks/useSiteSettings";

export default function HeroSection() {
  const navigate = useNavigate();
  const { settings } = useSiteSettings();

  const scrollToQuote = () => {
    document.getElementById("quote-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-[#0a1120] pt-[82px]">

      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=2070&auto=format&fit=crop')` }} />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1120]/97 via-[#0a1120]/88 to-[#0a1120]/75" />
        {/* Gold glow accents */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#D4AF37]/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-blue-500/8 rounded-full blur-3xl" />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: "linear-gradient(#D4AF37 1px, transparent 1px), linear-gradient(90deg, #D4AF37 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      {/* Main content */}
      <div className="relative h-full flex items-center py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left — Text */}
            <div>
              {/* Badge */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 mb-8">
                <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                <span className="text-[#D4AF37] text-xs font-semibold tracking-widest uppercase">
                  {settings.hero_badge_text || "Trusted Global Trade Partner"}
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6">
                {settings.hero_title || "Global Trade"}{" "}
                <span className="relative">
                  <span className="text-[#D4AF37]">{settings.hero_title_highlight || "Simplified."}</span>
                  <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.9 }}
                    className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#D4AF37] to-transparent origin-left rounded-full" />
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
                className="text-lg text-white/75 mb-10 leading-relaxed max-w-xl font-light">
                {settings.hero_subtitle || "Expert Import-Export solutions connecting your business to the world's most lucrative markets."}
              </motion.p>

              {/* CTAs */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 mb-12">
                <button onClick={scrollToQuote}
                  className="group flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#101828] font-bold text-sm h-13 px-8 py-4 rounded-xl shadow-lg shadow-[#D4AF37]/20 hover:shadow-[#D4AF37]/40 transition-all duration-300 hover:scale-105">
                  {settings.hero_cta_primary || "Request a Quote"}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button onClick={() => navigate("/products")}
                  className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/20 hover:border-[#D4AF37]/50 font-semibold text-sm h-13 px-8 py-4 rounded-xl backdrop-blur-sm transition-all duration-300">
                  <Globe2 className="w-4 h-4 text-[#D4AF37]" />
                  {settings.hero_cta_secondary || "Our Products"}
                </button>
              </motion.div>

              {/* Stats row */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.8 }}
                className="flex flex-wrap gap-8 pt-8 border-t border-white/10">
                {[
                  { value: settings.stat_years || "10+",    label: settings.stat_years_label || "Years Experience" },
                  { value: settings.stat_countries || "50+", label: settings.stat_countries_label || "Countries Served" },
                  { value: settings.stat_shipments || "500+", label: settings.stat_shipments_label || "Products Available" },
                ].map((s, i) => (
                  <div key={i}>
                    <div className="text-3xl font-black text-[#D4AF37]">{s.value}</div>
                    <div className="text-xs text-white/50 font-medium mt-0.5">{s.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right — Floating cards */}
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.5 }}
              className="hidden lg:flex flex-col gap-4">

              {/* Card 1 */}
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0">
                  <Globe2 className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Global Network</p>
                  <p className="text-white/50 text-xs mt-0.5">Active in 50+ countries worldwide</p>
                </div>
                <div className="ml-auto text-[#D4AF37] font-bold text-lg">50+</div>
              </motion.div>

              {/* Card 2 */}
              <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 flex items-center gap-4 ml-8">
                <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Trade Growth</p>
                  <p className="text-white/50 text-xs mt-0.5">Consistent year-over-year growth</p>
                </div>
                <div className="ml-auto text-green-400 font-bold text-lg">↑98%</div>
              </motion.div>

              {/* Card 3 */}
              <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Secure & Certified</p>
                  <p className="text-white/50 text-xs mt-0.5">ISO certified trade operations</p>
                </div>
                <div className="ml-auto text-blue-400 font-bold text-sm">ISO ✓</div>
              </motion.div>

              {/* Decorative ring */}
              <div className="absolute right-8 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-[#D4AF37]/10 pointer-events-none" />
              <div className="absolute right-16 top-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-[#D4AF37]/5 pointer-events-none" />
            </motion.div>

          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/40">
        <span className="text-[10px] font-medium tracking-widest mb-2">SCROLL TO EXPLORE</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent" />
      </motion.div>
    </section>
  );
}

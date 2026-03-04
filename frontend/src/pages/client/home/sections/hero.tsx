import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#101828] pt-[82px]">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=2070&auto=format&fit=crop')`,
          }}
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#101828]/95 via-[#101828]/85 to-[#101828]/70" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center pt-8">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 mb-8">
                <span className="text-[#D4AF37] text-sm font-semibold tracking-wide">
                  TRUSTED BY 2,000+ GLOBAL ENTERPRISES
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black text-white mb-8 leading-[0.9] tracking-tight">
                Global Trade,{" "}
                <span className="text-[#D4AF37] block">Simplified.</span>
              </h1>

              {/* Sub-headline */}
              <p className="text-xl sm:text-2xl lg:text-3xl text-white/90 mb-12 leading-relaxed max-w-3xl font-light">
                Expert Import-Export solutions connecting your business to the world's most lucrative markets.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6">
                <Button
                  size="lg"
                  className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#101828] font-bold text-lg h-16 px-10 rounded-xl shadow-2xl hover:shadow-[#D4AF37]/25 transition-all duration-300 transform hover:scale-105"
                  onClick={() => navigate("/contact")}
                >
                  Request a Quote
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
                
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent hover:bg-white/10 text-white border-2 border-white/30 hover:border-white/50 font-semibold text-lg h-16 px-10 rounded-xl backdrop-blur-sm transition-all duration-300"
                  onClick={() => navigate("/services")}
                >
                  <Play className="mr-3 h-5 w-5" />
                  Our Products
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-8 mt-16 pt-8 border-t border-white/10">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#D4AF37] mb-1">15+</div>
                  <div className="text-sm text-white/70 font-medium">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#D4AF37] mb-1">50+</div>
                  <div className="text-sm text-white/70 font-medium">Countries Served</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#D4AF37] mb-1">10K+</div>
                  <div className="text-sm text-white/70 font-medium">Shipments Delivered</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center text-white/60">
          <span className="text-xs font-medium mb-2 tracking-wider">SCROLL TO EXPLORE</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/60 to-transparent"></div>
        </div>
      </motion.div>
    </section>
  );
}

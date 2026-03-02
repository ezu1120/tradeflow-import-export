import React from "react";
import { motion } from "framer-motion";

const bgImage =
  "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=80&w=2074&auto=format&fit=crop";

const PageHeader = () => {
  return (
    <div
      className="relative h-[400px] md:h-[500px] w-full flex justify-center items-center overflow-hidden"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#101828]/95 via-slate-900/90 to-indigo-950/85"></div>

      {/* Decorative Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative flex flex-col text-center px-4 sm:px-8 md:px-16 max-w-5xl z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/10 px-4 py-2 mx-auto"
        >
          <span className="text-sm font-medium text-[#D4AF37] uppercase tracking-wider">
            Contact Us
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight"
        >
          Get in <span className="text-[#D4AF37]">Touch</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed"
        >
          We're here to help with your import and export needs. Reach out to our
          team and we'll get back to you within 24 hours.
        </motion.p>

        {/* Decorative Line */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "6rem" }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="h-1 bg-gradient-to-r from-[#D4AF37] to-transparent mx-auto mt-8"
        />
      </div>
    </div>
  );
};

export default PageHeader;

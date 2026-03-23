import { motion } from "framer-motion";
import { Award, Shield, Globe, CheckCircle2, Star, Truck } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const certIcons = [Award, Shield, Globe, CheckCircle2, Star, Truck];

export default function TrustBar() {
  const { settings } = useSiteSettings();

  const certifications = [
    { name: settings.cert1_name, icon: certIcons[0] },
    { name: settings.cert2_name, icon: certIcons[1] },
    { name: settings.cert3_name, icon: certIcons[2] },
    { name: settings.cert4_name, icon: certIcons[3] },
    { name: settings.cert5_name, icon: certIcons[4] },
    { name: settings.cert6_name, icon: certIcons[5] },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-slate-800 to-slate-900 border-b border-slate-700 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.05]">
        <div className="absolute inset-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
      </div>
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-16">
          <p className="text-sm font-semibold text-[#D4AF37] uppercase tracking-wider mb-4">{settings.trust_bar_badge}</p>
          <h2 className="text-3xl font-bold text-white mb-4">{settings.trust_bar_title}</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#D4AF37] to-[#D4AF37]/50 mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {certifications.map((cert, index) => {
            const Icon = cert.icon;
            return (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }} viewport={{ once: true }} className="flex flex-col items-center group cursor-pointer">
                <div className="w-20 h-20 bg-slate-700/50 backdrop-blur-sm rounded-3xl flex items-center justify-center mb-4 group-hover:bg-[#D4AF37]/20 group-hover:scale-110 transition-all duration-300 shadow-xl border border-slate-600/50">
                  <Icon className="w-10 h-10 text-slate-300 group-hover:text-[#D4AF37] transition-colors duration-300" />
                </div>
                <span className="text-sm font-semibold text-slate-300 text-center leading-tight group-hover:text-white transition-colors duration-300">{cert.name}</span>
              </motion.div>
            );
          })}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }} viewport={{ once: true }} className="text-center mt-16 pt-12 border-t border-slate-700/50">
          <div className="bg-slate-700/30 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto border border-slate-600/50 shadow-2xl">
            <p className="text-slate-200 text-lg leading-relaxed">{settings.trust_bar_statement}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

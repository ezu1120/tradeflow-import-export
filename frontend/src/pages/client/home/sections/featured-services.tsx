import { motion } from "framer-motion";
import { ArrowRight, Globe, FileCheck, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function FeaturedServices() {
  const navigate = useNavigate();

  const services = [
    {
      icon: Globe,
      title: "Global Logistics",
      description: "End-to-end supply chain management with real-time tracking across air, sea, and land transportation networks.",
      features: ["Multi-modal shipping", "Real-time tracking", "Global network"],
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: FileCheck,
      title: "Customs Clearance",
      description: "Expert documentation and regulatory compliance services to ensure smooth passage through international borders.",
      features: ["Expert documentation", "Regulatory compliance", "Fast processing"],
      color: "from-emerald-500 to-emerald-600"
    },
    {
      icon: BarChart3,
      title: "Supply Chain Management",
      description: "Strategic optimization and analytics to maximize efficiency, reduce costs, and improve delivery performance.",
      features: ["Cost optimization", "Performance analytics", "Strategic planning"],
      color: "from-purple-500 to-purple-600"
    }
  ];

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/green-logistics-sustainability.jpg')`,
          }}
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/93 via-gray-900/90 to-slate-800/93" />
      </div>
      
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#D4AF37]/12 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#D4AF37]/8 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-slate-700/10 rounded-full blur-3xl"></div>
      </div>
      
      {/* Hexagon Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='1'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="text-sm font-semibold text-[#D4AF37] uppercase tracking-wider mb-4">
            CORE SERVICES
          </p>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
            Everything You Need for
            <span className="block text-[#D4AF37]">Global Trade Success</span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-[#D4AF37] to-[#D4AF37]/50 mx-auto mb-6"></div>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            From initial planning to final delivery, our comprehensive suite of services 
            ensures your international trade operations run seamlessly.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 shadow-2xl hover:shadow-[#D4AF37]/10 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-slate-700/50 h-full relative overflow-hidden">
                  {/* Card Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-700/20 to-slate-800/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#D4AF37] transition-colors duration-300">
                      {service.title}
                    </h3>
                    
                    <p className="text-slate-300 mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-3 mb-8">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-slate-400">
                          <div className="w-2 h-2 bg-[#D4AF37] rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <Button
                      variant="ghost"
                      className="text-slate-300 hover:text-[#D4AF37] font-semibold p-0 h-auto group-hover:translate-x-2 transition-all duration-300"
                      onClick={() => navigate("/services")}
                    >
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <Button
            size="lg"
            className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#101828] font-bold text-lg h-14 px-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            onClick={() => navigate("/services")}
          >
            View All Services
            <ArrowRight className="ml-3 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
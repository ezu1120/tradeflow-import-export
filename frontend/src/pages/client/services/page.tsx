import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Shield, Globe2, HeadphonesIcon } from "lucide-react";
import PageHeader from "./header";
import { publicApi } from "@/hooks/api";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import * as Icons from "lucide-react";

interface Service { id: number; title: string; description: string; icon: string; features: string[]; color: string }

function DynamicIcon({ name, className }: { name: string; className?: string }) {
  const Icon = (Icons as any)[name] || Icons.Globe;
  return <Icon className={className} />;
}

export default function ServicesPage() {
  const { settings } = useSiteSettings();
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    publicApi.get("/api/content/services/").then(r => setServices(r.data.results || r.data)).catch(() => {});
  }, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-slate-900 to-slate-950">
      <PageHeader />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {settings.services_title?.split(' ').map((w: string, i: number) =>
              i === 1 ? <span key={i} className="text-[#D4AF37]"> {w}</span> : w + ' '
            )}
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto">{settings.services_subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service) => (
            <Card key={service.id} className="group relative overflow-hidden border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm hover:border-[#D4AF37]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#D4AF37]/10">
              <CardContent className="p-6">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <DynamicIcon name={service.icon} className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#D4AF37] transition-colors">{service.title}</h3>
                <p className="text-slate-300 text-sm mb-4 leading-relaxed">{service.description}</p>
                <ul className="space-y-2">
                  {(service.features || []).map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-slate-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D4AF37] to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-12">
          {[
            { icon: Clock,          label: "Fast Processing", desc: "Quick turnaround on all shipments" },
            { icon: Shield,         label: "Secure & Safe",   desc: "Full insurance coverage available" },
            { icon: Globe2,         label: "Global Network",  desc: "Presence in 50+ countries" },
            { icon: HeadphonesIcon, label: "24/7 Support",    desc: "Always here when you need us" },
          ].map(({ icon: Icon, label, desc }) => (
            <div key={label} className="p-6 rounded-xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 text-center">
              <Icon className="w-8 h-8 text-[#D4AF37] mx-auto mb-3" />
              <h4 className="font-bold text-white mb-2">{label}</h4>
              <p className="text-sm text-slate-300">{desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

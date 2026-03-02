export default function Certifications() {
  const certifications = [
    {
      name: "ISO 9001:2015",
      description: "Quality Management",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/ISO_9001_logo.svg/200px-ISO_9001_logo.svg.png",
    },
    {
      name: "ISO 14001",
      description: "Environmental Management",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/ISO_14001_logo.svg/200px-ISO_14001_logo.svg.png",
    },
    {
      name: "AEO Certified",
      description: "Authorized Economic Operator",
      logo: "https://taxation-customs.ec.europa.eu/sites/default/files/styles/oe_theme_medium_no_crop/public/2021-09/aeo_logo_en.png",
    },
    {
      name: "C-TPAT",
      description: "Customs-Trade Partnership",
      logo: "https://www.cbp.gov/sites/default/files/styles/featured_image_large/public/2021-08/CTPAT-Logo.png",
    },
    {
      name: "IATA Accredited",
      description: "Air Cargo Agent",
      logo: "https://www.iata.org/contentassets/fb1137ff561a4819a2d58f7d7c0f8c6a/iata-logo-blue.png",
    },
    {
      name: "WCA Member",
      description: "World Cargo Alliance",
      logo: "https://www.wcaworld.com/Content/images/wca-logo.png",
    },
  ];

  return (
    <section className="w-full py-20 md:py-28 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden relative">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
        <div className="mb-16 text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-[#d4af37] mb-3">
            Trusted & Certified
          </p>
          <h2 className="text-balance text-4xl font-bold md:text-5xl mb-4">
            Global Certifications & Compliance
          </h2>
          <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
            Recognized by international trade authorities and industry leaders worldwide
          </p>
        </div>

        <div className="relative">
          {/* Animated Marquee */}
          <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">
            <div className="flex animate-marquee gap-8" style={{ "--duration": "40s" } as React.CSSProperties}>
              {[...certifications, ...certifications].map((cert, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 w-72 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/20 transition-all duration-300 group"
                >
                  <div className="flex flex-col items-center gap-4 text-center">
                    {/* Logo Container */}
                    <div className="w-full h-24 flex items-center justify-center bg-white rounded-lg p-4 group-hover:scale-105 transition-transform duration-300">
                      <img 
                        src={cert.logo} 
                        alt={cert.name}
                        className="max-w-full max-h-full object-contain"
                        onError={(e) => {
                          // Fallback to text if image fails to load
                          e.currentTarget.style.display = 'none';
                          const parent = e.currentTarget.parentElement;
                          if (parent) {
                            parent.innerHTML = `<div class="text-[#1a2a6c] font-bold text-lg">${cert.name}</div>`;
                          }
                        }}
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">{cert.name}</h3>
                      <p className="text-sm text-white/70">{cert.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl md:text-5xl font-bold text-[#d4af37] mb-2">150+</div>
            <div className="text-sm text-white/70">Countries Served</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold text-[#d4af37] mb-2">25+</div>
            <div className="text-sm text-white/70">Years Experience</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold text-[#d4af37] mb-2">10K+</div>
            <div className="text-sm text-white/70">Shipments Monthly</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold text-[#d4af37] mb-2">99.8%</div>
            <div className="text-sm text-white/70">On-Time Delivery</div>
          </div>
        </div>
      </div>
    </section>
  );
}

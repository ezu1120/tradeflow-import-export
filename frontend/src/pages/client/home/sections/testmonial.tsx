import React from "react";
import Marquee from "@/components/ui/marquee";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

// Dummy testimonials
// Dummy testimonials
const testimonials = [
  {
    name: "Abebe Bekele",
    feedback:
      "Excellent import/export service! Timely delivery and professional team.",
  },
  {
    name: "Saba Desta",
    feedback:
      "Smooth process and great communication. Highly recommend their services.",
  },
  {
    name: "Kebede Alemu",
    feedback:
      "Reliable and trustworthy import/export partner. Will work with them again.",
  },
  {
    name: "Hana Tadesse",
    feedback: "Amazing support and prompt delivery. Very satisfied!",
  },
];

const TestimonialMarquee = () => {
  return (
    <section className="py-20 md:py-28 w-full px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/global-trade-shipping-containers.jpg')`,
          }}
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/93 via-gray-900/90 to-slate-800/93" />
      </div>
      
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-1/3 w-[500px] h-[500px] bg-[#D4AF37]/12 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-[#D4AF37]/8 rounded-full blur-3xl"></div>
      </div>

      {/* Star Pattern */}
      {/* <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4AF37' fill-opacity='1'%3E%3Cpath d='M30 0l2 28h28l-23 17 9 27-16-12-16 12 9-27-23-17h28z'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div> */}

      <div className="relative">
        <header className="mb-16 text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-[#D4AF37] mb-4">
            CLIENT SUCCESS STORIES
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Trusted by Global Leaders
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            See what our enterprise clients say about their experience with TradeFlow
          </p>
        </header>

        <Marquee className="[--duration:25s]" pauseOnHover>
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="w-[280px] md:w-[320px] mx-3 p-6 shadow-2xl hover:shadow-[#D4AF37]/10 transition-all duration-300 rounded-2xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 hover:border-[#D4AF37]/30"
            >
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-bold text-white">
                  {testimonial.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-300 leading-relaxed">
                  "{testimonial.feedback}"
                </CardDescription>
                <div className="flex items-center mt-4 pt-4 border-t border-slate-700/50">
                  <div className="flex text-[#D4AF37]">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-sm">★</span>
                    ))}
                  </div>
                  <span className="text-xs text-slate-400 ml-2">Verified Client</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default TestimonialMarquee;

"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, Globe, Shield, TrendingUp, Users, 
  Award, CheckCircle2, Target, Zap, Heart, Lightbulb
} from "lucide-react";
import PageHeader from "./header";

const stats = [
  { value: "20+", label: "Years Experience" },
  { value: "150+", label: "Countries Served" },
  { value: "10K+", label: "Shipments Delivered" },
  { value: "99.8%", label: "Success Rate" },
];

const values = [
  {
    icon: Target,
    title: "Customer First",
    description: "Your success is our priority. We tailor solutions to meet your unique needs."
  },
  {
    icon: Shield,
    title: "Integrity",
    description: "Transparent operations and ethical practices in every transaction."
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Leveraging technology to streamline global trade operations."
  },
  {
    icon: Heart,
    title: "Excellence",
    description: "Committed to delivering exceptional service quality every time."
  },
];

const milestones = [
  { year: "2004", title: "Company Founded", description: "Started with a vision to simplify global trade" },
  { year: "2010", title: "Global Expansion", description: "Extended services to 50+ countries" },
  { year: "2015", title: "Technology Integration", description: "Launched real-time tracking platform" },
  { year: "2020", title: "Industry Leader", description: "Recognized as top logistics provider" },
  { year: "2024", title: "Sustainable Future", description: "Committed to eco-friendly operations" },
];

const features = [
  {
    icon: Globe,
    title: "Global Network",
    description: "Strategic partnerships across 150+ countries for seamless operations"
  },
  {
    icon: Shield,
    title: "Compliance Expertise",
    description: "ISO certified with full regulatory compliance in all markets"
  },
  {
    icon: TrendingUp,
    title: "Growth Partner",
    description: "Scalable solutions that grow with your business needs"
  },
  {
    icon: Users,
    title: "Dedicated Support",
    description: "24/7 expert assistance from your personal trade specialists"
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-900">
      <PageHeader />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-6 py-24 md:py-32">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#D4AF37]/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="mx-auto max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 backdrop-blur-sm border border-[#D4AF37]/30 rounded-full px-6 py-2 mb-8">
              <Award className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-sm font-semibold text-[#D4AF37] uppercase tracking-wider">
                About TradeFlow
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
              Your Trusted Partner in
              <span className="block bg-gradient-to-r from-[#D4AF37] to-amber-300 bg-clip-text text-transparent">
                Global Commerce
              </span>
            </h1>

            <p className="text-xl text-slate-300 mb-10 leading-relaxed max-w-3xl mx-auto">
              For over two decades, we've been eliminating the complexity of international trade, 
              helping businesses expand globally with confidence.
            </p>

            <Button size="lg" className="gap-2 group bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-slate-900 font-bold">
              Get Started
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-slate-800/50 border-y border-slate-700/50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-black text-[#D4AF37] mb-2">
                  {stat.value}
                </div>
                <div className="text-slate-400 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M0 0h1v1H0V0zm50 0h1v1h-1V0zm0 50h1v1h-1v-1z'/%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="mx-auto max-w-7xl px-6 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/global-trade-shipping-containers.jpg"
                  alt="TradeFlow Operations"
                  className="w-full h-full object-cover aspect-[4/3]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="bg-slate-800/90 backdrop-blur-md rounded-2xl p-6 border border-slate-700/50">
                    <div className="text-2xl font-bold text-white mb-2">
                      Trusted by Fortune 500 Companies
                    </div>
                    <div className="text-slate-300">
                      Delivering excellence in global trade since 2004
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-4xl font-bold text-white leading-tight">
                Building Bridges Between Markets Since 2004
              </h2>

              <p className="text-lg text-slate-300 leading-relaxed">
                TradeFlow was founded with a simple mission: make international trade accessible 
                to businesses of all sizes. What started as a small logistics operation has grown 
                into a global network spanning 150+ countries.
              </p>

              <p className="text-lg text-slate-300 leading-relaxed">
                Today, we handle everything from customs documentation to last-mile delivery, 
                helping thousands of companies navigate the complexities of global commerce with 
                confidence and ease.
              </p>

              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-2">Our Commitment</h3>
                    <p className="text-slate-300">
                      We're committed to transparency, reliability, and building long-term 
                      partnerships that drive mutual success.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-3xl"></div>
        </div>

        <div className="mx-auto max-w-7xl px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Our Core Values</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 hover:border-[#D4AF37]/50 transition-all duration-300 group"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-[#D4AF37] to-amber-500 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7 text-slate-900" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#D4AF37] transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-gradient-to-b from-slate-800 to-slate-900 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Our Journey</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Key milestones in our growth story
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#D4AF37] via-[#D4AF37]/50 to-transparent transform -translate-x-1/2 hidden md:block"></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`flex flex-col md:flex-row items-center gap-8 ${
                    index % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  <div className="flex-1 md:text-right">
                    <div className={`bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 ${
                      index % 2 === 0 ? 'md:ml-auto' : 'md:mr-auto'
                    } max-w-md`}>
                      <div className="text-2xl font-bold text-[#D4AF37] mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-bold text-white mb-2">{milestone.title}</h3>
                      <p className="text-slate-300">{milestone.description}</p>
                    </div>
                  </div>
                  
                  <div className="w-4 h-4 bg-[#D4AF37] rounded-full border-4 border-slate-900 ring-4 ring-[#D4AF37]/20 flex-shrink-0"></div>
                  
                  <div className="flex-1"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose TradeFlow</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              The advantages that set us apart in global logistics
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 hover:border-[#D4AF37]/50 transition-all duration-300 group text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37] to-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-slate-900" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed text-sm">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-slate-800 via-indigo-950 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl"></div>
        </div>

        <div className="mx-auto max-w-4xl px-6 relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Go Global?
            </h2>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
              Let's discuss how we can help your business expand into new markets 
              with confidence and ease.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-slate-900 font-bold">
                Schedule Consultation
              </Button>
              <Button size="lg" variant="outline" className="border-slate-600 text-white hover:bg-slate-800">
                View Services
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

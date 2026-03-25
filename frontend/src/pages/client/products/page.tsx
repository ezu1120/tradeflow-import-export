import { useState, useMemo, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Search, ChevronRight, ShieldCheck, Globe2, Truck, HeadphonesIcon, BadgeCheck, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { publicApi } from "@/hooks/api";
import { Link } from "react-router-dom";

interface Product {
  id: number; name: string; description: string; image: string;
  category: string; type: string; price: string; rating: number; reviews: number;
}

function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="pt-0 overflow-hidden border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm hover:border-[#D4AF37]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#D4AF37]/10 cursor-pointer group">
      <div className="relative w-full h-48 overflow-hidden bg-slate-900">
        <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        <div className="absolute top-3 right-3 bg-[#D4AF37] text-[#101828] px-3 py-1 rounded-full text-xs font-semibold">{product.type}</div>
      </div>
      <CardContent className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-white line-clamp-2 group-hover:text-[#D4AF37] transition-colors">{product.name}</h3>
          <p className="text-sm text-slate-300 line-clamp-2 mt-1">{product.description}</p>
        </div>
        <div className="flex items-center gap-2">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={`text-sm ${i < Math.round(product.rating) ? "text-[#D4AF37]" : "text-slate-600"}`}>★</span>
          ))}
          <span className="text-sm font-medium text-white">{product.rating}</span>
          <span className="text-xs text-slate-400">({product.reviews})</span>
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-slate-700/50">
          {product.price && <span className="text-sm font-semibold text-[#D4AF37]">{product.price}</span>}
          <button className="inline-flex items-center gap-1 text-sm font-medium text-[#D4AF37] hover:text-[#D4AF37]/80 transition-colors">
            View <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ProductsPage() {
  const [activeTab, setActiveTab] = useState<"import" | "export">("import");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    publicApi.get("/api/content/products/").then(r => setProducts(r.data.results || r.data)).catch(() => {});
  }, []);

  const filteredProducts = useMemo(() => products.filter(p =>
    p.category === activeTab &&
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedType ? p.type === selectedType : true)
  ), [products, activeTab, searchQuery, selectedType]);

  const types = useMemo(() =>
    Array.from(new Set(products.filter(p => p.category === activeTab).map(p => p.type))).sort()
  , [products, activeTab]);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-slate-900 to-slate-950">
      {/* Page Header */}
      <div className="relative h-[400px] w-full flex justify-center items-center overflow-hidden"
        style={{ backgroundImage: "url(https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop)", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="absolute inset-0 bg-gradient-to-br from-[#101828]/95 via-slate-900/90 to-indigo-950/85"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        </div>
        <div className="relative flex flex-col text-center px-4 sm:px-8 max-w-5xl z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/10 px-4 py-2 mx-auto">
            <span className="text-sm font-medium text-[#D4AF37] uppercase tracking-wider">Our Catalogue</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
            Our <span className="text-[#D4AF37]">Products</span>

          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Browse our full range of verified import and export products, ready for global trade.
          </motion.p>
          <motion.div initial={{ width: 0 }} animate={{ width: "6rem" }} transition={{ duration: 0.8, delay: 0.6 }}
            className="h-1 bg-gradient-to-r from-[#D4AF37] to-transparent mx-auto mt-8" />
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { value: "500+", label: "Products Available" },
            { value: "50+",  label: "Countries Served" },
            { value: "98%",  label: "Client Satisfaction" },
            { value: "10+",  label: "Years Experience" },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="text-center p-5 rounded-xl bg-gradient-to-br from-[#D4AF37]/10 to-transparent border border-[#D4AF37]/20">
              <p className="text-3xl font-black text-[#D4AF37]">{s.value}</p>
              <p className="text-sm text-slate-300 mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Why trade with us */}
        <div className="mb-12 rounded-2xl bg-slate-800/40 border border-slate-700/50 p-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Why Trade With <span className="text-[#D4AF37]">Us</span></h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: BadgeCheck,      title: "Quality Guaranteed",   desc: "Every product is inspected and certified before shipment." },
              { icon: Globe2,          title: "Global Reach",         desc: "We operate in 50+ countries with established trade routes." },
              { icon: Truck,           title: "Fast Delivery",        desc: "Optimized logistics ensure delivery in 7–14 business days." },
              { icon: ShieldCheck,     title: "Secure Transactions",  desc: "SSL-encrypted payments and full insurance coverage." },
              { icon: TrendingUp,      title: "Competitive Pricing",  desc: "Direct sourcing means better prices for your business." },
              { icon: HeadphonesIcon,  title: "Dedicated Support",    desc: "Our trade experts are available 24/7 to assist you." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-4 p-4 rounded-xl hover:bg-slate-700/30 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">{title}</p>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section title */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-white">Our <span className="text-[#D4AF37]">Products</span></h2>
          <p className="text-slate-400 mt-2 text-sm">Browse our verified import and export catalogue</p>
        </div>

        {/* Products Tabs */}
        <Tabs value={activeTab} onValueChange={v => setActiveTab(v as "import" | "export")} className="w-full">
          <TabsList className="grid w-full max-w-xs grid-cols-2 mb-6 bg-slate-800/50 border border-slate-700/50">
            <TabsTrigger value="import" className="text-base text-white data-[state=active]:bg-[#FFD700] data-[state=active]:text-[#101828]">Import</TabsTrigger>
            <TabsTrigger value="export" className="text-base text-white data-[state=active]:bg-[#FFD700] data-[state=active]:text-[#101828]">Export</TabsTrigger>
          </TabsList>
          {(["import", "export"] as const).map(tab => (
            <TabsContent key={tab} value={tab} className="space-y-6">
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                  <input type="text" placeholder="Search products..." value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-600 bg-slate-900/50 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]" />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  <button onClick={() => setSelectedType(null)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${selectedType === null ? "bg-[#D4AF37] text-[#101828]" : "bg-slate-800 text-white hover:bg-slate-700"}`}>
                    All Types
                  </button>
                  {types.map(type => (
                    <button key={type} onClick={() => setSelectedType(type)}
                      className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${selectedType === type ? "bg-[#D4AF37] text-[#101828]" : "bg-slate-800 text-white hover:bg-slate-700"}`}>
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredProducts.length > 0
                  ? filteredProducts.map(p => <ProductCard key={p.id} product={p} />)
                  : (
                    <div className="col-span-full text-center py-16">
                      <p className="text-lg text-slate-300">No products found</p>
                      <p className="text-sm text-slate-400">Try adjusting your search or filters</p>
                    </div>
                  )}
              </div>
              {filteredProducts.length > 0 && (
                <p className="text-center text-sm text-slate-400">Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}</p>
              )}
            </TabsContent>
          ))}
        </Tabs>

        {/* CTA */}
        <div className="mt-16 rounded-2xl bg-gradient-to-r from-[#D4AF37]/20 via-[#D4AF37]/10 to-transparent border border-[#D4AF37]/30 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">Ready to start trading?</h3>
            <p className="text-slate-300 text-sm">Get in touch with our team for custom quotes and bulk orders.</p>
          </div>
          <Link to="/contact"
            className="flex-shrink-0 bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#101828] font-bold px-8 py-3 rounded-xl transition-colors text-sm">
            Get a Quote
          </Link>
        </div>
      </main>
    </div>
  );
}

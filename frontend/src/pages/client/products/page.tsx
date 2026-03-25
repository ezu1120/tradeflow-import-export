import { useState, useMemo, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Search, ChevronRight } from "lucide-react";
import { publicApi } from "@/hooks/api";

interface Product {
  id: number; name: string; description: string; image: string;
  category: string; type: string; price: string; rating: number; reviews: number;
}

const highlights = [
  { label: "Fast Shipping",     description: "Delivery in 7-14 days" },
  { label: "Secure Payments",   description: "SSL encrypted transactions" },
  { label: "Quality Verified",  description: "All products inspected" },
  { label: "24/7 Support",      description: "Always here to help" },
];

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
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700/50 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-semibold px-3 py-1 rounded-full border border-[#D4AF37]/20 mb-4">Our Products</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Import & Export <span className="text-[#D4AF37]">Products</span></h1>
          <p className="text-slate-300 max-w-2xl mx-auto">Browse our full range of import and export products, verified for quality and ready for global trade.</p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {highlights.map((item, idx) => (
            <div key={idx} className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50 text-center hover:border-[#D4AF37]/50 transition-colors">
              <p className="font-semibold text-white text-sm">{item.label}</p>
              <p className="text-xs text-slate-300">{item.description}</p>
            </div>
          ))}
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
      </main>
    </div>
  );
}

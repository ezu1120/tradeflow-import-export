import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Products() {
  const navigate = useNavigate();
  const products: any[] = [
    // Import Products
    {
      id: "electronics-import-1",
      name: "Smartphone Components",
      description:
        "High-quality semiconductor and display components from Asia",
      image: "/smartphone-components-circuit-boards.jpg",
      category: "import",
      type: "Electronics",
      price: "Starting from 5,000",
      rating: 4.8,
      reviews: 245,
    },
    {
      id: "textiles-import-1",
      name: "Premium Fabrics",
      description: "Cotton, silk, and synthetic fabrics from Indian mills",
      image: "/premium-fabrics-textiles-rolls.jpg",
      category: "import",
      type: "Textiles",
      price: "Starting from 2,000",
      rating: 4.7,
      reviews: 189,
    },
    {
      id: "machinery-import-1",
      name: "Industrial Equipment",
      description:
        "CNC machines and manufacturing equipment from Germany and Japan",
      image: "/industrial-machinery-equipment-factory.jpg",
      category: "import",
      type: "Machinery",
      price: "Starting from 50,000",
      rating: 4.9,
      reviews: 156,
    },
  ];

  return (
    <section id="products" className="w-full py-20 md:py-28 relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/global-trade-shipping-containers.jpg')`,
          }}
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-gray-900/92 to-slate-800/95" />
      </div>
      
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#D4AF37]/6 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/6 rounded-full blur-3xl"></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='50' height='50' viewBox='0 0 50 50' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='1'%3E%3Crect width='1' height='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 relative">
        <div className="mb-16 text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-[#D4AF37] mb-4">
            PRODUCT CATALOG
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Premium Import Solutions
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Discover our curated selection of high-quality products from trusted global suppliers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <p className="text-lg text-slate-300">No products found</p>
              <p className="text-sm text-slate-400">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="w-full py-8 flex justify-center items-center relative">
        <Button
          variant="outline"
          className="bg-transparent border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#101828] font-semibold px-8 py-3 rounded-xl transition-all duration-300"
          onClick={() => {
            navigate("/services");
          }}
        >
          View All Products & Services
        </Button>
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: any }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className="pt-0 overflow-hidden hover:border-[#D4AF37]/50 transition-all duration-300 hover:shadow-2xl cursor-pointer group bg-slate-800/50 backdrop-blur-sm border border-slate-700/50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative w-full h-48 overflow-hidden bg-slate-700">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 bg-[#D4AF37] text-[#101828] px-3 py-1 rounded-full text-xs font-bold">
          {product.type}
        </div>
      </div>

      <CardContent className="p-6 space-y-4 pt-4">
        {/* Product Name */}
        <div>
          <h3 className="font-bold text-white line-clamp-2 group-hover:text-[#D4AF37] transition-colors text-lg">
            {product.name}
          </h3>
          <p className="text-sm text-slate-300 line-clamp-2 mt-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`text-sm ${
                  i < Math.round(product.rating)
                    ? "text-[#D4AF37]"
                    : "text-slate-600"
                }`}
              >
                ★
              </span>
            ))}
          </div>
          <span className="text-sm font-semibold text-white">
            {product.rating}
          </span>
          <span className="text-xs text-slate-400">
            ({product.reviews} reviews)
          </span>
        </div>

        {/* Price and CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
          {product.price && (
            <span className="text-sm font-bold text-[#D4AF37]">
              {product.price} ETB
            </span>
          )}
          <button className="inline-flex items-center gap-1 text-sm font-semibold text-slate-300 hover:text-[#D4AF37] transition-colors">
            View Details
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}

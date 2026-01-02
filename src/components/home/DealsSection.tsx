import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Timer, ChevronRight, Flame } from "lucide-react";
import ProductCard from "@/components/products/ProductCard";
import { products } from "@/data/products";

const DealsSection = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Get products with discounts
  const dealProducts = products.filter((p) => p.originalPrice);

  return (
    <section className="py-12 bg-gradient-to-r from-sale/10 to-primary/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <Flame className="h-8 w-8 text-sale animate-pulse" />
            <div>
              <h2 className="text-2xl font-bold">Flash Deals</h2>
              <p className="text-muted-foreground">Limited time offers - Don't miss out!</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-card rounded-lg p-3 shadow-sm">
              <Timer className="h-5 w-5 text-sale" />
              <span className="text-sm font-medium">Ends in:</span>
              <div className="flex gap-1">
                <span className="bg-sale text-sale-foreground px-2 py-1 rounded font-bold text-sm">
                  {String(timeLeft.hours).padStart(2, "0")}
                </span>
                <span className="text-sale font-bold">:</span>
                <span className="bg-sale text-sale-foreground px-2 py-1 rounded font-bold text-sm">
                  {String(timeLeft.minutes).padStart(2, "0")}
                </span>
                <span className="text-sale font-bold">:</span>
                <span className="bg-sale text-sale-foreground px-2 py-1 rounded font-bold text-sm">
                  {String(timeLeft.seconds).padStart(2, "0")}
                </span>
              </div>
            </div>
            
            <Link
              to="/deals"
              className="text-primary hover:underline text-sm font-medium flex items-center gap-1"
            >
              View All Deals
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {dealProducts.slice(0, 5).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DealsSection;

import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import ProductCard from "@/components/products/ProductCard";
import { Product } from "@/data/products";

interface ProductSectionProps {
  title: string;
  products: Product[];
  viewAllLink?: string;
  className?: string;
}

const ProductSection = ({ title, products, viewAllLink, className }: ProductSectionProps) => {
  return (
    <section className={`py-12 ${className || ""}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">{title}</h2>
          {viewAllLink && (
            <Link
              to={viewAllLink}
              className="text-primary hover:underline text-sm font-medium flex items-center gap-1"
            >
              View All
              <ChevronRight className="h-4 w-4" />
            </Link>
          )}
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {products.slice(0, 5).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;

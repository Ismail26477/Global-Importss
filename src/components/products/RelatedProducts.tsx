import type { Product } from "@/data/products"
import ProductCard from "./ProductCard"

interface RelatedProductsProps {
  currentProductId: string
  category: string
  limit?: number
}

const RelatedProducts = ({ currentProductId, category, limit = 4 }: RelatedProductsProps) => {
  // Import products data
  const { products } = require("@/data/products")

  const relatedProducts = products
    .filter((p: Product) => p.category === category && p.id !== currentProductId)
    .slice(0, limit)

  if (relatedProducts.length === 0) {
    return null
  }

  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold mb-6">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {relatedProducts.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default RelatedProducts

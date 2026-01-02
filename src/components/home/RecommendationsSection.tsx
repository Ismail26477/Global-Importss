"use client"

import { Link } from "react-router-dom"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import ProductCard from "@/components/products/ProductCard"
import type { Product } from "@/data/products"

interface RecommendationsSectionProps {
  title: string
  products: Product[]
  viewAllLink?: string
  className?: string
}

const RecommendationsSection = ({ title, products, viewAllLink, className = "" }: RecommendationsSectionProps) => {
  if (products.length === 0) return null

  return (
    <section className={`py-12 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">{title}</h2>
          {viewAllLink && (
            <Button variant="ghost" asChild>
              <Link to={viewAllLink}>
                View All
                <ChevronRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          )}
        </div>

        {/* Horizontal Scroll - Mobile */}
        <div className="md:hidden overflow-x-auto -mx-4 px-4 scrollbar-hide">
          <div className="flex gap-4 pb-4">
            {products.map((product) => (
              <div key={product.id} className="flex-shrink-0 w-48">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        {/* Grid - Desktop */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default RecommendationsSection

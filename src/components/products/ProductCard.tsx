"use client"

import type React from "react"
import { Link } from "react-router-dom"
import { Star, Heart, ShoppingCart, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import type { Product } from "@/data/products"
import { useCart } from "@/contexts/CartContext"
import { useWishlist } from "@/contexts/WishlistContext"
import { useComparison } from "@/contexts/ComparisonContext"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

interface ProductCardProps {
  product: Product
  className?: string
}

const ProductCard = ({ product, className }: ProductCardProps) => {
  const { addToCart, isInCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const { addToComparison, removeFromComparison, isInComparison } = useComparison()
  const { toast } = useToast()
  const inWishlist = isInWishlist(product.id)
  const inCart = isInCart(product.id)
  const inComparison = isInComparison(product.id)

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (inWishlist) {
      removeFromWishlist(product.id)
      toast({
        title: "Removed from wishlist",
        description: `${product.name} has been removed from your wishlist.`,
      })
    } else {
      addToWishlist(product)
      toast({
        title: "Added to wishlist",
        description: `${product.name} has been added to your wishlist.`,
      })
    }
  }

  const handleComparisonToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (inComparison) {
      removeFromComparison(product.id)
      toast({
        title: "Removed from comparison",
        description: `${product.name} has been removed from comparison.`,
      })
    } else {
      addToComparison(product)
      toast({
        title: "Added to comparison",
        description: `${product.name} has been added to comparison.`,
      })
    }
  }

  return (
    <Link to={`/product/${product.id}`}>
      <Card className={cn("group overflow-hidden hover:shadow-lg transition-all duration-300 h-full", className)}>
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={product.images[0] || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {discount > 0 && <Badge className="bg-sale text-sale-foreground animate-pulse-sale">-{discount}%</Badge>}
            {product.isBestseller && <Badge className="bg-primary text-primary-foreground">Bestseller</Badge>}
            {product.isNewArrival && <Badge variant="secondary">New</Badge>}
          </div>

          {/* Action buttons */}
          <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button variant="secondary" size="icon" onClick={handleWishlistToggle}>
              <Heart className={cn("h-4 w-4", inWishlist && "fill-current")} />
            </Button>
            <Button variant="secondary" size="icon" onClick={handleComparisonToggle} title="Add to comparison">
              <BarChart3 className={cn("h-4 w-4", inComparison && "fill-current")} />
            </Button>
          </div>

          {/* Quick add to cart */}
          <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
            <Button className="w-full" size="sm" onClick={handleAddToCart} disabled={!product.inStock}>
              <ShoppingCart className="h-4 w-4 mr-2" />
              {inCart ? "Add More" : "Add to Cart"}
            </Button>
          </div>
        </div>

        <CardContent className="p-4">
          <p className="text-xs text-muted-foreground mb-1">{product.brand}</p>
          <h3 className="font-medium text-sm line-clamp-2 mb-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-3 w-3",
                    i < Math.floor(product.rating) ? "text-rating fill-rating" : "text-muted-foreground",
                  )}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">({product.reviewCount.toLocaleString()})</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-foreground">₹{product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">₹{product.originalPrice.toFixed(2)}</span>
            )}
          </div>

          {/* Stock status */}
          {!product.inStock && <p className="text-sm text-sale mt-1">Out of Stock</p>}
          {product.inStock && product.stockCount < 10 && (
            <p className="text-sm text-warning mt-1">Only {product.stockCount} left!</p>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}

export default ProductCard

"use client"

import type React from "react"
import { Link, useNavigate } from "react-router-dom"
import { X, ShoppingCart, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useComparison } from "@/contexts/ComparisonContext"
import { useCart } from "@/contexts/CartContext"
import { useToast } from "@/hooks/use-toast"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

const Comparison: React.FC = () => {
  const navigate = useNavigate()
  const { items, removeFromComparison, clearComparison } = useComparison()
  const { addToCart } = useCart()
  const { toast } = useToast()

  const handleAddToCart = (productId: string) => {
    const product = items.find((p) => p.id === productId)
    if (product) {
      addToCart(product)
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
      })
    }
  }

  if (items.length === 0) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-background">
          <div className="container mx-auto px-4 py-20">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">Product Comparison</h1>
              <p className="text-muted-foreground mb-8">
                No products added yet. Start comparing by adding products from the catalog.
              </p>
              <Button asChild>
                <Link to="/">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb and Header */}
          <div className="mb-8">
            <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold mb-2">Compare Products</h1>
                <p className="text-muted-foreground">You are comparing {items.length} out of 3 products</p>
              </div>
              {items.length > 0 && (
                <Button variant="outline" onClick={clearComparison} size="sm">
                  Clear All
                </Button>
              )}
            </div>
          </div>

          {/* Comparison Table - Horizontal Layout */}
          <div className="overflow-x-auto">
            <div className="grid" style={{ gridTemplateColumns: `200px repeat(${items.length}, 1fr)` }}>
              {/* Product Names Row */}
              <div className="border-r border-b p-4 font-semibold bg-muted min-h-24 flex items-center">Product</div>
              {items.map((product) => (
                <div
                  key={product.id}
                  className="border-r border-b p-4 flex flex-col justify-between min-h-24 relative group"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100"
                    onClick={() => removeFromComparison(product.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <div>
                    <Link to={`/product/${product.id}`} className="hover:text-primary transition-colors">
                      <h3 className="font-semibold text-sm line-clamp-2">{product.name}</h3>
                    </Link>
                    <p className="text-xs text-muted-foreground">{product.brand}</p>
                  </div>
                </div>
              ))}

              {/* Image Row */}
              <div className="border-r border-b p-4 font-semibold bg-muted">Image</div>
              {items.map((product) => (
                <div key={`image-${product.id}`} className="border-r border-b p-4 flex items-center justify-center">
                  <img
                    src={product.images[0] || "/placeholder.svg"}
                    alt={product.name}
                    className="h-32 w-full object-cover rounded"
                  />
                </div>
              ))}

              {/* Price Row */}
              <div className="border-r border-b p-4 font-semibold bg-muted">Price</div>
              {items.map((product) => (
                <div key={`price-${product.id}`} className="border-r border-b p-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-lg font-bold text-primary">₹{product.price.toFixed(2)}</span>
                    {product.originalPrice && (
                      <span className="text-xs text-muted-foreground line-through">
                        ₹{product.originalPrice.toFixed(2)}
                      </span>
                    )}
                    {product.originalPrice && (
                      <Badge className="w-fit">
                        -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                      </Badge>
                    )}
                  </div>
                </div>
              ))}

              {/* Rating Row */}
              <div className="border-r border-b p-4 font-semibold bg-muted">Rating</div>
              {items.map((product) => (
                <div key={`rating-${product.id}`} className="border-r border-b p-4">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{product.rating}</span>
                    <span className="text-xs text-muted-foreground">({product.reviewCount.toLocaleString()})</span>
                  </div>
                </div>
              ))}

              {/* Stock Status Row */}
              <div className="border-r border-b p-4 font-semibold bg-muted">Stock</div>
              {items.map((product) => (
                <div key={`stock-${product.id}`} className="border-r border-b p-4">
                  {product.inStock ? (
                    <Badge className="bg-green-100 text-green-800">{product.stockCount} in stock</Badge>
                  ) : (
                    <Badge variant="secondary">Out of Stock</Badge>
                  )}
                </div>
              ))}

              {/* Category Row */}
              <div className="border-r border-b p-4 font-semibold bg-muted">Category</div>
              {items.map((product) => (
                <div key={`category-${product.id}`} className="border-r border-b p-4">
                  <span className="text-sm">{product.subcategory}</span>
                </div>
              ))}

              {/* Features Row */}
              <div className="border-r border-b p-4 font-semibold bg-muted">Key Features</div>
              {items.map((product) => (
                <div key={`features-${product.id}`} className="border-r border-b p-4">
                  <ul className="text-sm space-y-1">
                    {product.features.slice(0, 3).map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                    {product.features.length > 3 && (
                      <li className="text-xs text-muted-foreground">+{product.features.length - 3} more</li>
                    )}
                  </ul>
                </div>
              ))}

              {/* Specifications Row */}
              <div className="border-r border-b p-4 font-semibold bg-muted">Specifications</div>
              {items.map((product) => (
                <div key={`specs-${product.id}`} className="border-r border-b p-4">
                  <div className="text-sm space-y-2">
                    {Object.entries(product.specifications)
                      .slice(0, 3)
                      .map(([key, value]) => (
                        <div key={key}>
                          <span className="text-muted-foreground text-xs">{key}</span>
                          <p className="font-medium text-xs">{value}</p>
                        </div>
                      ))}
                  </div>
                </div>
              ))}

              {/* Add to Cart Row */}
              <div className="border-r p-4 font-semibold bg-muted"></div>
              {items.map((product) => (
                <div key={`cart-${product.id}`} className="border-r p-4">
                  <Button className="w-full" onClick={() => handleAddToCart(product.id)} disabled={!product.inStock}>
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Available Slots */}
          {items.length < 3 && (
            <div className="mt-12 p-8 bg-muted rounded-lg text-center">
              <p className="text-muted-foreground mb-4">
                You can compare up to 3 products. Add {3 - items.length} more products to compare.
              </p>
              <Button asChild>
                <Link to="/">Browse Products</Link>
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Comparison

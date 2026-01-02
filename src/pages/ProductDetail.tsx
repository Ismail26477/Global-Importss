"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { Star, ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { getProductById } from "@/data/products"
import { useCart } from "@/contexts/CartContext"
import { useWishlist } from "@/contexts/WishlistContext"
import { useRecentlyViewed } from "@/contexts/RecentlyViewedContext"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import ImageGallery from "@/components/products/ImageGallery"
import VariantSelector from "@/components/products/VariantSelector"
import ReviewsSection from "@/components/products/ReviewsSection"
import RelatedProducts from "@/components/products/RelatedProducts"
import AddReviewForm from "@/components/products/AddReviewForm"

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>()
  const product = getProductById(id || "")
  const { addToCart } = useCart()
  const { addToWishlist, isInWishlist } = useWishlist()
  const { addToRecentlyViewed } = useRecentlyViewed()
  const { toast } = useToast()
  const [quantity, setQuantity] = useState(1)
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({})

  useEffect(() => {
    if (product) {
      addToRecentlyViewed(product)
    }
  }, [product, addToRecentlyViewed])

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist.</p>
            <Link to="/">
              <Button>Back to Home</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const handleAddToCart = () => {
    addToCart(product)
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const handleWishlist = () => {
    addToWishlist(product)
    toast({
      title: "Added to wishlist",
      description: `${product.name} has been added to your wishlist.`,
    })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-background">
        {/* Breadcrumb */}
        <div className="border-b sticky top-16 bg-background z-30">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center gap-2 text-sm">
              <Link to="/" className="text-primary hover:underline">
                Home
              </Link>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <Link to={`/category/${product.category}`} className="text-primary hover:underline capitalize">
                {product.category}
              </Link>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground line-clamp-1">{product.name}</span>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Main product section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 mb-8 sm:mb-12">
            {/* Image Gallery */}
            <div>
              <ImageGallery images={product.images} productName={product.name} />
            </div>

            {/* Product Details */}
            <div className="flex flex-col">
              {/* Brand and title */}
              <div className="mb-4">
                <p className="text-xs sm:text-sm text-muted-foreground mb-2">{product.brand}</p>
                <h1 className="text-2xl sm:text-3xl font-bold mb-4">{product.name}</h1>

                {/* Rating */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-4 w-4 sm:h-5 sm:w-5",
                          i < Math.floor(product.rating) ? "text-rating fill-rating" : "text-muted-foreground",
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-xs sm:text-sm">{product.rating} out of 5</span>
                  <span className="text-xs sm:text-sm text-muted-foreground">
                    ({product.reviewCount.toLocaleString()} reviews)
                  </span>
                </div>
              </div>

              <Separator className="my-3 sm:my-4" />

              {/* Price section */}
              <div className="mb-4">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                  <span className="text-3xl sm:text-4xl font-bold text-foreground">₹{product.price.toFixed(2)}</span>
                  {product.originalPrice && (
                    <>
                      <span className="text-lg sm:text-xl text-muted-foreground line-through">
                        ₹{product.originalPrice.toFixed(2)}
                      </span>
                      <Badge className="bg-sale text-sale-foreground text-xs sm:text-sm">Save {discount}%</Badge>
                    </>
                  )}
                </div>
              </div>

              <Separator className="my-3 sm:my-4" />

              {/* Stock status */}
              <div className="mb-4">
                {product.inStock ? (
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-green-500" />
                    <span className="text-xs sm:text-sm text-green-600 font-medium">
                      In Stock ({product.stockCount} available)
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-red-500" />
                    <span className="text-xs sm:text-sm text-red-600 font-medium">Out of Stock</span>
                  </div>
                )}
              </div>

              {/* Product description */}
              <p className="text-xs sm:text-base text-muted-foreground mb-6">{product.description}</p>

              {/* Variant selector */}
              {product.variants && product.variants.length > 0 && (
                <>
                  <VariantSelector product={product} onVariantChange={setSelectedVariants} />
                  <Separator className="my-4 sm:my-6" />
                </>
              )}

              {/* Quantity selector */}
              <div className="mb-6">
                <label className="text-xs sm:text-sm font-semibold mb-2 block">Quantity</label>
                <div className="flex items-center gap-2 sm:gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-8 w-8 sm:h-10 sm:w-10"
                  >
                    -
                  </Button>
                  <input
                    type="number"
                    min="1"
                    max={product.stockCount}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.min(product.stockCount, Number.parseInt(e.target.value) || 1))}
                    className="w-12 sm:w-16 text-center border rounded-lg py-2 text-sm"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                    className="h-8 w-8 sm:h-10 sm:w-10"
                  >
                    +
                  </Button>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-6">
                <Button
                  className="flex-1 h-10 sm:h-12 text-sm sm:text-base"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 sm:h-12 sm:w-12 bg-transparent"
                  onClick={handleWishlist}
                >
                  <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
                <Button variant="outline" size="icon" className="h-10 w-10 sm:h-12 sm:w-12 bg-transparent">
                  <Share2 className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </div>

              {/* Delivery & returns info */}
              <div className="space-y-2 sm:space-y-3 pt-4 sm:pt-6 border-t">
                <div className="flex items-start gap-2 sm:gap-3">
                  <Truck className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-xs sm:text-sm">Free Delivery</p>
                    <p className="text-xs text-muted-foreground">On orders over ₹2,500</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 sm:gap-3">
                  <RotateCcw className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-xs sm:text-sm">30-Day Returns</p>
                    <p className="text-xs text-muted-foreground">Hassle-free returns policy</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 sm:gap-3">
                  <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-xs sm:text-sm">Secure Checkout</p>
                    <p className="text-xs text-muted-foreground">Your payment is protected</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-12" />

          {/* Features & Specifications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Features */}
            {product.features.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Key Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 text-xs font-bold text-primary mt-0.5">
                          ✓
                        </span>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Specifications */}
            {Object.keys(product.specifications).length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Specifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div
                        key={key}
                        className="flex items-center justify-between pb-3 border-b last:border-0 last:pb-0"
                      >
                        <span className="text-sm font-semibold text-muted-foreground">{key}</span>
                        <span className="text-sm font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Add Review Form */}
          <AddReviewForm productId={product.id} />

          {/* Reviews section */}
          {product.reviews && product.reviews.length > 0 ? (
            <ReviewsSection
              productId={product.id}
              reviews={product.reviews}
              averageRating={product.rating}
              totalReviews={product.reviewCount}
            />
          ) : (
            <div className="my-12 p-8 bg-muted rounded-lg text-center">
              <p className="text-muted-foreground">No reviews yet for this product. Be the first to review!</p>
            </div>
          )}

          {/* Related products */}
          <Separator className="my-12" />
          <RelatedProducts currentProductId={product.id} category={product.category} />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default ProductDetail

"use client"

import type React from "react"
import { Link } from "react-router-dom"
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/contexts/CartContext"
import { useWishlist } from "@/contexts/WishlistContext"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

const Cart: React.FC = () => {
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart()
  const { addToWishlist } = useWishlist()

  const handleMoveToWishlist = (productId: string) => {
    const item = items.find((i) => i.product.id === productId)
    if (item) {
      addToWishlist(item.product)
      removeFromCart(productId)
    }
  }

  const handleQuantityChange = (productId: string, quantity: number) => {
    if (quantity > 0) {
      updateQuantity(productId, quantity)
    }
  }

  // Calculate shipping, tax, and other costs
  const shippingCost = totalPrice > 2500 ? 0 : 500
  const estimatedTax = totalPrice * 0.08
  const finalTotal = totalPrice + shippingCost + estimatedTax

  if (items.length === 0) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-background">
          <div className="container mx-auto px-4 py-16">
            <div className="flex flex-col items-center justify-center gap-6 text-center">
              <ShoppingBag className="h-16 w-16 text-muted-foreground" />
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Your Cart is Empty</h1>
                <p className="text-muted-foreground mb-6">Add items to your cart to get started with your shopping.</p>
                <Link to="/">
                  <Button size="lg">
                    Continue Shopping
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
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
          {/* Breadcrumb */}
          <div className="mb-8 flex items-center gap-2 text-sm">
            <Link to="/" className="text-primary hover:underline">
              Home
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-muted-foreground">Shopping Cart</span>
          </div>

          <h1 className="mb-8 text-3xl font-bold text-foreground">Shopping Cart</h1>

          <div className="grid gap-4 sm:gap-8 lg:grid-cols-3">
            {/* Cart Items Section */}
            <div className="lg:col-span-2">
              <Card className="border-0 bg-card shadow-sm">
                <div className="divide-y">
                  {items.map((item, index) => (
                    <div key={item.product.id} className={`p-3 sm:p-6 ${index !== items.length - 1 ? "border-b" : ""}`}>
                      <div className="flex gap-3 sm:gap-6">
                        {/* Product Image */}
                        <div className="flex-shrink-0">
                          <Link to={`/product/${item.product.id}`}>
                            <img
                              src={item.product.images[0] || "/placeholder.svg"}
                              alt={item.product.name}
                              className="h-20 w-20 sm:h-32 sm:w-32 rounded-lg object-cover hover:opacity-80 transition-opacity"
                            />
                          </Link>
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <Link to={`/product/${item.product.id}`} className="group inline-block">
                            <h3 className="text-sm sm:text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                              {item.product.name}
                            </h3>
                          </Link>

                          {/* Brand and Category */}
                          <div className="mt-1 flex items-center gap-2 flex-wrap">
                            <span className="text-xs sm:text-sm text-muted-foreground">{item.product.brand}</span>
                            <span className="text-xs bg-secondary text-secondary-foreground px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
                              {item.product.category}
                            </span>
                          </div>

                          {/* Price */}
                          <div className="mt-2 flex items-baseline gap-2">
                            <span className="text-lg sm:text-2xl font-bold text-primary">
                              ₹{item.product.price.toFixed(2)}
                            </span>
                            {item.product.originalPrice && (
                              <span className="text-xs sm:text-sm text-muted-foreground line-through">
                                ₹{item.product.originalPrice.toFixed(2)}
                              </span>
                            )}
                          </div>

                          {/* Stock Status */}
                          <div className="mt-2">
                            {item.product.inStock ? (
                              <span className="text-xs sm:text-sm text-green-600 font-medium">In Stock</span>
                            ) : (
                              <span className="text-xs sm:text-sm text-red-600 font-medium">Out of Stock</span>
                            )}
                          </div>
                        </div>

                        {/* Quantity and Actions - Stacked on mobile */}
                        <div className="flex flex-col items-end gap-2 sm:gap-4">
                          {/* Quantity Selector - Larger touch targets */}
                          <div className="flex items-center gap-1 border rounded-lg bg-background p-1 sm:p-1.5">
                            <button
                              onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                              className="p-1 hover:bg-muted rounded transition-colors h-7 w-7 sm:h-8 sm:w-8 flex items-center justify-center"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="w-6 sm:w-8 text-center font-semibold text-foreground text-sm">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                              className="p-1 hover:bg-muted rounded transition-colors h-7 w-7 sm:h-8 sm:w-8 flex items-center justify-center"
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>

                          {/* Item Total Price */}
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground">Subtotal</p>
                            <p className="text-lg sm:text-2xl font-bold text-primary">
                              ₹{(item.product.price * item.quantity).toFixed(2)}
                            </p>
                          </div>

                          {/* Remove and Wishlist Buttons */}
                          <div className="flex gap-1 sm:gap-2 text-xs sm:text-sm">
                            <button
                              onClick={() => handleMoveToWishlist(item.product.id)}
                              className="text-primary hover:text-primary/80 transition-colors font-medium px-2 py-1"
                            >
                              Wishlist
                            </button>
                            <button
                              onClick={() => removeFromCart(item.product.id)}
                              className="p-1 hover:bg-red-50 dark:hover:bg-red-950 rounded transition-colors h-7 w-7 sm:h-8 sm:w-8 flex items-center justify-center"
                              aria-label="Remove from cart"
                            >
                              <Trash2 className="h-4 w-4 text-red-600" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Continue Shopping Button */}
              <div className="mt-4 sm:mt-6">
                <Link to="/">
                  <Button variant="outline" className="w-full bg-transparent">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>

            {/* Price Summary Sidebar */}
            <div>
              <Card className="border-0 bg-card shadow-sm sticky top-16 sm:top-20">
                <div className="p-4 sm:p-6">
                  <h2 className="text-base sm:text-lg font-bold text-foreground mb-4 sm:mb-6">Order Summary</h2>

                  <div className="space-y-4 mb-6">
                    {/* Subtotal */}
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium text-foreground">₹{totalPrice.toFixed(2)}</span>
                    </div>

                    {/* Shipping */}
                    <div className="flex justify-between items-center text-sm">
                      <div>
                        <span className="text-muted-foreground">Shipping</span>
                        {shippingCost === 0 && <p className="text-xs text-green-600 font-medium">Free shipping</p>}
                      </div>
                      <span className="font-medium text-foreground">₹{shippingCost.toFixed(2)}</span>
                    </div>

                    {/* Estimated Tax */}
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Estimated Tax</span>
                      <span className="font-medium text-foreground">₹{estimatedTax.toFixed(2)}</span>
                    </div>

                    {/* Discount (if any) */}
                    {totalPrice > 150 && (
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-green-600 font-medium">Loyalty Discount (5%)</span>
                        <span className="font-medium text-green-600">-₹{(totalPrice * 0.05).toFixed(2)}</span>
                      </div>
                    )}
                  </div>

                  <Separator className="my-6" />

                  {/* Final Total */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-lg sm:text-xl font-bold text-foreground">Total</span>
                      <span className="text-2xl sm:text-3xl font-bold text-primary">
                        ₹
                        {(
                          totalPrice +
                          shippingCost +
                          estimatedTax -
                          (totalPrice > 150 ? totalPrice * 0.05 : 0)
                        ).toFixed(2)}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Including {items.length} item{items.length !== 1 ? "s" : ""}
                    </p>
                  </div>

                  {/* Checkout Button */}
                  <Link to="/checkout">
                    <Button className="w-full mb-3" size="lg">
                      Proceed to Checkout
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>

                  {/* Clear Cart Option */}
                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    onClick={() => {
                      if (confirm("Are you sure you want to clear your entire cart?")) {
                        clearCart()
                      }
                    }}
                  >
                    Clear Cart
                  </Button>

                  {/* Trust Badges */}
                  <div className="mt-6 pt-6 border-t space-y-3">
                    <div className="flex gap-2 text-xs sm:text-sm text-muted-foreground">
                      <span>✓</span>
                      <span>Secure Checkout</span>
                    </div>
                    <div className="flex gap-2 text-xs sm:text-sm text-muted-foreground">
                      <span>✓</span>
                      <span>Free Returns</span>
                    </div>
                    <div className="flex gap-2 text-xs sm:text-sm text-muted-foreground">
                      <span>✓</span>
                      <span>Fast Delivery</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Cart

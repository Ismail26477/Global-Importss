"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { ArrowRight, Check, Package, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

interface Order {
  id: string
  items: any[]
  shippingAddress: any
  paymentMethod: string
  orderSummary: any
  createdAt: string
  status: string
}

const OrderConfirmation: React.FC = () => {
  const { orderId } = useParams()
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem("orders") || "[]")
    const foundOrder = orders.find((o: Order) => o.id === orderId)
    setOrder(foundOrder || null)
    setLoading(false)
  }, [orderId])

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-background flex items-center justify-center">
          <p className="text-muted-foreground">Loading order details...</p>
        </main>
        <Footer />
      </>
    )
  }

  if (!order) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-background">
          <div className="container mx-auto px-4 py-16">
            <div className="flex flex-col items-center justify-center gap-6 text-center">
              <h1 className="text-3xl font-bold text-foreground">Order Not Found</h1>
              <p className="text-muted-foreground">We couldn't find your order.</p>
              <Link to="/">
                <Button size="lg">Continue Shopping</Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const estimatedDelivery = new Date(order.createdAt)
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 5)

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4">
          {/* Success Message */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Order Confirmed!</h1>
            <p className="text-muted-foreground mb-2">Thank you for your purchase</p>
            <p className="text-sm text-muted-foreground">
              Order ID: <span className="font-mono font-semibold text-foreground">{order.id}</span>
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3 mb-8">
            {/* Order Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Delivery Info */}
              <Card className="p-6 border-0 bg-card shadow-sm">
                <h2 className="text-lg font-bold text-foreground mb-4">Estimated Delivery</h2>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Package className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Delivery by</p>
                    <p className="font-semibold text-foreground">
                      {estimatedDelivery.toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </Card>

              {/* Shipping Address */}
              <Card className="p-6 border-0 bg-card shadow-sm">
                <h2 className="text-lg font-bold text-foreground mb-4">Shipping Address</h2>
                <div className="flex items-start gap-4">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-1 flex-shrink-0" />
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p className="font-semibold text-foreground">
                      {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                    </p>
                    <p>{order.shippingAddress.address}</p>
                    <p>
                      {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.pincode}
                    </p>
                    <p>{order.shippingAddress.country}</p>
                  </div>
                </div>
              </Card>

              {/* Order Items */}
              <Card className="p-6 border-0 bg-card shadow-sm">
                <h2 className="text-lg font-bold text-foreground mb-4">Order Items</h2>
                <div className="space-y-4">
                  {order.items.map((item: any) => (
                    <div key={item.product.id} className="flex gap-4 pb-4 border-b last:pb-0 last:border-0">
                      <img
                        src={item.product.images[0] || "/placeholder.svg"}
                        alt={item.product.name}
                        className="h-20 w-20 rounded object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-foreground">{item.product.name}</p>
                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-foreground">
                        ₹{(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Summary Sidebar */}
            <div>
              <Card className="p-6 border-0 bg-card shadow-sm sticky top-20">
                <h3 className="text-lg font-bold text-foreground mb-6">Order Summary</h3>

                <div className="space-y-3 mb-6 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium text-foreground">₹{order.orderSummary.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium text-foreground">₹{order.orderSummary.shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="font-medium text-foreground">₹{order.orderSummary.tax.toFixed(2)}</span>
                  </div>
                  {order.orderSummary.discount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-green-600">Discount</span>
                      <span className="font-medium text-green-600">-₹{order.orderSummary.discount.toFixed(2)}</span>
                    </div>
                  )}
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between items-center mb-6">
                  <span className="font-bold text-foreground">Total</span>
                  <span className="text-2xl font-bold text-primary">₹{order.orderSummary.total.toFixed(2)}</span>
                </div>

                <div className="bg-primary/10 p-4 rounded-lg mb-4">
                  <p className="text-sm text-primary font-medium">
                    Payment: {order.paymentMethod === "cod" ? "Cash on Delivery" : "Completed"}
                  </p>
                </div>

                <Link to="/">
                  <Button className="w-full" size="lg">
                    Continue Shopping
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default OrderConfirmation

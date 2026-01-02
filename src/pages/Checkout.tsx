"use client"

import type React from "react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ArrowLeft, Check, Truck, Lock, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/contexts/CartContext"
import { useAuth } from "@/contexts/AuthContext"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

interface ShippingAddress {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  pincode: string
  country: string
}

interface OrderSummary {
  subtotal: number
  shipping: number
  tax: number
  discount: number
  total: number
}

const Checkout: React.FC = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { items, totalPrice, clearCart } = useCart()

  const [currentStep, setCurrentStep] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [isProcessing, setIsProcessing] = useState(false)

  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    firstName: "",
    lastName: "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  })

  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
  })

  // Calculate order summary
  const shipping = totalPrice > 2500 ? 0 : 500
  const tax = totalPrice * 0.08
  const discount = totalPrice > 150 ? totalPrice * 0.05 : 0
  const orderTotal = totalPrice + shipping + tax - discount

  const orderSummary: OrderSummary = {
    subtotal: totalPrice,
    shipping,
    tax,
    discount,
    total: orderTotal,
  }

  const handleAddressChange = (field: keyof ShippingAddress, value: string) => {
    setShippingAddress((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleCardChange = (field: keyof typeof cardDetails, value: string) => {
    let formattedValue = value
    if (field === "cardNumber") {
      formattedValue = value
        .replace(/\s/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim()
    }
    if (field === "expiryMonth") {
      formattedValue = Math.min(Number.parseInt(value) || 0, 12).toString()
    }
    if (field === "expiryYear") {
      formattedValue = value.slice(0, 2)
    }
    if (field === "cvv") {
      formattedValue = value.slice(0, 3)
    }
    setCardDetails((prev) => ({
      ...prev,
      [field]: formattedValue,
    }))
  }

  const isAddressValid = () => {
    return (
      shippingAddress.firstName &&
      shippingAddress.lastName &&
      shippingAddress.email &&
      shippingAddress.phone &&
      shippingAddress.address &&
      shippingAddress.city &&
      shippingAddress.state &&
      shippingAddress.pincode
    )
  }

  const isCardValid = () => {
    return (
      cardDetails.cardNumber.replace(/\s/g, "").length === 16 &&
      cardDetails.cardHolder &&
      cardDetails.expiryMonth &&
      cardDetails.expiryYear &&
      cardDetails.cvv.length === 3
    )
  }

  const handlePlaceOrder = async () => {
    if (!isAddressValid()) {
      alert("Please fill all address fields")
      return
    }

    if (paymentMethod === "card" && !isCardValid()) {
      alert("Please fill all card details correctly")
      return
    }

    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      const order = {
        id: `ORD-${Date.now()}`,
        items,
        shippingAddress,
        paymentMethod,
        orderSummary,
        createdAt: new Date().toISOString(),
        status: "confirmed",
      }

      // Save order to localStorage
      const orders = JSON.parse(localStorage.getItem("orders") || "[]")
      orders.push(order)
      localStorage.setItem("orders", JSON.stringify(orders))

      clearCart()
      setIsProcessing(false)
      navigate(`/order-confirmation/${order.id}`)
    }, 2000)
  }

  if (items.length === 0 && !isProcessing) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-background">
          <div className="container mx-auto px-4 py-16">
            <div className="flex flex-col items-center justify-center gap-6 text-center">
              <AlertCircle className="h-16 w-16 text-muted-foreground" />
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Your Cart is Empty</h1>
                <p className="text-muted-foreground mb-6">Add items before proceeding to checkout.</p>
                <Link to="/">
                  <Button size="lg">Continue Shopping</Button>
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
      <main className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Link to="/cart" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8">
            <ArrowLeft className="h-4 w-4" />
            Back to Cart
          </Link>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Step Indicator */}
              <div className="flex items-center gap-8 mb-8">
                <div
                  className={`flex items-center gap-3 ${currentStep >= 1 ? "text-primary" : "text-muted-foreground"}`}
                >
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center font-bold ${
                      currentStep >= 1 ? "bg-primary text-primary-foreground" : "bg-secondary"
                    }`}
                  >
                    {currentStep > 1 ? <Check className="h-5 w-5" /> : "1"}
                  </div>
                  <div>
                    <p className="text-sm font-medium">Shipping Address</p>
                  </div>
                </div>

                <div className={`flex-1 h-1 ${currentStep > 1 ? "bg-primary" : "bg-secondary"}`} />

                <div
                  className={`flex items-center gap-3 ${currentStep >= 2 ? "text-primary" : "text-muted-foreground"}`}
                >
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center font-bold ${
                      currentStep >= 2 ? "bg-primary text-primary-foreground" : "bg-secondary"
                    }`}
                  >
                    {currentStep > 2 ? <Check className="h-5 w-5" /> : "2"}
                  </div>
                  <div>
                    <p className="text-sm font-medium">Payment</p>
                  </div>
                </div>

                <div className={`flex-1 h-1 ${currentStep > 2 ? "bg-primary" : "bg-secondary"}`} />

                <div
                  className={`flex items-center gap-3 ${currentStep >= 3 ? "text-primary" : "text-muted-foreground"}`}
                >
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center font-bold ${
                      currentStep >= 3 ? "bg-primary text-primary-foreground" : "bg-secondary"
                    }`}
                  >
                    3
                  </div>
                  <div>
                    <p className="text-sm font-medium">Review</p>
                  </div>
                </div>
              </div>

              {/* Step 1: Shipping Address */}
              {currentStep === 1 && (
                <Card className="p-6 border-0 bg-card shadow-sm">
                  <h2 className="text-xl font-bold text-foreground mb-6">Shipping Address</h2>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">First Name</label>
                        <Input
                          placeholder="John"
                          value={shippingAddress.firstName}
                          onChange={(e) => handleAddressChange("firstName", e.target.value)}
                          className="bg-background"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Last Name</label>
                        <Input
                          placeholder="Doe"
                          value={shippingAddress.lastName}
                          onChange={(e) => handleAddressChange("lastName", e.target.value)}
                          className="bg-background"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                        <Input
                          type="email"
                          placeholder="john@example.com"
                          value={shippingAddress.email}
                          onChange={(e) => handleAddressChange("email", e.target.value)}
                          className="bg-background"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
                        <Input
                          placeholder="+91 9876543210"
                          value={shippingAddress.phone}
                          onChange={(e) => handleAddressChange("phone", e.target.value)}
                          className="bg-background"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Address</label>
                      <Input
                        placeholder="123 Main Street"
                        value={shippingAddress.address}
                        onChange={(e) => handleAddressChange("address", e.target.value)}
                        className="bg-background"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">City</label>
                        <Input
                          placeholder="Mumbai"
                          value={shippingAddress.city}
                          onChange={(e) => handleAddressChange("city", e.target.value)}
                          className="bg-background"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">State</label>
                        <Input
                          placeholder="Maharashtra"
                          value={shippingAddress.state}
                          onChange={(e) => handleAddressChange("state", e.target.value)}
                          className="bg-background"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">PIN Code</label>
                        <Input
                          placeholder="400001"
                          value={shippingAddress.pincode}
                          onChange={(e) => handleAddressChange("pincode", e.target.value)}
                          className="bg-background"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Country</label>
                        <Input disabled value={shippingAddress.country} className="bg-secondary" />
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={() => setCurrentStep(2)}
                    disabled={!isAddressValid()}
                    className="w-full mt-6"
                    size="lg"
                  >
                    Continue to Payment
                  </Button>
                </Card>
              )}

              {/* Step 2: Payment Method */}
              {currentStep === 2 && (
                <Card className="p-6 border-0 bg-card shadow-sm">
                  <h2 className="text-xl font-bold text-foreground mb-6">Payment Method</h2>

                  <div className="space-y-4 mb-6">
                    {/* Credit/Debit Card */}
                    <label
                      className={`p-4 border-2 rounded-lg cursor-pointer transition ${
                        paymentMethod === "card" ? "border-primary bg-primary/5" : "border-border bg-background"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="payment"
                          value="card"
                          checked={paymentMethod === "card"}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="w-4 h-4"
                        />
                        <div>
                          <p className="font-medium text-foreground">Credit/Debit Card</p>
                          <p className="text-sm text-muted-foreground">Visa, Mastercard, American Express</p>
                        </div>
                      </div>
                    </label>

                    {/* Net Banking */}
                    <label
                      className={`p-4 border-2 rounded-lg cursor-pointer transition ${
                        paymentMethod === "netbanking" ? "border-primary bg-primary/5" : "border-border bg-background"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="payment"
                          value="netbanking"
                          checked={paymentMethod === "netbanking"}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="w-4 h-4"
                        />
                        <div>
                          <p className="font-medium text-foreground">Net Banking</p>
                          <p className="text-sm text-muted-foreground">All major Indian banks supported</p>
                        </div>
                      </div>
                    </label>

                    {/* UPI */}
                    <label
                      className={`p-4 border-2 rounded-lg cursor-pointer transition ${
                        paymentMethod === "upi" ? "border-primary bg-primary/5" : "border-border bg-background"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="payment"
                          value="upi"
                          checked={paymentMethod === "upi"}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="w-4 h-4"
                        />
                        <div>
                          <p className="font-medium text-foreground">UPI</p>
                          <p className="text-sm text-muted-foreground">Google Pay, PhonePe, Paytm</p>
                        </div>
                      </div>
                    </label>

                    {/* Wallet */}
                    <label
                      className={`p-4 border-2 rounded-lg cursor-pointer transition ${
                        paymentMethod === "wallet" ? "border-primary bg-primary/5" : "border-border bg-background"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="payment"
                          value="wallet"
                          checked={paymentMethod === "wallet"}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="w-4 h-4"
                        />
                        <div>
                          <p className="font-medium text-foreground">Digital Wallet</p>
                          <p className="text-sm text-muted-foreground">Paytm, Amazon Pay, Mobikwik</p>
                        </div>
                      </div>
                    </label>

                    {/* Cash on Delivery */}
                    <label
                      className={`p-4 border-2 rounded-lg cursor-pointer transition ${
                        paymentMethod === "cod" ? "border-primary bg-primary/5" : "border-border bg-background"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="payment"
                          value="cod"
                          checked={paymentMethod === "cod"}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="w-4 h-4"
                        />
                        <div>
                          <p className="font-medium text-foreground">Cash on Delivery</p>
                          <p className="text-sm text-muted-foreground">Pay when you receive your order</p>
                        </div>
                      </div>
                    </label>
                  </div>

                  {/* Card Details Form */}
                  {paymentMethod === "card" && (
                    <Card className="p-4 bg-background border-border mb-6">
                      <h3 className="font-semibold text-foreground mb-4">Card Details</h3>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Card Number</label>
                          <Input
                            placeholder="1234 5678 9012 3456"
                            value={cardDetails.cardNumber}
                            onChange={(e) => handleCardChange("cardNumber", e.target.value)}
                            maxLength={19}
                            className="bg-background font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Card Holder Name</label>
                          <Input
                            placeholder="John Doe"
                            value={cardDetails.cardHolder}
                            onChange={(e) => handleCardChange("cardHolder", e.target.value)}
                            className="bg-background"
                          />
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">Month</label>
                            <Input
                              placeholder="MM"
                              value={cardDetails.expiryMonth}
                              onChange={(e) => handleCardChange("expiryMonth", e.target.value)}
                              maxLength={2}
                              className="bg-background"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">Year</label>
                            <Input
                              placeholder="YY"
                              value={cardDetails.expiryYear}
                              onChange={(e) => handleCardChange("expiryYear", e.target.value)}
                              maxLength={2}
                              className="bg-background"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">CVV</label>
                            <Input
                              placeholder="123"
                              type="password"
                              value={cardDetails.cvv}
                              onChange={(e) => handleCardChange("cvv", e.target.value)}
                              maxLength={3}
                              className="bg-background"
                            />
                          </div>
                        </div>
                      </div>
                    </Card>
                  )}

                  <div className="flex gap-4">
                    <Button variant="outline" onClick={() => setCurrentStep(1)} className="flex-1 bg-transparent">
                      Back
                    </Button>
                    <Button onClick={() => setCurrentStep(3)} className="flex-1" size="lg">
                      Review Order
                    </Button>
                  </div>
                </Card>
              )}

              {/* Step 3: Order Review */}
              {currentStep === 3 && (
                <Card className="p-6 border-0 bg-card shadow-sm">
                  <h2 className="text-xl font-bold text-foreground mb-6">Review Your Order</h2>

                  {/* Shipping Address Review */}
                  <div className="mb-6 pb-6 border-b">
                    <h3 className="font-semibold text-foreground mb-3">Shipping Address</h3>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>
                        {shippingAddress.firstName} {shippingAddress.lastName}
                      </p>
                      <p>{shippingAddress.address}</p>
                      <p>
                        {shippingAddress.city}, {shippingAddress.state} {shippingAddress.pincode}
                      </p>
                      <p>{shippingAddress.country}</p>
                      <p>Email: {shippingAddress.email}</p>
                      <p>Phone: {shippingAddress.phone}</p>
                    </div>
                  </div>

                  {/* Payment Method Review */}
                  <div className="mb-6 pb-6 border-b">
                    <h3 className="font-semibold text-foreground mb-3">Payment Method</h3>
                    <div className="text-sm text-muted-foreground">
                      {paymentMethod === "card" && "Credit/Debit Card"}
                      {paymentMethod === "netbanking" && "Net Banking"}
                      {paymentMethod === "upi" && "UPI"}
                      {paymentMethod === "wallet" && "Digital Wallet"}
                      {paymentMethod === "cod" && "Cash on Delivery"}
                    </div>
                  </div>

                  {/* Order Items Review */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-foreground mb-4">Order Items</h3>
                    <div className="space-y-4">
                      {items.map((item) => (
                        <div key={item.product.id} className="flex justify-between items-center text-sm">
                          <div>
                            <p className="font-medium text-foreground">{item.product.name}</p>
                            <p className="text-muted-foreground">Qty: {item.quantity}</p>
                          </div>
                          <p className="font-medium text-foreground">
                            ₹{(item.product.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button variant="outline" onClick={() => setCurrentStep(2)} className="flex-1 bg-transparent">
                      Back
                    </Button>
                    <Button onClick={handlePlaceOrder} disabled={isProcessing} className="flex-1" size="lg">
                      {isProcessing ? "Processing..." : "Place Order"}
                    </Button>
                  </div>
                </Card>
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div>
              <Card className="p-6 border-0 bg-card shadow-sm sticky top-20">
                <h3 className="text-lg font-bold text-foreground mb-6">Order Summary</h3>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium text-foreground">₹{orderSummary.subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <div>
                      <span className="text-muted-foreground">Shipping</span>
                      {orderSummary.shipping === 0 && <p className="text-xs text-green-600 font-medium">Free</p>}
                    </div>
                    <span className="font-medium text-foreground">₹{orderSummary.shipping.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Estimated Tax</span>
                    <span className="font-medium text-foreground">₹{orderSummary.tax.toFixed(2)}</span>
                  </div>

                  {orderSummary.discount > 0 && (
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-green-600 font-medium">Loyalty Discount</span>
                      <span className="font-medium text-green-600">-₹{orderSummary.discount.toFixed(2)}</span>
                    </div>
                  )}
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-bold text-foreground">Total</span>
                  <span className="text-2xl font-bold text-primary">₹{orderSummary.total.toFixed(2)}</span>
                </div>

                {/* Trust Badges */}
                <div className="space-y-3 pt-6 border-t">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Lock className="h-4 w-4 text-primary" />
                    <span>Secure Checkout</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Truck className="h-4 w-4 text-primary" />
                    <span>Free Returns</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Check className="h-4 w-4 text-primary" />
                    <span>Fast Delivery</span>
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

export default Checkout

import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Truck, Clock, MapPin, AlertCircle } from "lucide-react"

const Shipping = () => {
  const shippingOptions = [
    {
      icon: Clock,
      name: "Standard Delivery",
      time: "5-7 Business Days",
      cost: "₹500",
      minOrder: "₹1000+",
      description: "Standard shipping available pan-India",
    },
    {
      icon: Truck,
      name: "Express Delivery",
      time: "2-3 Business Days",
      cost: "₹999",
      minOrder: "₹2000+",
      description: "Fast delivery for metro cities",
    },
    {
      icon: Truck,
      name: "Overnight Delivery",
      time: "Next Day",
      cost: "₹1499",
      minOrder: "₹5000+",
      description: "Available in select cities",
    },
    {
      icon: Truck,
      name: "Free Shipping",
      time: "5-7 Business Days",
      cost: "FREE",
      minOrder: "₹2500+",
      description: "Free shipping on orders above ₹2500",
    },
  ]

  const servicedAreas = [
    "Delhi NCR",
    "Mumbai",
    "Bangalore",
    "Chennai",
    "Hyderabad",
    "Pune",
    "Ahmedabad",
    "Kolkata",
    "Jaipur",
    "Lucknow",
    "Chandigarh",
    "And 500+ cities across India",
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Header */}
        <section className="bg-gradient-to-r from-primary/10 to-primary/5 border-b">
          <div className="container mx-auto px-4 py-12 md:py-16">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Shipping Information</h1>
            <p className="text-lg text-foreground/70 max-w-2xl">
              Fast, reliable shipping across India. Choose from multiple delivery options to suit your needs.
            </p>
          </div>
        </section>

        {/* Shipping Options */}
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold mb-8">Shipping Options</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {shippingOptions.map((option, index) => {
              const Icon = option.icon
              return (
                <Card key={index}>
                  <CardHeader>
                    <Icon className="h-8 w-8 text-primary mb-2" />
                    <CardTitle className="text-lg">{option.name}</CardTitle>
                    <CardDescription>{option.time}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Cost:</p>
                      <p className="text-xl font-bold text-primary">{option.cost}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Minimum Order:</p>
                      <p className="text-sm">{option.minOrder}</p>
                    </div>
                    <p className="text-xs text-foreground/60 pt-3 border-t">{option.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Serviced Areas */}
        <section className="bg-muted/50 py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">We Deliver To</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {servicedAreas.map((area, index) => (
                <div key={index} className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                  <span>{area}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tracking & Support */}
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold mb-8">Order Tracking & Support</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Track Your Order</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/70 mb-4">
                  You'll receive a tracking number via email as soon as your order ships. Use it to track your shipment
                  in real-time.
                </p>
                <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-semibold hover:bg-primary/90">
                  Track Order
                </button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/70 mb-4">
                  Our support team is here to help with any shipping questions or concerns.
                </p>
                <p className="text-sm mb-3">
                  <strong>Email:</strong> support@globalimports.com
                </p>
                <p className="text-sm">
                  <strong>Phone:</strong> +91-11-XXXX-XXXX
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Important Notes */}
        <section className="bg-amber-50 border border-amber-200 rounded-lg p-6 mt-8 mb-12 max-w-4xl mx-auto">
          <div className="flex gap-4">
            <AlertCircle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-amber-900 mb-2">Important Shipping Notes</h3>
              <ul className="space-y-2 text-sm text-amber-900/80">
                <li>- Delivery times are estimates and may vary due to unforeseen circumstances</li>
                <li>- Orders are processed within 1-2 business days before shipment</li>
                <li>- We ship Monday to Saturday (excluding public holidays)</li>
                <li>- Bulk orders may require special handling and extended delivery time</li>
                <li>- Some remote areas may have restrictions or longer delivery times</li>
                <li>- Shipping costs shown are for standard delivery; special handling charges may apply</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold mb-8">Shipping FAQ</h2>
          <div className="space-y-4 max-w-3xl">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">When will my order be delivered?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/70">
                  Delivery times depend on your location and selected shipping method. Check your tracking number for
                  real-time updates.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How can I track my shipment?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/70">
                  You'll receive a tracking number via email. Use it on our Track Order page or the courier's website to
                  get real-time updates.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What if my order doesn't arrive on time?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/70">
                  Contact our support team immediately with your order number. We'll investigate and provide a solution.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Do you ship internationally?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/70">
                  Currently, we only ship within India. International shipping may be available in the future.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Can I change my delivery address after ordering?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/70">
                  Contact us immediately if you need to change your address. We can help if your order hasn't shipped
                  yet.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default Shipping

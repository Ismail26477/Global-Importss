import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, RefreshCw, AlertCircle } from "lucide-react"

const Returns = () => {
  const steps = [
    {
      icon: AlertCircle,
      title: "Initiate Return",
      description: "Contact us within 30 days of purchase with your order number and reason for return.",
    },
    {
      icon: RefreshCw,
      title: "Get Return Label",
      description: "We'll provide you with a prepaid shipping label via email for easy return.",
    },
    {
      icon: Clock,
      title: "Ship the Item",
      description: "Pack the item securely and ship it back using the provided label. Track your shipment.",
    },
    {
      icon: CheckCircle,
      title: "Receive Refund",
      description: "Once received and inspected, we'll process your refund within 5-7 business days.",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Header */}
        <section className="bg-gradient-to-r from-primary/10 to-primary/5 border-b">
          <div className="container mx-auto px-4 py-12 md:py-16">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Returns & Refunds Policy</h1>
            <p className="text-lg text-foreground/70 max-w-2xl">
              We want you to be completely satisfied with your purchase. Here's our simple return process.
            </p>
          </div>
        </section>

        {/* Return Process */}
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold mb-8">Our Return Process</h2>
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <span className="text-2xl font-bold text-muted-foreground">0{index + 1}</span>
                    </div>
                    <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                    <p className="text-sm text-foreground/70">{step.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Policy Details */}
        <section className="bg-muted/50 py-12">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-2xl font-bold mb-8">Return Policy Details</h2>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>30-Day Return Window</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/70">
                    You have 30 days from the date of purchase to initiate a return. Items returned after 30 days may
                    not be accepted.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Condition Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/70 mb-3">Items must be in original, unused condition with:</p>
                  <ul className="list-disc list-inside space-y-2 text-foreground/70">
                    <li>Original packaging and all components</li>
                    <li>No signs of use or damage</li>
                    <li>All original documentation and accessories</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Refund Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/70 mb-3">Here's our refund timeline:</p>
                  <ul className="space-y-2 text-foreground/70">
                    <li>
                      - <strong>Item received:</strong> We verify the return within 2-3 business days
                    </li>
                    <li>
                      - <strong>Refund processed:</strong> Within 5-7 business days after verification
                    </li>
                    <li>
                      - <strong>Bank processing:</strong> 5-10 business days (depends on your bank)
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Non-Returnable Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/70 mb-3">The following items cannot be returned:</p>
                  <ul className="list-disc list-inside space-y-2 text-foreground/70">
                    <li>Custom-cut or customized products</li>
                    <li>Items used or installed</li>
                    <li>Items with damage due to customer mishandling</li>
                    <li>Clearance or final sale items</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Damaged or Defective Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/70">
                    If you receive a damaged or defective item, please contact us immediately with photos. We'll arrange
                    a replacement or full refund right away at no cost to you.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Contact Returns Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/70 mb-4">To initiate a return, please contact our returns team:</p>
                  <ul className="space-y-2 text-foreground/70">
                    <li>Email: returns@globalimports.com</li>
                    <li>Phone: +91-11-XXXX-XXXX</li>
                    <li>Available: Monday - Friday, 9AM - 6PM IST</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4 max-w-3xl">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Can I return an item without a receipt?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/70">
                  Yes! We can look up your order using your email address or order number. Just have that information
                  ready.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What if the item is used but in good condition?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/70">
                  Used items cannot be returned unless they're defective. We recommend contacting our support team to
                  discuss your situation.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Do I have to pay for return shipping?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/70">
                  No! We provide a prepaid shipping label for all eligible returns. Shipping is completely free.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What if I return the item without the original packaging?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/70">
                  While original packaging is preferred, it's not always required. Please contact us to discuss your
                  specific situation.
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

export default Returns

"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Search, Phone, Mail, MessageCircle, ArrowLeft, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

const faqCategories = [
  {
    id: "orders",
    title: "Orders & Delivery",
    faqs: [
      {
        q: "How can I track my order?",
        a: "You can track your order in real-time from your account dashboard. Go to 'Your Orders' and click on the tracking link for your order. You'll see the current status and estimated delivery date.",
      },
      {
        q: "Can I modify or cancel my order?",
        a: "You can modify or cancel your order within 1 hour of placing it. After that, the order is processed and cannot be changed. Contact our support team if you need assistance.",
      },
      {
        q: "What are your delivery times?",
        a: "Standard delivery takes 5-7 business days. Express delivery is available for 2-3 business days. Free shipping is available for orders over ₹2,500.",
      },
      {
        q: "Do you deliver internationally?",
        a: "Currently, we deliver within India. International shipping may be available in the future. Check back soon for updates.",
      },
    ],
  },
  {
    id: "returns",
    title: "Returns & Refunds",
    faqs: [
      {
        q: "What is your return policy?",
        a: "We offer hassle-free returns within 30 days of purchase. Products must be unused and in original packaging. Refunds are processed within 5-7 business days.",
      },
      {
        q: "How do I initiate a return?",
        a: "Go to your order in the account dashboard and click 'Return Item'. Follow the instructions to arrange a pickup. A prepaid return label will be sent to you.",
      },
      {
        q: "When will I receive my refund?",
        a: "Once we receive and inspect your returned item, refunds are processed within 5-7 business days. The amount will be credited to your original payment method.",
      },
      {
        q: "Can I exchange a product instead of returning it?",
        a: "Yes! You can initiate an exchange by selecting 'Exchange Item' instead of 'Return Item' in your order. Shipping is free for exchanges.",
      },
    ],
  },
  {
    id: "payment",
    title: "Payment & Security",
    faqs: [
      {
        q: "What payment methods do you accept?",
        a: "We accept Credit/Debit Cards, Net Banking, UPI, Digital Wallets, and Cash on Delivery. All payments are encrypted and secure.",
      },
      {
        q: "Is my payment information secure?",
        a: "Yes! We use 256-bit SSL encryption to protect all transactions. Your payment details are never stored on our servers.",
      },
      {
        q: "Can I use multiple payment methods?",
        a: "You can pay with one method per order. However, you can use different payment methods for different orders.",
      },
      {
        q: "Do you offer installment payments?",
        a: "Yes! For orders over ₹5,000, you can choose EMI options available through participating credit card issuers.",
      },
    ],
  },
  {
    id: "products",
    title: "Products & Availability",
    faqs: [
      {
        q: "How do I check product availability?",
        a: "Product availability is shown on the product page. Out-of-stock items show 'Coming Soon'. You can sign up for notifications when the item is back in stock.",
      },
      {
        q: "Are the product prices fixed?",
        a: "Prices may vary based on ongoing promotions and seasonal sales. Subscribe to our newsletter for exclusive deals and early access to sales.",
      },
      {
        q: "Do you offer bulk orders?",
        a: "Yes! For bulk orders of 5+ units, please contact our sales team at sales@globalimports.com for special pricing.",
      },
      {
        q: "Can I pre-order products?",
        a: "Pre-orders are available for new arrivals. You'll be charged immediately and the product will be shipped as soon as it's available.",
      },
    ],
  },
]

const Help = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedCategory, setExpandedCategory] = useState("orders")

  const filteredFaqs = faqCategories.map((cat) => ({
    ...cat,
    faqs: cat.faqs.filter(
      (faq) =>
        faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.a.toLowerCase().includes(searchQuery.toLowerCase()),
    ),
  }))

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary/10 to-primary/5 border-b">
          <div className="container mx-auto px-4 py-12">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground mb-4 hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            <h1 className="text-4xl font-bold mb-4">How Can We Help?</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Find answers to common questions about orders, payments, returns, and more.
            </p>

            {/* Search Bar */}
            <div className="flex gap-2 max-w-2xl">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search help topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Support Options */}
        <section className="border-b py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">Other Ways to Get Help</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <Phone className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Call Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Available Monday-Friday, 9AM-6PM IST</p>
                  <a href="tel:+918001001234" className="text-primary font-semibold hover:underline">
                    +91 800 100 1234
                  </a>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Mail className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Email Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Response within 24 hours</p>
                  <a href="mailto:support@globalimports.com" className="text-primary font-semibold hover:underline">
                    support@globalimports.com
                  </a>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <MessageCircle className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Live Chat</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Chat with our team in real-time</p>
                  <Button variant="outline" className="w-full bg-transparent" asChild>
                    <Link to="/contact">Start Chat</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">Frequently Asked Questions</h2>

            <div className="grid lg:grid-cols-4 gap-8">
              {/* Category Navigation */}
              <div className="lg:col-span-1">
                <div className="space-y-2 sticky top-20">
                  {faqCategories.map((cat) => (
                    <Button
                      key={cat.id}
                      variant={expandedCategory === cat.id ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setExpandedCategory(cat.id)}
                    >
                      {cat.title}
                    </Button>
                  ))}
                </div>
              </div>

              {/* FAQ Content */}
              <div className="lg:col-span-3 space-y-6">
                {filteredFaqs.map((category) => (
                  <div
                    key={category.id}
                    className={expandedCategory !== category.id && searchQuery === "" ? "hidden" : ""}
                  >
                    <h3 className="text-xl font-semibold mb-4">{category.title}</h3>
                    {category.faqs.length > 0 ? (
                      <Accordion type="single" collapsible className="w-full">
                        {category.faqs.map((faq, idx) => (
                          <AccordionItem key={idx} value={`${category.id}-${idx}`}>
                            <AccordionTrigger className="text-left hover:text-primary">{faq.q}</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    ) : (
                      <p className="text-muted-foreground">No results found for "{searchQuery}"</p>
                    )}
                  </div>
                ))}

                {filteredFaqs.every((cat) => cat.faqs.length === 0) && (
                  <div className="text-center py-12">
                    <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No results found</h3>
                    <p className="text-muted-foreground mb-6">
                      We couldn't find an answer to your question. Please contact our support team.
                    </p>
                    <Button asChild>
                      <Link to="/contact">Contact Support</Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Help

"use client"

import { Link } from "react-router-dom"
import { Copy, Calendar, Target, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { usePromo } from "@/contexts/PromoContext"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

const Promotions = () => {
  const { toast } = useToast()
  const { getAvailablePromos, applyPromo } = usePromo()
  const promos = getAvailablePromos()

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    toast({
      title: "Copied!",
      description: `Promo code "${code}" copied to clipboard`,
    })
  }

  const handleApplyPromo = (code: string) => {
    const result = applyPromo(code)
    toast({
      title: result.success ? "Success" : "Error",
      description: result.message,
    })
    if (result.success) {
      setTimeout(() => {
        window.location.href = "/checkout"
      }, 1000)
    }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary/10 to-primary/5 border-b">
          <div className="container mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold mb-4">Exclusive Promotions & Deals</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Discover amazing discounts and special offers on your favorite products from Global Imports.
            </p>
          </div>
        </section>

        {/* Active Promotions */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Current Offers</h2>

            {promos.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {promos.map((promo) => {
                  const discountValue =
                    promo.discountAmount || Math.round((promo.minAmount * promo.discountPercent) / 100)
                  const daysLeft = Math.ceil(
                    (new Date(promo.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
                  )

                  return (
                    <Card
                      key={promo.code}
                      className="border-l-4 border-l-primary overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <CardTitle className="text-2xl">{promo.code}</CardTitle>
                            <p className="text-sm text-muted-foreground mt-1">{promo.description}</p>
                          </div>
                          <Badge className="bg-primary/20 text-primary">Active</Badge>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        {/* Discount Info */}
                        <div className="bg-primary/5 rounded-lg p-4">
                          <div className="text-sm text-muted-foreground mb-1">You Save Up To</div>
                          <div className="text-3xl font-bold text-primary">
                            {promo.discountPercent > 0 ? `${promo.discountPercent}%` : `₹${discountValue}`}
                          </div>
                        </div>

                        {/* Terms */}
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <Target className="h-4 w-4 text-muted-foreground" />
                            <span>Minimum order: ₹{promo.minAmount.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>Expires in {daysLeft} days</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground">
                              Uses remaining: {promo.maxUses - promo.currentUses}
                            </span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 pt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 bg-transparent"
                            onClick={() => handleCopyCode(promo.code)}
                          >
                            <Copy className="h-4 w-4 mr-2" />
                            Copy Code
                          </Button>
                          <Button size="sm" className="flex-1" onClick={() => handleApplyPromo(promo.code)}>
                            Apply Now
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground mb-4">No active promotions at the moment.</p>
                  <Button asChild>
                    <Link to="/">Continue Shopping</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </section>

        {/* How to Use Section */}
        <section className="bg-muted/50 py-12 border-t">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">How to Use Promo Codes</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <div className="text-4xl font-bold text-primary mb-2">1</div>
                  <CardTitle>Copy the Code</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Click on any promo code to copy it to your clipboard instantly.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="text-4xl font-bold text-primary mb-2">2</div>
                  <CardTitle>Go to Checkout</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Add items to your cart and proceed to the checkout page.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="text-4xl font-bold text-primary mb-2">3</div>
                  <CardTitle>Paste the Code</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Enter the promo code and see your discount applied instantly.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Promotions

import { Link } from "react-router-dom"
import { Facebook, Twitter, Instagram, Youtube, CreditCard, Truck, Shield, Headphones } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const Footer = () => {
  return (
    <footer className="bg-header text-header-foreground">
      {/* Features bar */}
      <div className="border-b border-header-foreground/10">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <Truck className="h-8 w-8 text-primary" />
              <div>
                <p className="font-semibold">Free Shipping</p>
                <p className="text-sm text-header-foreground/70">On orders over ₹2,500</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-primary" />
              <div>
                <p className="font-semibold">Secure Payment</p>
                <p className="text-sm text-header-foreground/70">100% protected</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CreditCard className="h-8 w-8 text-primary" />
              <div>
                <p className="font-semibold">Easy Returns</p>
                <p className="text-sm text-header-foreground/70">30 day return policy</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Headphones className="h-8 w-8 text-primary" />
              <div>
                <p className="font-semibold">24/7 Support</p>
                <p className="text-sm text-header-foreground/70">Dedicated support</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* About */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-primary mb-4">Global Imports</h2>
            <p className="text-header-foreground/70 mb-4 max-w-sm">
              Your one-stop destination for quality products at unbeatable prices. Shop with confidence and enjoy a
              seamless shopping experience.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-header-foreground/70">
              <li>
                <Link to="/about" className="hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/help" className="hover:text-primary transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2 text-header-foreground/70">
              <li>
                <Link to="/account" className="hover:text-primary transition-colors">
                  Track Order
                </Link>
              </li>
              <li>
                <Link to="/returns" className="hover:text-primary transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="hover:text-primary transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold mb-4">Newsletter</h3>
            <p className="text-header-foreground/70 text-sm mb-4">Subscribe for exclusive deals and updates!</p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-header-foreground/10 border-header-foreground/20 text-header-foreground placeholder:text-header-foreground/50"
              />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-header-foreground/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-header-foreground/70">
            <p>&copy; 2026 Global Imports. All rights reserved.</p>
            <div className="flex items-center gap-4 flex-wrap">
              <Link to="/terms" className="hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link to="/privacy" className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/testimonials" className="hover:text-primary transition-colors">
                Testimonials
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

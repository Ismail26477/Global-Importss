import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { CartProvider } from "@/contexts/CartContext"
import { WishlistProvider } from "@/contexts/WishlistContext"
import { AuthProvider } from "@/contexts/AuthContext"
import { UserProvider } from "@/contexts/UserContext"
import { ReviewProvider } from "@/contexts/ReviewContext"
import { ComparisonProvider } from "@/contexts/ComparisonContext"
import { PromoProvider } from "@/contexts/PromoContext"
import { RecentlyViewedProvider } from "@/contexts/RecentlyViewedContext"
import Index from "./pages/Index"
import NotFound from "./pages/NotFound"
import ProductDetail from "./pages/ProductDetail"
import Cart from "./pages/Cart"
import Category from "./pages/Category"
import Auth from "./pages/Auth"
import Checkout from "./pages/Checkout"
import OrderConfirmation from "./pages/OrderConfirmation"
import AccountDashboard from "./pages/AccountDashboard"
import Search from "./pages/Search"
import AdminInventory from "./pages/AdminInventory"
import Comparison from "./pages/Comparison"
import Help from "./pages/Help"
import Contact from "./pages/Contact"
import Promotions from "./pages/Promotions"
import Blog from "./pages/Blog"
import BlogPost from "./pages/BlogPost"
import Testimonials from "./pages/Testimonials"
import About from "./pages/About"
import Terms from "./pages/Terms"
import Privacy from "./pages/Privacy"
import Returns from "./pages/Returns"
import Shipping from "./pages/Shipping"

const queryClient = new QueryClient()

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <UserProvider>
        <ReviewProvider>
          <PromoProvider>
            <ComparisonProvider>
              <RecentlyViewedProvider>
                <CartProvider>
                  <WishlistProvider>
                    <TooltipProvider>
                      <Toaster />
                      <Sonner />
                      <BrowserRouter>
                        <Routes>
                          <Route path="/" element={<Index />} />
                          <Route path="/product/:id" element={<ProductDetail />} />
                          <Route path="/cart" element={<Cart />} />
                          <Route path="/comparison" element={<Comparison />} />
                          <Route path="/checkout" element={<Checkout />} />
                          <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
                          <Route path="/category/:id" element={<Category />} />
                          <Route path="/auth" element={<Auth />} />
                          <Route path="/account" element={<AccountDashboard />} />
                          <Route path="/search" element={<Search />} />
                          <Route path="/admin/inventory" element={<AdminInventory />} />
                          <Route path="/help" element={<Help />} />
                          <Route path="/contact" element={<Contact />} />
                          <Route path="/promotions" element={<Promotions />} />
                          <Route path="/blog" element={<Blog />} />
                          <Route path="/blog/:id" element={<BlogPost />} />
                          <Route path="/testimonials" element={<Testimonials />} />
                          <Route path="/about" element={<About />} />
                          <Route path="/terms" element={<Terms />} />
                          <Route path="/privacy" element={<Privacy />} />
                          <Route path="/returns" element={<Returns />} />
                          <Route path="/shipping" element={<Shipping />} />
                          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                          <Route path="*" element={<NotFound />} />
                        </Routes>
                      </BrowserRouter>
                    </TooltipProvider>
                  </WishlistProvider>
                </CartProvider>
              </RecentlyViewedProvider>
            </ComparisonProvider>
          </PromoProvider>
        </ReviewProvider>
      </UserProvider>
    </AuthProvider>
  </QueryClientProvider>
)

export default App

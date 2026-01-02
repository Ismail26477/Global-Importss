"use client"

import type React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Search, ShoppingCart, Heart, User, Menu, X, ChevronDown, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/CartContext"
import { useWishlist } from "@/contexts/WishlistContext"
import { categories } from "@/data/products"
import { useAuth } from "@/contexts/AuthContext"

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { totalItems } = useCart()
  const { items: wishlistItems } = useWishlist()
  const { user, signOut } = useAuth()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top bar */}
      <div className="bg-header text-header-foreground">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="flex items-center justify-between py-2 text-xs sm:text-sm gap-2 sm:gap-4">
            <div className="flex items-center gap-1 sm:gap-2">
              <MapPin className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
              <span className="hidden xs:inline">Deliver to</span>
              <span className="font-semibold truncate text-xs sm:text-sm">Select Location</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <Link to="/orders" className="hover:text-primary transition-colors text-xs sm:text-sm">
                Orders
              </Link>
              <Link to="/help" className="hover:text-primary transition-colors hidden sm:inline text-sm">
                Help
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="bg-header text-header-foreground border-b border-header/20">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="flex items-center gap-2 sm:gap-4 py-3 sm:py-4">
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-header-foreground hover:bg-header/80 h-9 w-9 sm:h-10 sm:w-10"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
            </Button>

            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <h1 className="text-lg sm:text-2xl font-bold text-primary">Global Imports</h1>
            </Link>

            {/* Search bar - Hidden on mobile */}
            <form onSubmit={handleSearch} className="flex-1 max-w-2xl hidden md:flex ml-auto mr-4">
              <div className="flex w-full">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="secondary"
                      className="rounded-r-none border-r-0 bg-secondary text-secondary-foreground"
                    >
                      All
                      <ChevronDown className="h-4 w-4 ml-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>All Categories</DropdownMenuItem>
                    {categories.map((cat) => (
                      <DropdownMenuItem key={cat.id}>{cat.name}</DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <Input
                  type="text"
                  placeholder="Search products, brands, and more..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="rounded-none border-x-0 flex-1 bg-card text-card-foreground"
                />
                <Button type="submit" className="rounded-l-none">
                  <Search className="h-5 w-5" />
                </Button>
              </div>
            </form>

            {/* Right side icons - Better mobile spacing */}
            <div className="flex items-center gap-1 sm:gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-header-foreground hover:bg-header/80 hidden sm:flex flex-col items-start h-auto py-1 px-2"
                  >
                    <span className="text-xs">Hello</span>
                    <span className="text-xs sm:text-sm font-semibold flex items-center">
                      Account
                      <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 ml-1" />
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  {user ? (
                    <>
                      <DropdownMenuItem disabled className="font-semibold">
                        {user.email}
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/account">Your Account</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/account">Your Orders</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/account">Your Wishlist</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={signOut}>Sign Out</DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <DropdownMenuItem asChild>
                        <Link to="/auth">Sign In</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/auth?mode=signup">Create Account</Link>
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              <Link to="/comparison">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-header-foreground hover:bg-header/80 relative h-9 w-9 sm:h-10 sm:w-10"
                >
                  <span className="hidden sm:inline text-xs font-semibold">Compare</span>
                </Button>
              </Link>

              <Link to="/account">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-header-foreground hover:bg-header/80 relative h-9 w-9 sm:h-10 sm:w-10"
                >
                  <Heart className="h-5 w-5 sm:h-6 sm:w-6" />
                  {wishlistItems.length > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-4 w-4 sm:h-5 sm:w-5 p-0 flex items-center justify-center text-xs bg-primary">
                      {wishlistItems.length}
                    </Badge>
                  )}
                </Button>
              </Link>

              <Link to="/cart">
                <Button
                  variant="ghost"
                  className="text-header-foreground hover:bg-header/80 relative flex items-center gap-1 h-9 sm:h-10 px-2 sm:px-3"
                >
                  <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6" />
                  <Badge className="absolute -top-1 -right-1 h-4 w-4 sm:h-5 sm:w-5 p-0 flex items-center justify-center text-xs bg-primary">
                    {totalItems}
                  </Badge>
                  <span className="hidden sm:inline font-semibold text-xs sm:text-sm">Cart</span>
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile search - Below header */}
          <form onSubmit={handleSearch} className="md:hidden pb-3">
            <div className="flex gap-1">
              <Input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-r-none flex-1 bg-card text-card-foreground text-sm"
              />
              <Button type="submit" className="rounded-l-none px-3 sm:px-4">
                <Search className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Categories nav */}
      <nav className="bg-card border-b hidden lg:block">
        <div className="container mx-auto px-4">
          <ul className="flex items-center gap-6 py-2 text-sm">
            <li>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-1 font-semibold">
                    <Menu className="h-4 w-4" />
                    All Categories
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  {categories.map((cat) => (
                    <DropdownMenuItem key={cat.id} asChild>
                      <Link to={`/category/${cat.id}`}>{cat.name}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
            <li>
              <Link to="/deals" className="text-sale font-semibold hover:underline">
                Today's Deals
              </Link>
            </li>
            {categories.slice(0, 5).map((cat) => (
              <li key={cat.id}>
                <Link
                  to={`/category/${cat.id}`}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile menu - Better spacing */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-card border-b animate-slide-in">
          <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
            <div className="space-y-1 sm:space-y-2">
              <Link
                to={user ? "/account" : "/auth"}
                className="flex items-center gap-2 p-2 sm:p-3 hover:bg-accent rounded-md text-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <User className="h-5 w-5 flex-shrink-0" />
                {user ? "My Account" : "Sign In / Register"}
              </Link>
              <div className="border-t pt-2 sm:pt-3 mt-2 sm:mt-3">
                <p className="text-xs sm:text-sm font-semibold text-muted-foreground mb-2 px-2">Categories</p>
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/category/${cat.id}`}
                    className="block p-2 sm:p-3 hover:bg-accent rounded-md text-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header

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
  const [selectedLocation, setSelectedLocation] = useState("Delhi")
  const { totalItems } = useCart()
  const { items: wishlistItems } = useWishlist()
  const { user, signOut } = useAuth()

  const indianCities = ["Delhi", "Mumbai", "Bangalore", "Hyderabad", "Kolkata", "Chennai", "Pune", "Ahmedabad"]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <header className="w-full shadow-sm z-50">
      {/* Top bar */}
      <div className="bg-header text-header-foreground border-b border-header/20">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="flex items-center justify-between py-2 sm:py-2.5 text-xs gap-2 sm:gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-header-foreground hover:bg-header/80 h-auto p-1.5 sm:p-2 flex items-center gap-1 font-semibold text-xs"
                >
                  <MapPin className="h-3 w-3 sm:h-3.5 sm:w-3.5 flex-shrink-0" />
                  <span className="hidden xs:inline">{selectedLocation}</span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <div className="px-2 py-1">
                  <p className="text-xs font-semibold text-muted-foreground mb-1">Select Your Location</p>
                  {indianCities.map((city) => (
                    <DropdownMenuItem
                      key={city}
                      onClick={() => setSelectedLocation(city)}
                      className="cursor-pointer text-xs"
                    >
                      <span className={selectedLocation === city ? "font-semibold text-primary" : ""}>{city}</span>
                    </DropdownMenuItem>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex items-center gap-2 sm:gap-3 ml-auto">
              <Link to="/orders" className="hover:text-primary transition-colors text-xs font-medium">
                Orders
              </Link>
              <Link to="/help" className="hover:text-primary transition-colors hidden sm:inline text-xs font-medium">
                Help
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="bg-header text-header-foreground border-b border-header/20">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="flex items-center gap-2 py-2 sm:py-2.5">
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-header-foreground hover:bg-header/80 h-8 w-8 sm:h-9 sm:w-9"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-4 w-4 sm:h-5 sm:w-5" /> : <Menu className="h-4 w-4 sm:h-5 sm:w-5" />}
            </Button>

            {/* Logo - Reduced size */}
            <Link to="/" className="flex-shrink-0">
              <h1 className="text-base sm:text-xl md:text-2xl font-bold text-primary tracking-tight">Global Imports</h1>
            </Link>

            {/* Enhanced search bar */}
            <form onSubmit={handleSearch} className="flex-1 max-w-2xl hidden md:flex ml-auto mr-3">
              <div className="flex w-full shadow-sm rounded-lg overflow-hidden h-9 sm:h-10">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="secondary"
                      className="rounded-r-none border-r border-primary/20 bg-secondary text-secondary-foreground hover:bg-secondary/90 font-medium text-xs px-2"
                    >
                      All
                      <ChevronDown className="h-3 w-3 ml-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem className="text-xs">All Categories</DropdownMenuItem>
                    {categories.map((cat) => (
                      <DropdownMenuItem key={cat.id} className="text-xs">
                        {cat.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="rounded-none border-0 flex-1 bg-white text-foreground placeholder:text-muted-foreground focus-visible:ring-0 text-xs"
                />
                <Button
                  type="submit"
                  className="rounded-l-none bg-primary hover:bg-primary/90 text-white font-semibold px-3"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </form>

            {/* Right side icons */}
            <div className="flex items-center gap-0.5 sm:gap-1">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-header-foreground hover:bg-header/80 hidden sm:flex flex-col items-start h-auto py-1 px-1.5 text-xs"
                  >
                    <span className="text-xs">Hello</span>
                    <span className="text-xs font-semibold flex items-center">
                      Account
                      <ChevronDown className="h-2.5 w-2.5 ml-0.5" />
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  {user ? (
                    <>
                      <DropdownMenuItem disabled className="font-semibold text-xs">
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
                  className="text-header-foreground hover:bg-header/80 relative h-8 w-8 sm:h-9 sm:w-9"
                >
                  <span className="hidden sm:inline text-xs font-semibold">Compare</span>
                </Button>
              </Link>

              <Link to="/account">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-header-foreground hover:bg-header/80 relative flex items-center gap-0.5 h-8 sm:h-9 px-1.5 sm:px-2"
                >
                  <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
                  {wishlistItems.length > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-xs bg-primary">
                      {wishlistItems.length}
                    </Badge>
                  )}
                </Button>
              </Link>

              <Link to="/cart">
                <Button
                  variant="ghost"
                  className="text-header-foreground hover:bg-header/80 relative flex items-center gap-0.5 h-8 sm:h-9 px-1.5 sm:px-2"
                >
                  <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
                  <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-xs bg-primary">
                    {totalItems}
                  </Badge>
                  <span className="hidden sm:inline font-semibold text-xs">Cart</span>
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile search */}
          <form onSubmit={handleSearch} className="md:hidden pb-2">
            <div className="flex gap-1">
              <Input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-lg flex-1 bg-white text-foreground placeholder:text-muted-foreground text-xs h-8"
              />
              <Button type="submit" className="rounded-lg px-2 bg-primary hover:bg-primary/90 h-8">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Categories nav */}
      <nav className="bg-card border-b hidden lg:block">
        <div className="container mx-auto px-4">
          <ul className="flex items-center gap-4 py-2 text-xs sm:text-sm">
            <li>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-1.5 font-semibold text-foreground hover:text-primary transition-colors text-xs"
                  >
                    <Menu className="h-3.5 w-3.5" />
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
              <Link to="/deals" className="text-primary font-semibold hover:underline text-xs">
                Today's Deals
              </Link>
            </li>
            {categories.slice(0, 5).map((cat) => (
              <li key={cat.id}>
                <Link
                  to={`/category/${cat.id}`}
                  className="text-muted-foreground hover:text-foreground transition-colors font-medium text-xs"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-card border-b animate-slide-in">
          <div className="container mx-auto px-3 sm:px-4 py-2 sm:py-3">
            <div className="space-y-0.5 sm:space-y-1">
              <Link
                to={user ? "/account" : "/auth"}
                className="flex items-center gap-2 p-2 hover:bg-accent rounded-lg text-xs font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <User className="h-4 w-4 flex-shrink-0" />
                {user ? "My Account" : "Sign In"}
              </Link>
              <div className="border-t pt-1 sm:pt-2 mt-1 sm:mt-2">
                <p className="text-xs font-semibold text-muted-foreground mb-1 px-2">Categories</p>
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/category/${cat.id}`}
                    className="block p-2 hover:bg-accent rounded-lg text-xs font-medium"
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

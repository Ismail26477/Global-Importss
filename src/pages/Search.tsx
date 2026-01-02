"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useSearchParams, Link } from "react-router-dom"
import { SearchIcon, ArrowRight, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { searchProducts } from "@/data/products"
import type { Product } from "@/data/products"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import ProductCard from "@/components/products/ProductCard"

const Search: React.FC = () => {
  const [searchParams] = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "")
  const [searchResults, setSearchResults] = useState<Product[]>([])
  const [filteredResults, setFilteredResults] = useState<Product[]>([])
  const [sortBy, setSortBy] = useState("relevance")
  const [showFilters, setShowFilters] = useState(false)

  // Filter states
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 })
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedRating, setSelectedRating] = useState(0)

  // Get unique brands from results
  const brands = Array.from(new Set(searchResults.map((p) => p.brand)))

  useEffect(() => {
    const results = searchProducts(searchQuery || searchParams.get("q") || "")
    setSearchResults(results)
    applyFilters(results)
  }, [searchQuery, searchParams])

  const applyFilters = (results: Product[]) => {
    let filtered = results.filter(
      (p) =>
        p.price >= priceRange.min &&
        p.price <= priceRange.max &&
        (selectedBrands.length === 0 || selectedBrands.includes(p.brand)) &&
        (selectedRating === 0 || p.rating >= selectedRating),
    )

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        filtered = filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered = filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered = filtered.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        filtered = filtered.reverse()
        break
      case "relevance":
      default:
        break
    }

    setFilteredResults(filtered)
  }

  const handleFilterChange = () => {
    applyFilters(searchResults)
  }

  const handleBrandToggle = (brand: string) => {
    setSelectedBrands((prev) => (prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]))
  }

  const handleClearFilters = () => {
    setPriceRange({ min: 0, max: 10000 })
    setSelectedBrands([])
    setSelectedRating(0)
    setFilteredResults(searchResults)
  }

  useEffect(() => {
    handleFilterChange()
  }, [priceRange, selectedBrands, selectedRating, sortBy])

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4">
          {/* Search Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-4">Search Results</h1>
            <p className="text-muted-foreground mb-4">
              {searchResults.length === 0
                ? "No products found for your search."
                : `Found ${filteredResults.length} products for "${searchQuery}"`}
            </p>

            {/* Search Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
              }}
              className="flex gap-2"
            >
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-background"
              />
              <Button type="submit">
                <SearchIcon className="h-5 w-5" />
              </Button>
            </form>
          </div>

          {searchResults.length === 0 ? (
            <Card className="p-12 border-0 bg-card shadow-sm text-center">
              <SearchIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-2">No Products Found</h2>
              <p className="text-muted-foreground mb-6">
                We couldn't find anything matching "{searchQuery}". Try a different search term.
              </p>
              <Link to="/">
                <Button size="lg">
                  Continue Shopping
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </Card>
          ) : (
            <div className="grid gap-8 lg:grid-cols-4">
              {/* Sidebar Filters */}
              <div className="lg:col-span-1">
                <div className="flex items-center justify-between mb-4 lg:hidden">
                  <h3 className="font-bold text-foreground">Filters</h3>
                  <Button variant="ghost" size="sm" onClick={() => setShowFilters(!showFilters)}>
                    <Filter className="h-5 w-5" />
                  </Button>
                </div>

                {(showFilters || window.innerWidth >= 1024) && (
                  <Card className="p-6 border-0 bg-card shadow-sm space-y-6">
                    {/* Price Range */}
                    <div>
                      <h4 className="font-bold text-foreground mb-4">Price Range</h4>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm text-muted-foreground mb-1">Min: ₹{priceRange.min}</label>
                          <Input
                            type="range"
                            min="0"
                            max="10000"
                            value={priceRange.min}
                            onChange={(e) =>
                              setPriceRange((prev) => ({
                                ...prev,
                                min: Number.parseInt(e.target.value),
                              }))
                            }
                            className="w-full"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-muted-foreground mb-1">Max: ₹{priceRange.max}</label>
                          <Input
                            type="range"
                            min="0"
                            max="10000"
                            value={priceRange.max}
                            onChange={(e) =>
                              setPriceRange((prev) => ({
                                ...prev,
                                max: Number.parseInt(e.target.value),
                              }))
                            }
                            className="w-full"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Brands */}
                    {brands.length > 0 && (
                      <div>
                        <h4 className="font-bold text-foreground mb-4">Brands</h4>
                        <div className="space-y-2">
                          {brands.map((brand) => (
                            <label key={brand} className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={selectedBrands.includes(brand)}
                                onChange={() => handleBrandToggle(brand)}
                                className="w-4 h-4"
                              />
                              <span className="text-sm text-foreground">{brand}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Rating Filter */}
                    <div>
                      <h4 className="font-bold text-foreground mb-4">Rating</h4>
                      <div className="space-y-2">
                        {[5, 4, 3, 2, 1].map((rating) => (
                          <label key={rating} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="rating"
                              value={rating}
                              checked={selectedRating === rating}
                              onChange={() => setSelectedRating(rating)}
                              className="w-4 h-4"
                            />
                            <span className="text-sm text-foreground">{rating}+ Stars & Up</span>
                          </label>
                        ))}
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="rating"
                            value="0"
                            checked={selectedRating === 0}
                            onChange={() => setSelectedRating(0)}
                            className="w-4 h-4"
                          />
                          <span className="text-sm text-foreground">All Ratings</span>
                        </label>
                      </div>
                    </div>

                    {/* Clear Filters */}
                    <Button variant="outline" className="w-full bg-transparent" onClick={handleClearFilters}>
                      Clear Filters
                    </Button>
                  </Card>
                )}
              </div>

              {/* Products Grid */}
              <div className="lg:col-span-3">
                {/* Sort Options */}
                <div className="mb-6 flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">Showing {filteredResults.length} results</p>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm"
                  >
                    <option value="relevance">Relevance</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="newest">Newest First</option>
                  </select>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-3">
                  {filteredResults.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {filteredResults.length === 0 && (
                  <Card className="p-12 border-0 bg-card shadow-sm text-center">
                    <p className="text-muted-foreground">No products match your filters</p>
                    <Button variant="outline" className="mt-4 bg-transparent" onClick={handleClearFilters}>
                      Clear Filters and Try Again
                    </Button>
                  </Card>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Search

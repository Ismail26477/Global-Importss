"use client"

import { useState, useMemo } from "react"
import { useParams } from "react-router-dom"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import ProductCard from "@/components/products/ProductCard"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { products, categories } from "@/data/products"
import { Filter, X } from "lucide-react"

type SortOption = "relevance" | "price-low" | "price-high" | "newest" | "rating"

const Category = () => {
  const { id } = useParams<{ id: string }>()
  const categoryId = id || "home"

  // Filter states
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedRatings, setSelectedRatings] = useState<number[]>([])
  const [sortBy, setSortBy] = useState<SortOption>("relevance")
  const [showFilters, setShowFilters] = useState(true)

  // Get products for this category
  const categoryProducts = useMemo(() => products.filter((p) => p.category === categoryId), [categoryId])

  // Get unique brands and ratings
  const uniqueBrands = useMemo(() => [...new Set(categoryProducts.map((p) => p.brand))].sort(), [categoryProducts])

  // Apply filters
  const filteredProducts = useMemo(() => {
    return categoryProducts.filter((product) => {
      // Price filter
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false
      }

      // Brand filter
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
        return false
      }

      // Rating filter
      if (selectedRatings.length > 0) {
        const minRating = Math.min(...selectedRatings)
        if (product.rating < minRating) {
          return false
        }
      }

      return true
    })
  }, [categoryProducts, priceRange, selectedBrands, selectedRatings])

  // Apply sorting
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts]

    switch (sortBy) {
      case "price-low":
        sorted.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        sorted.sort((a, b) => b.price - a.price)
        break
      case "newest":
        sorted.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0))
        break
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating)
        break
      default:
        break
    }

    return sorted
  }, [filteredProducts, sortBy])

  const categoryName = categories.find((c) => c.id === categoryId)?.name || "Products"

  // Handle brand toggle
  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) => (prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]))
  }

  // Handle rating toggle
  const toggleRating = (rating: number) => {
    setSelectedRatings((prev) => (prev.includes(rating) ? prev.filter((r) => r !== rating) : [...prev, rating]))
  }

  // Clear all filters
  const clearFilters = () => {
    setPriceRange([0, 2000])
    setSelectedBrands([])
    setSelectedRatings([])
    setSortBy("relevance")
  }

  const hasActiveFilters =
    priceRange[0] !== 0 || priceRange[1] !== 2000 || selectedBrands.length > 0 || selectedRatings.length > 0

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Header */}
        <div className="border-b">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">{categoryName}</h1>
                <p className="text-muted-foreground">
                  Showing {sortedProducts.length} product{sortedProducts.length !== 1 ? "s" : ""}
                </p>
              </div>
              <div className="flex gap-2">
                {/* Mobile filter button */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="md:hidden bg-transparent">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80">
                    <FilterPanel
                      uniqueBrands={uniqueBrands}
                      priceRange={priceRange}
                      selectedBrands={selectedBrands}
                      selectedRatings={selectedRatings}
                      onPriceChange={setPriceRange}
                      onBrandToggle={toggleBrand}
                      onRatingToggle={toggleRating}
                      onClearFilters={clearFilters}
                      hasActiveFilters={hasActiveFilters}
                    />
                  </SheetContent>
                </Sheet>

                {/* Sort dropdown */}
                <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex gap-8">
            {/* Desktop filters */}
            <div className="hidden md:block w-64 flex-shrink-0">
              <FilterPanel
                uniqueBrands={uniqueBrands}
                priceRange={priceRange}
                selectedBrands={selectedBrands}
                selectedRatings={selectedRatings}
                onPriceChange={setPriceRange}
                onBrandToggle={toggleBrand}
                onRatingToggle={toggleRating}
                onClearFilters={clearFilters}
                hasActiveFilters={hasActiveFilters}
              />
            </div>

            {/* Products grid */}
            <div className="flex-1">
              {sortedProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16">
                  <p className="text-lg text-muted-foreground mb-4">No products found matching your filters</p>
                  <Button onClick={clearFilters} variant="outline">
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

interface FilterPanelProps {
  uniqueBrands: string[]
  priceRange: [number, number]
  selectedBrands: string[]
  selectedRatings: number[]
  onPriceChange: (range: [number, number]) => void
  onBrandToggle: (brand: string) => void
  onRatingToggle: (rating: number) => void
  onClearFilters: () => void
  hasActiveFilters: boolean
}

const FilterPanel = ({
  uniqueBrands,
  priceRange,
  selectedBrands,
  selectedRatings,
  onPriceChange,
  onBrandToggle,
  onRatingToggle,
  onClearFilters,
  hasActiveFilters,
}: FilterPanelProps) => (
  <div className="space-y-6">
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg">Filters</h3>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={onClearFilters} className="text-xs">
            <X className="h-3 w-3 mr-1" />
            Clear
          </Button>
        )}
      </div>
      <Separator />
    </div>

    {/* Price Range Filter */}
    <div>
      <Label className="font-semibold mb-4 block">Price Range</Label>
      <Slider value={priceRange} onValueChange={onPriceChange} min={0} max={2000} step={10} className="mb-3" />
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">₹{priceRange[0].toLocaleString()}</span>
        <span className="text-muted-foreground">₹{priceRange[1].toLocaleString()}</span>
      </div>
    </div>

    <Separator />

    {/* Brand Filter */}
    {uniqueBrands.length > 0 && (
      <>
        <div>
          <Label className="font-semibold mb-3 block">Brand</Label>
          <div className="space-y-2">
            {uniqueBrands.map((brand) => (
              <div key={brand} className="flex items-center space-x-2">
                <Checkbox
                  id={`brand-${brand}`}
                  checked={selectedBrands.includes(brand)}
                  onCheckedChange={() => onBrandToggle(brand)}
                />
                <Label htmlFor={`brand-${brand}`} className="text-sm font-normal cursor-pointer">
                  {brand}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />
      </>
    )}

    {/* Rating Filter */}
    <div>
      <Label className="font-semibold mb-3 block">Rating</Label>
      <div className="space-y-2">
        {[5, 4, 3, 2, 1].map((rating) => (
          <div key={rating} className="flex items-center space-x-2">
            <Checkbox
              id={`rating-${rating}`}
              checked={selectedRatings.includes(rating)}
              onCheckedChange={() => onRatingToggle(rating)}
            />
            <Label htmlFor={`rating-${rating}`} className="text-sm font-normal cursor-pointer flex items-center gap-1">
              <span>{"★".repeat(rating)}</span>
              <span className="text-xs text-muted-foreground">& Up</span>
            </Label>
          </div>
        ))}
      </div>
    </div>
  </div>
)

export default Category

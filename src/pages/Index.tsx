import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import HeroSection from "@/components/home/HeroSection"
import CategoryGrid from "@/components/home/CategoryGrid"
import ProductSection from "@/components/home/ProductSection"
import DealsSection from "@/components/home/DealsSection"
import BannerSection from "@/components/home/BannerSection"
import RecommendationsSection from "@/components/home/RecommendationsSection"
import { getFeaturedProducts, getBestsellers, getNewArrivals } from "@/data/products"
import { useRecentlyViewed } from "@/contexts/RecentlyViewedContext"

const Index = () => {
  const featuredProducts = getFeaturedProducts()
  const bestsellers = getBestsellers()
  const newArrivals = getNewArrivals()
  const { items: recentlyViewed } = useRecentlyViewed()

  const getPersonalizedRecommendations = () => {
    if (recentlyViewed.length === 0) return []

    const recentCategories = [...new Set(recentlyViewed.map((p) => p.category))]
    const recommendations = bestsellers.filter(
      (product) => recentCategories.includes(product.category) && !recentlyViewed.some((rv) => rv.id === product.id),
    )

    return recommendations.slice(0, 8)
  }

  const personalizedRecs = getPersonalizedRecommendations()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <CategoryGrid />
        <DealsSection />
        <ProductSection title="Featured Products" products={featuredProducts} viewAllLink="/products?filter=featured" />
        <BannerSection />
        <ProductSection
          title="Bestsellers"
          products={bestsellers}
          viewAllLink="/products?filter=bestseller"
          className="bg-muted/50"
        />

        {recentlyViewed.length > 0 && (
          <RecommendationsSection
            title="Recently Viewed"
            products={recentlyViewed.slice(0, 8)}
            viewAllLink="/account?tab=recently-viewed"
          />
        )}

        {personalizedRecs.length > 0 && (
          <RecommendationsSection
            title="You May Also Like"
            products={personalizedRecs}
            viewAllLink="/products?filter=recommended"
            className="bg-muted/50"
          />
        )}

        <ProductSection title="New Arrivals" products={newArrivals} viewAllLink="/products?filter=new" />
      </main>
      <Footer />
    </div>
  )
}

export default Index

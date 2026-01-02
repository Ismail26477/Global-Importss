"use client"

import { Star, ThumbsUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useReviews } from "@/contexts/ReviewContext"
import { cn } from "@/lib/utils"

interface ReviewsSectionProps {
  productId: string
  reviews?: any[]
  averageRating: number
  totalReviews: number
}

const ReviewsSection = ({ productId, reviews = [], averageRating, totalReviews }: ReviewsSectionProps) => {
  const { getProductReviews, markHelpful } = useReviews()
  const dbReviews = getProductReviews(productId)

  const getRatingDistribution = (reviews: any[]) => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
    reviews.forEach((r) => {
      distribution[r.rating as keyof typeof distribution]++
    })
    return distribution
  }

  const allReviews = [...dbReviews, ...reviews]
  const distribution = getRatingDistribution(allReviews)
  const totalCount = allReviews.length > 0 ? allReviews.length : totalReviews

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>

        {/* Rating summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Average rating */}
          <div className="flex flex-col items-center justify-center p-6 bg-muted rounded-lg">
            <div className="text-5xl font-bold mb-2">{averageRating.toFixed(1)}</div>
            <div className="flex mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-5 w-5",
                    i < Math.floor(averageRating) ? "text-rating fill-rating" : "text-muted-foreground",
                  )}
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">Based on {totalCount} reviews</p>
          </div>

          {/* Rating distribution */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center gap-3">
                <span className="text-sm font-medium w-8">{star} ★</span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-rating rounded-full transition-all"
                    style={{
                      width: `${totalCount > 0 ? (distribution[star as keyof typeof distribution] / totalCount) * 100 : 0}%`,
                    }}
                  />
                </div>
                <span className="text-sm text-muted-foreground w-12 text-right">
                  {distribution[star as keyof typeof distribution]}
                </span>
              </div>
            ))}
          </div>
        </div>

        <Separator className="my-6" />

        {/* Individual reviews */}
        {allReviews.length > 0 ? (
          <div className="space-y-4">
            {allReviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold">{review.userName || review.author}</span>
                        {review.verified && (
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
                            Verified Purchase
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                "h-4 w-4",
                                i < review.rating ? "text-rating fill-rating" : "text-muted-foreground",
                              )}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {formatDate(review.createdAt || review.date)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <h4 className="font-semibold mb-2">{review.title}</h4>
                  <p className="text-sm text-muted-foreground mb-4">{review.comment || review.content}</p>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs"
                    onClick={() => {
                      if (review.id && review.id.startsWith("review_")) {
                        markHelpful(review.id)
                      }
                    }}
                  >
                    <ThumbsUp className="h-3 w-3 mr-1" />
                    Helpful ({review.helpful || review.helpfulCount || 0})
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-8">No reviews yet. Be the first to review this product!</p>
        )}
      </div>
    </div>
  )
}

export default ReviewsSection

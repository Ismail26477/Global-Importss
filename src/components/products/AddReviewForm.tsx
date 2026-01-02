"use client"

import type React from "react"

import { useState } from "react"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/contexts/AuthContext"
import { useReviews } from "@/contexts/ReviewContext"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

interface AddReviewFormProps {
  productId: string
}

const AddReviewForm: React.FC<AddReviewFormProps> = ({ productId }) => {
  const { user } = useAuth()
  const { addReview } = useReviews()
  const { toast } = useToast()
  const [isOpen, setIsOpen] = useState(false)
  const [rating, setRating] = useState(5)
  const [title, setTitle] = useState("")
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!user) {
    return (
      <Card className="mb-8">
        <CardContent className="p-6">
          <p className="text-center text-muted-foreground mb-4">Please sign in to leave a review</p>
        </CardContent>
      </Card>
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim() || !comment.trim()) {
      toast({ title: "Error", description: "Please fill in all fields", variant: "destructive" })
      return
    }

    setIsSubmitting(true)
    try {
      addReview(productId, user.id, user.name, {
        rating,
        title,
        comment,
      })
      setTitle("")
      setComment("")
      setRating(5)
      setIsOpen(false)
      toast({ title: "Success", description: "Your review has been posted!" })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Share Your Thoughts</CardTitle>
      </CardHeader>
      <CardContent>
        {!isOpen ? (
          <Button onClick={() => setIsOpen(true)} variant="outline" className="w-full">
            Write a Review
          </Button>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Rating selector */}
            <div>
              <label className="text-sm font-semibold mb-2 block">Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} type="button" onClick={() => setRating(star)} className="focus:outline-none">
                    <Star
                      className={cn(
                        "h-8 w-8 transition-colors",
                        star <= rating ? "fill-rating text-rating" : "text-muted-foreground",
                      )}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="text-sm font-semibold mb-2 block">Review Title</label>
              <Input
                placeholder="e.g., Great quality product"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={isSubmitting}
              />
            </div>

            {/* Comment */}
            <div>
              <label className="text-sm font-semibold mb-2 block">Your Review</label>
              <Textarea
                placeholder="Share your experience with this product..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                disabled={isSubmitting}
                rows={4}
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-2">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Posting..." : "Post Review"}
              </Button>
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)} disabled={isSubmitting}>
                Cancel
              </Button>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  )
}

export default AddReviewForm

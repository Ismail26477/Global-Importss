"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export interface Review {
  id: string
  productId: string
  userId: string
  userName: string
  rating: number
  title: string
  comment: string
  createdAt: string
  helpful: number
}

interface ReviewContextType {
  reviews: Review[]
  getProductReviews: (productId: string) => Review[]
  addReview: (
    productId: string,
    userId: string,
    userName: string,
    data: Omit<Review, "id" | "productId" | "userId" | "userName" | "createdAt" | "helpful">,
  ) => void
  updateReview: (reviewId: string, data: Partial<Review>) => void
  deleteReview: (reviewId: string) => void
  markHelpful: (reviewId: string) => void
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined)

export const ReviewProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem("reviews")
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem("reviews", JSON.stringify(reviews))
  }, [reviews])

  const getProductReviews = (productId: string) => {
    return reviews.filter((r) => r.productId === productId)
  }

  const addReview = (
    productId: string,
    userId: string,
    userName: string,
    data: Omit<Review, "id" | "productId" | "userId" | "userName" | "createdAt" | "helpful">,
  ) => {
    const newReview: Review = {
      id: `review_${Date.now()}`,
      productId,
      userId,
      userName,
      ...data,
      createdAt: new Date().toISOString(),
      helpful: 0,
    }
    setReviews((prev) => [newReview, ...prev])
  }

  const updateReview = (reviewId: string, data: Partial<Review>) => {
    setReviews((prev) => prev.map((review) => (review.id === reviewId ? { ...review, ...data } : review)))
  }

  const deleteReview = (reviewId: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== reviewId))
  }

  const markHelpful = (reviewId: string) => {
    setReviews((prev) =>
      prev.map((review) => (review.id === reviewId ? { ...review, helpful: review.helpful + 1 } : review)),
    )
  }

  return (
    <ReviewContext.Provider
      value={{
        reviews,
        getProductReviews,
        addReview,
        updateReview,
        deleteReview,
        markHelpful,
      }}
    >
      {children}
    </ReviewContext.Provider>
  )
}

export const useReviews = () => {
  const context = useContext(ReviewContext)
  if (!context) {
    throw new Error("useReviews must be used within a ReviewProvider")
  }
  return context
}

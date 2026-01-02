"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { Product } from "@/data/products"

interface RecentlyViewedContextType {
  items: Product[]
  addToRecentlyViewed: (product: Product) => void
  clearRecentlyViewed: () => void
}

const RecentlyViewedContext = createContext<RecentlyViewedContextType | undefined>(undefined)

export const RecentlyViewedProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<Product[]>(() => {
    const saved = localStorage.getItem("recentlyViewed")
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem("recentlyViewed", JSON.stringify(items))
  }, [items])

  const addToRecentlyViewed = (product: Product) => {
    setItems((prev) => {
      const filtered = prev.filter((item) => item.id !== product.id)
      return [product, ...filtered].slice(0, 10)
    })
  }

  const clearRecentlyViewed = () => {
    setItems([])
  }

  return (
    <RecentlyViewedContext.Provider
      value={{
        items,
        addToRecentlyViewed,
        clearRecentlyViewed,
      }}
    >
      {children}
    </RecentlyViewedContext.Provider>
  )
}

export const useRecentlyViewed = () => {
  const context = useContext(RecentlyViewedContext)
  if (!context) {
    throw new Error("useRecentlyViewed must be used within a RecentlyViewedProvider")
  }
  return context
}

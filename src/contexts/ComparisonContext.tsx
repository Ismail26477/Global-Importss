"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { Product } from "@/data/products"

interface ComparisonContextType {
  items: Product[]
  addToComparison: (product: Product) => void
  removeFromComparison: (productId: string) => void
  clearComparison: () => void
  isInComparison: (productId: string) => boolean
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined)

export const ComparisonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<Product[]>(() => {
    const saved = localStorage.getItem("comparison")
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem("comparison", JSON.stringify(items))
  }, [items])

  const addToComparison = (product: Product) => {
    setItems((prev) => {
      if (prev.length >= 3) {
        return prev
      }
      if (prev.some((item) => item.id === product.id)) {
        return prev
      }
      return [...prev, product]
    })
  }

  const removeFromComparison = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== productId))
  }

  const clearComparison = () => {
    setItems([])
  }

  const isInComparison = (productId: string) => {
    return items.some((item) => item.id === productId)
  }

  return (
    <ComparisonContext.Provider
      value={{
        items,
        addToComparison,
        removeFromComparison,
        clearComparison,
        isInComparison,
      }}
    >
      {children}
    </ComparisonContext.Provider>
  )
}

export const useComparison = () => {
  const context = useContext(ComparisonContext)
  if (!context) {
    throw new Error("useComparison must be used within a ComparisonProvider")
  }
  return context
}

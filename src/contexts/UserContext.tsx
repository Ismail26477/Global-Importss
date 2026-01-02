"use client"

import type React from "react"
import { createContext, useContext } from "react"
import { useAuth } from "./AuthContext"
import type { Product } from "@/data/products"

interface UserContextType {
  userWishlist: Product[]
  addToUserWishlist: (product: Product) => void
  removeFromUserWishlist: (productId: string) => void
  isInUserWishlist: (productId: string) => boolean
  clearUserWishlist: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth()

  // Get wishlist key based on user
  const getWishlistKey = () => {
    return user ? `wishlist_${user.id}` : null
  }

  const userWishlist = (() => {
    const key = getWishlistKey()
    if (!key) return []
    const saved = localStorage.getItem(key)
    return saved ? JSON.parse(saved) : []
  })()

  const addToUserWishlist = (product: Product) => {
    const key = getWishlistKey()
    if (!key) {
      console.error("User must be logged in to add to wishlist")
      return
    }

    const current = JSON.parse(localStorage.getItem(key) || "[]")
    if (!current.some((p: Product) => p.id === product.id)) {
      current.push(product)
      localStorage.setItem(key, JSON.stringify(current))
    }
  }

  const removeFromUserWishlist = (productId: string) => {
    const key = getWishlistKey()
    if (!key) return

    const current = JSON.parse(localStorage.getItem(key) || "[]")
    const filtered = current.filter((p: Product) => p.id !== productId)
    localStorage.setItem(key, JSON.stringify(filtered))
  }

  const isInUserWishlist = (productId: string) => {
    const key = getWishlistKey()
    if (!key) return false

    const current = JSON.parse(localStorage.getItem(key) || "[]")
    return current.some((p: Product) => p.id === productId)
  }

  const clearUserWishlist = () => {
    const key = getWishlistKey()
    if (!key) return
    localStorage.removeItem(key)
  }

  return (
    <UserContext.Provider
      value={{
        userWishlist,
        addToUserWishlist,
        removeFromUserWishlist,
        isInUserWishlist,
        clearUserWishlist,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}

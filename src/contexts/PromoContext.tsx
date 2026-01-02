"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

export interface Promo {
  code: string
  discountPercent: number
  discountAmount?: number
  minAmount: number
  maxUses: number
  currentUses: number
  expiryDate: string
  description: string
  active: boolean
}

interface PromoContextType {
  appliedPromo: Promo | null
  applyPromo: (code: string) => { success: boolean; message: string }
  removePromo: () => void
  getAvailablePromos: () => Promo[]
}

const PromoContext = createContext<PromoContextType | undefined>(undefined)

const AVAILABLE_PROMOS: Promo[] = [
  {
    code: "GLOBAL25",
    discountPercent: 25,
    minAmount: 2500,
    maxUses: 100,
    currentUses: 45,
    expiryDate: "2025-12-31",
    description: "25% off on orders over ₹2,500",
    active: true,
  },
  {
    code: "SAVE100",
    discountPercent: 0,
    discountAmount: 100,
    minAmount: 1000,
    maxUses: 200,
    currentUses: 120,
    expiryDate: "2025-06-30",
    description: "Flat ₹100 off on orders over ₹1,000",
    active: true,
  },
  {
    code: "FIRST50",
    discountPercent: 50,
    minAmount: 5000,
    maxUses: 50,
    currentUses: 48,
    expiryDate: "2025-05-31",
    description: "50% off on first order above ₹5,000",
    active: true,
  },
  {
    code: "WELCOME15",
    discountPercent: 15,
    minAmount: 999,
    maxUses: 500,
    currentUses: 342,
    expiryDate: "2025-12-31",
    description: "15% welcome discount for new customers",
    active: true,
  },
  {
    code: "BULK30",
    discountPercent: 30,
    minAmount: 10000,
    maxUses: 150,
    currentUses: 89,
    expiryDate: "2025-08-31",
    description: "30% off on bulk orders above ₹10,000",
    active: true,
  },
]

export const PromoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [appliedPromo, setAppliedPromo] = useState<Promo | null>(null)

  const applyPromo = (code: string): { success: boolean; message: string } => {
    const promo = AVAILABLE_PROMOS.find((p) => p.code.toUpperCase() === code.toUpperCase())

    if (!promo) {
      return { success: false, message: "Invalid promo code" }
    }

    if (!promo.active) {
      return { success: false, message: "This promo code is no longer active" }
    }

    if (promo.currentUses >= promo.maxUses) {
      return { success: false, message: "This promo code has reached its usage limit" }
    }

    const expiryDate = new Date(promo.expiryDate)
    if (expiryDate < new Date()) {
      return { success: false, message: "This promo code has expired" }
    }

    setAppliedPromo(promo)
    return { success: true, message: `Promo code "${code}" applied successfully!` }
  }

  const removePromo = () => {
    setAppliedPromo(null)
  }

  const getAvailablePromos = () => {
    return AVAILABLE_PROMOS.filter((p) => p.active && p.currentUses < p.maxUses && new Date(p.expiryDate) > new Date())
  }

  return (
    <PromoContext.Provider value={{ appliedPromo, applyPromo, removePromo, getAvailablePromos }}>
      {children}
    </PromoContext.Provider>
  )
}

export const usePromo = () => {
  const context = useContext(PromoContext)
  if (!context) {
    throw new Error("usePromo must be used within a PromoProvider")
  }
  return context
}

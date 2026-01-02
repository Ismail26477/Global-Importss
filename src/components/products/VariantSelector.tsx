"use client"

import { useState } from "react"
import type { Product } from "@/data/products"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface VariantSelectorProps {
  product: Product
  onVariantChange?: (variant: Record<string, string>) => void
}

const VariantSelector = ({ product, onVariantChange }: VariantSelectorProps) => {
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({})

  const handleVariantSelect = (type: string, option: string) => {
    const newVariants = { ...selectedVariants, [type]: option }
    setSelectedVariants(newVariants)
    onVariantChange?.(newVariants)
  }

  if (!product.variants || product.variants.length === 0) {
    return null
  }

  return (
    <div className="space-y-4">
      {product.variants.map((variant) => (
        <div key={variant.type}>
          <label className="text-sm font-semibold mb-2 block">{variant.type}</label>
          <div className="flex flex-wrap gap-2">
            {variant.options.map((option) => (
              <Button
                key={option}
                variant={selectedVariants[variant.type] === option ? "default" : "outline"}
                className={cn(
                  "rounded-lg",
                  selectedVariants[variant.type] === option && "ring-2 ring-primary ring-offset-2",
                )}
                onClick={() => handleVariantSelect(variant.type, option)}
              >
                {option}
              </Button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default VariantSelector

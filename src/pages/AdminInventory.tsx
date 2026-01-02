"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Edit2, Trash2, Plus, AlertCircle, TrendingDown, Package, DollarSign, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { products } from "@/data/products"
import type { Product } from "@/data/products"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

interface InventoryItem {
  product: Product
  lastUpdated: string
  status: "in-stock" | "low-stock" | "out-of-stock"
}

const AdminInventory: React.FC = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([])
  const [filteredInventory, setFilteredInventory] = useState<InventoryItem[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | "low-stock" | "out-of-stock">("all")
  const [editingProduct, setEditingProduct] = useState<string | null>(null)
  const [editStock, setEditStock] = useState("")
  const [editPrice, setEditPrice] = useState("")

  useEffect(() => {
    // Initialize inventory from products
    const inventoryData: InventoryItem[] = products.map((product) => ({
      product,
      lastUpdated: new Date().toISOString(),
      status: product.inStock ? (product.stockCount < 10 ? "low-stock" : "in-stock") : "out-of-stock",
    }))
    setInventory(inventoryData)
  }, [])

  useEffect(() => {
    let filtered = inventory

    // Filter by search
    if (searchQuery) {
      filtered = filtered.filter(
        (item) =>
          item.product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.product.id.includes(searchQuery) ||
          item.product.brand.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Filter by status
    if (filterStatus !== "all") {
      filtered = filtered.filter((item) => item.status === filterStatus)
    }

    setFilteredInventory(filtered)
  }, [inventory, searchQuery, filterStatus])

  const handleUpdateStock = (productId: string) => {
    const newStock = Number.parseInt(editStock) || 0
    setInventory((prev) =>
      prev.map((item) => {
        if (item.product.id === productId) {
          const updatedProduct = {
            ...item.product,
            stockCount: newStock,
            inStock: newStock > 0,
          }
          return {
            ...item,
            product: updatedProduct,
            status: newStock === 0 ? "out-of-stock" : newStock < 10 ? "low-stock" : "in-stock",
            lastUpdated: new Date().toISOString(),
          }
        }
        return item
      }),
    )
    setEditingProduct(null)
    setEditStock("")
  }

  const handleUpdatePrice = (productId: string) => {
    const newPrice = Number.parseFloat(editPrice) || 0
    setInventory((prev) =>
      prev.map((item) => {
        if (item.product.id === productId) {
          return {
            ...item,
            product: {
              ...item.product,
              price: newPrice,
            },
            lastUpdated: new Date().toISOString(),
          }
        }
        return item
      }),
    )
    setEditingProduct(null)
    setEditPrice("")
  }

  // Calculate statistics
  const totalProducts = inventory.length
  const totalValue = inventory.reduce((sum, item) => sum + item.product.price * item.product.stockCount, 0)
  const lowStockCount = inventory.filter((item) => item.status === "low-stock").length
  const outOfStockCount = inventory.filter((item) => item.status === "out-of-stock").length

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-4">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            <h1 className="text-3xl font-bold text-foreground mb-2">Inventory Management</h1>
            <p className="text-muted-foreground">Track and manage product stock levels and pricing</p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="p-6 border-0 bg-card shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Products</p>
                  <p className="text-2xl font-bold text-foreground">{totalProducts}</p>
                </div>
                <Package className="h-8 w-8 text-primary opacity-20" />
              </div>
            </Card>

            <Card className="p-6 border-0 bg-card shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Inventory Value</p>
                  <p className="text-2xl font-bold text-foreground">₹{(totalValue / 100000).toFixed(2)}L</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-500 opacity-20" />
              </div>
            </Card>

            <Card className="p-6 border-0 bg-card shadow-sm border-l-4 border-l-yellow-500">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Low Stock</p>
                  <p className="text-2xl font-bold text-yellow-600">{lowStockCount}</p>
                </div>
                <AlertCircle className="h-8 w-8 text-yellow-500 opacity-20" />
              </div>
            </Card>

            <Card className="p-6 border-0 bg-card shadow-sm border-l-4 border-l-red-500">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Out of Stock</p>
                  <p className="text-2xl font-bold text-red-600">{outOfStockCount}</p>
                </div>
                <TrendingDown className="h-8 w-8 text-red-500 opacity-20" />
              </div>
            </Card>
          </div>

          <Separator className="my-8" />

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Input
              placeholder="Search by product name, ID, or brand..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-background"
            />

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as "all" | "low-stock" | "out-of-stock")}
              className="px-4 py-2 rounded-lg border border-border bg-background text-foreground"
            >
              <option value="all">All Status</option>
              <option value="in-stock">In Stock</option>
              <option value="low-stock">Low Stock</option>
              <option value="out-of-stock">Out of Stock</option>
            </select>

            <Button className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add New Product
            </Button>
          </div>

          {/* Inventory Table */}
          <Card className="border-0 bg-card shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/30">
                    <th className="px-6 py-3 text-left text-sm font-semibold">Product</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Brand</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Stock</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Price</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Value</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInventory.map((item) => (
                    <tr key={item.product.id} className="border-b hover:bg-muted/20 transition">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-foreground line-clamp-2">{item.product.name}</div>
                        <div className="text-xs text-muted-foreground">ID: {item.product.id}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-foreground">{item.product.brand}</td>
                      <td className="px-6 py-4">
                        {editingProduct === `stock-${item.product.id}` ? (
                          <div className="flex gap-2">
                            <Input
                              type="number"
                              value={editStock}
                              onChange={(e) => setEditStock(e.target.value)}
                              className="w-20 bg-background"
                              min="0"
                            />
                            <Button size="sm" onClick={() => handleUpdateStock(item.product.id)} className="h-8">
                              Save
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setEditingProduct(null)}
                              className="h-8 bg-transparent"
                            >
                              Cancel
                            </Button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{item.product.stockCount}</span>
                            <button
                              onClick={() => {
                                setEditingProduct(`stock-${item.product.id}`)
                                setEditStock(item.product.stockCount.toString())
                              }}
                              className="text-primary hover:text-primary/80 transition"
                            >
                              <Edit2 className="h-4 w-4" />
                            </button>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {editingProduct === `price-${item.product.id}` ? (
                          <div className="flex gap-2">
                            <Input
                              type="number"
                              value={editPrice}
                              onChange={(e) => setEditPrice(e.target.value)}
                              className="w-24 bg-background"
                              step="0.01"
                              min="0"
                            />
                            <Button size="sm" onClick={() => handleUpdatePrice(item.product.id)} className="h-8">
                              Save
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setEditingProduct(null)}
                              className="h-8 bg-transparent"
                            >
                              Cancel
                            </Button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">₹{item.product.price.toFixed(2)}</span>
                            <button
                              onClick={() => {
                                setEditingProduct(`price-${item.product.id}`)
                                setEditPrice(item.product.price.toString())
                              }}
                              className="text-primary hover:text-primary/80 transition"
                            >
                              <Edit2 className="h-4 w-4" />
                            </button>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-foreground">
                        ₹{(item.product.price * item.product.stockCount).toFixed(2)}
                      </td>
                      <td className="px-6 py-4">
                        <Badge
                          variant="secondary"
                          className={
                            item.status === "in-stock"
                              ? "bg-green-100 text-green-700"
                              : item.status === "low-stock"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                          }
                        >
                          {item.status === "in-stock"
                            ? "In Stock"
                            : item.status === "low-stock"
                              ? "Low Stock"
                              : "Out of Stock"}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button className="text-primary hover:text-primary/80 transition">
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-700 transition">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredInventory.length === 0 && (
              <div className="p-12 text-center">
                <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No products found matching your filters.</p>
              </div>
            )}
          </Card>

          {/* Notes */}
          <Card className="mt-8 p-6 border-0 bg-blue-50 dark:bg-blue-950 border-l-4 border-l-blue-500">
            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Inventory Management Tips</h3>
            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1 list-disc list-inside">
              <li>Products with less than 10 units are marked as "Low Stock"</li>
              <li>Products with 0 units are automatically marked as "Out of Stock"</li>
              <li>Click the edit icon to quickly update stock levels or prices</li>
              <li>Monitor inventory value to optimize working capital</li>
            </ul>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default AdminInventory

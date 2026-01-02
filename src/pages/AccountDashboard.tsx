"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { User, Package, MapPin, Heart, Star, LogOut, Edit2, Trash2, Plus, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/contexts/AuthContext"
import { useUser } from "@/contexts/UserContext"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

interface SavedAddress {
  id: string
  label: string
  firstName: string
  lastName: string
  address: string
  city: string
  state: string
  pincode: string
  phone: string
  isDefault: boolean
}

interface UserReview {
  id: string
  productId: string
  productName: string
  rating: number
  title: string
  comment: string
  createdAt: string
}

const AccountDashboard: React.FC = () => {
  const navigate = useNavigate()
  const { user, signOut } = useAuth()
  const { userWishlist } = useUser()

  const [activeTab, setActiveTab] = useState<"profile" | "orders" | "addresses" | "wishlist" | "reviews">("profile")
  const [editingProfile, setEditingProfile] = useState(false)
  const [profileData, setProfileData] = useState({
    firstName: user?.name.split(" ")[0] || "",
    lastName: user?.name.split(" ").slice(1).join(" ") || "",
    email: user?.email || "",
    phone: "",
  })

  const [orders, setOrders] = useState<any[]>([])
  const [addresses, setAddresses] = useState<SavedAddress[]>([])
  const [reviews, setReviews] = useState<UserReview[]>([])
  const [newAddress, setNewAddress] = useState<Partial<SavedAddress>>({})
  const [showAddressForm, setShowAddressForm] = useState(false)

  // Load data from localStorage
  useEffect(() => {
    if (!user) {
      navigate("/auth")
      return
    }

    // Load orders
    const allOrders = JSON.parse(localStorage.getItem("orders") || "[]")
    setOrders(allOrders.reverse())

    // Load addresses
    const savedAddresses = JSON.parse(localStorage.getItem(`addresses_${user.id}`) || "[]")
    setAddresses(savedAddresses)

    // Load reviews
    const allReviews = JSON.parse(localStorage.getItem("reviews") || "[]")
    const userReviews = allReviews.filter((r: any) => r.userId === user.id)
    setReviews(userReviews)
  }, [user, navigate])

  const handleSaveProfile = () => {
    setEditingProfile(false)
    // In a real app, this would update the user in context/API
  }

  const handleAddAddress = () => {
    if (!newAddress.firstName || !newAddress.address || !newAddress.city || !newAddress.pincode) {
      alert("Please fill all required fields")
      return
    }

    const addressToSave: SavedAddress = {
      id: `addr_${Date.now()}`,
      label: newAddress.label || "Home",
      firstName: newAddress.firstName || "",
      lastName: newAddress.lastName || "",
      address: newAddress.address || "",
      city: newAddress.city || "",
      state: newAddress.state || "",
      pincode: newAddress.pincode || "",
      phone: newAddress.phone || "",
      isDefault: addresses.length === 0,
    }

    const updated = [...addresses, addressToSave]
    setAddresses(updated)
    localStorage.setItem(`addresses_${user?.id}`, JSON.stringify(updated))
    setNewAddress({})
    setShowAddressForm(false)
  }

  const handleDeleteAddress = (id: string) => {
    const updated = addresses.filter((a) => a.id !== id)
    setAddresses(updated)
    localStorage.setItem(`addresses_${user?.id}`, JSON.stringify(updated))
  }

  const handleSignOut = () => {
    if (confirm("Are you sure you want to sign out?")) {
      signOut()
      navigate("/")
    }
  }

  if (!user) {
    return null
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-foreground mb-8">My Account</h1>

          <div className="grid gap-6 lg:grid-cols-4">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="p-6 border-0 bg-card shadow-sm">
                {/* User Info */}
                <div className="text-center mb-6">
                  <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                    <User className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="text-lg font-bold text-foreground">{user.name}</h2>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>

                <Separator className="my-6" />

                {/* Navigation */}
                <div className="space-y-2">
                  <button
                    onClick={() => setActiveTab("profile")}
                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition ${
                      activeTab === "profile"
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground hover:bg-secondary"
                    }`}
                  >
                    <User className="h-5 w-5" />
                    <span className="font-medium">Profile</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("orders")}
                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition ${
                      activeTab === "orders"
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground hover:bg-secondary"
                    }`}
                  >
                    <Package className="h-5 w-5" />
                    <span className="font-medium">Orders</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("addresses")}
                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition ${
                      activeTab === "addresses"
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground hover:bg-secondary"
                    }`}
                  >
                    <MapPin className="h-5 w-5" />
                    <span className="font-medium">Addresses</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("wishlist")}
                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition ${
                      activeTab === "wishlist"
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground hover:bg-secondary"
                    }`}
                  >
                    <Heart className="h-5 w-5" />
                    <span className="font-medium">Wishlist</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("reviews")}
                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition ${
                      activeTab === "reviews"
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground hover:bg-secondary"
                    }`}
                  >
                    <Star className="h-5 w-5" />
                    <span className="font-medium">Reviews</span>
                  </button>
                </div>

                <Separator className="my-6" />

                {/* Sign Out */}
                <Button
                  variant="outline"
                  onClick={handleSignOut}
                  className="w-full bg-red-50 dark:bg-red-950 border-red-200 text-red-600 hover:bg-red-100"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </Card>
            </div>

            {/* Content Area */}
            <div className="lg:col-span-3 space-y-6">
              {/* Profile Tab */}
              {activeTab === "profile" && (
                <Card className="p-6 border-0 bg-card shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-foreground">Profile Information</h2>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingProfile(!editingProfile)}
                      className="bg-transparent"
                    >
                      <Edit2 className="h-4 w-4 mr-2" />
                      {editingProfile ? "Cancel" : "Edit"}
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">First Name</label>
                        <Input
                          value={profileData.firstName}
                          onChange={(e) =>
                            setProfileData((prev) => ({
                              ...prev,
                              firstName: e.target.value,
                            }))
                          }
                          disabled={!editingProfile}
                          className="bg-background"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Last Name</label>
                        <Input
                          value={profileData.lastName}
                          onChange={(e) =>
                            setProfileData((prev) => ({
                              ...prev,
                              lastName: e.target.value,
                            }))
                          }
                          disabled={!editingProfile}
                          className="bg-background"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                      <Input type="email" value={profileData.email} disabled className="bg-secondary" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
                      <Input
                        value={profileData.phone}
                        onChange={(e) =>
                          setProfileData((prev) => ({
                            ...prev,
                            phone: e.target.value,
                          }))
                        }
                        disabled={!editingProfile}
                        className="bg-background"
                      />
                    </div>

                    {editingProfile && (
                      <Button onClick={handleSaveProfile} className="w-full">
                        Save Changes
                      </Button>
                    )}
                  </div>
                </Card>
              )}

              {/* Orders Tab */}
              {activeTab === "orders" && (
                <div className="space-y-4">
                  {orders.length === 0 ? (
                    <Card className="p-12 border-0 bg-card shadow-sm text-center">
                      <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-foreground mb-2">No Orders Yet</h3>
                      <p className="text-muted-foreground mb-4">Start shopping to place your first order!</p>
                      <Button onClick={() => navigate("/")}>Continue Shopping</Button>
                    </Card>
                  ) : (
                    orders.map((order) => (
                      <Card key={order.id} className="p-6 border-0 bg-card shadow-sm hover:shadow-md transition">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="font-semibold text-foreground">{order.id}</h3>
                            <p className="text-sm text-muted-foreground">
                              {new Date(order.createdAt).toLocaleDateString("en-IN", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-primary text-lg">₹{order.orderSummary.total.toFixed(2)}</p>
                            <p className="text-sm font-medium text-green-600">
                              {order.status === "confirmed" ? "Confirmed" : "Delivered"}
                            </p>
                          </div>
                        </div>

                        <Separator className="my-4" />

                        <div className="text-sm">
                          <p className="text-muted-foreground">
                            <span className="font-medium text-foreground">{order.items.length}</span> item
                            {order.items.length !== 1 ? "s" : ""}
                          </p>
                          <p className="text-muted-foreground mt-1">
                            Delivery to: {order.shippingAddress.city}, {order.shippingAddress.state}
                          </p>
                        </div>

                        <Button
                          variant="outline"
                          className="w-full mt-4 bg-transparent"
                          onClick={() => navigate(`/order-confirmation/${order.id}`)}
                        >
                          View Details
                          <ChevronRight className="h-4 w-4 ml-2" />
                        </Button>
                      </Card>
                    ))
                  )}
                </div>
              )}

              {/* Addresses Tab */}
              {activeTab === "addresses" && (
                <div className="space-y-4">
                  {/* Add Address Button */}
                  {!showAddressForm && (
                    <Button onClick={() => setShowAddressForm(true)} className="w-full" size="lg">
                      <Plus className="h-5 w-5 mr-2" />
                      Add New Address
                    </Button>
                  )}

                  {/* Add Address Form */}
                  {showAddressForm && (
                    <Card className="p-6 border-0 bg-card shadow-sm">
                      <h3 className="font-bold text-foreground mb-4">Add New Address</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Address Label (Home, Office, etc.)
                          </label>
                          <Input
                            placeholder="Home"
                            value={newAddress.label || ""}
                            onChange={(e) =>
                              setNewAddress((prev) => ({
                                ...prev,
                                label: e.target.value,
                              }))
                            }
                            className="bg-background"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">First Name</label>
                            <Input
                              placeholder="John"
                              value={newAddress.firstName || ""}
                              onChange={(e) =>
                                setNewAddress((prev) => ({
                                  ...prev,
                                  firstName: e.target.value,
                                }))
                              }
                              className="bg-background"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">Last Name</label>
                            <Input
                              placeholder="Doe"
                              value={newAddress.lastName || ""}
                              onChange={(e) =>
                                setNewAddress((prev) => ({
                                  ...prev,
                                  lastName: e.target.value,
                                }))
                              }
                              className="bg-background"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Address</label>
                          <Input
                            placeholder="123 Main Street"
                            value={newAddress.address || ""}
                            onChange={(e) =>
                              setNewAddress((prev) => ({
                                ...prev,
                                address: e.target.value,
                              }))
                            }
                            className="bg-background"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">City</label>
                            <Input
                              placeholder="Mumbai"
                              value={newAddress.city || ""}
                              onChange={(e) =>
                                setNewAddress((prev) => ({
                                  ...prev,
                                  city: e.target.value,
                                }))
                              }
                              className="bg-background"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">State</label>
                            <Input
                              placeholder="Maharashtra"
                              value={newAddress.state || ""}
                              onChange={(e) =>
                                setNewAddress((prev) => ({
                                  ...prev,
                                  state: e.target.value,
                                }))
                              }
                              className="bg-background"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">PIN Code</label>
                            <Input
                              placeholder="400001"
                              value={newAddress.pincode || ""}
                              onChange={(e) =>
                                setNewAddress((prev) => ({
                                  ...prev,
                                  pincode: e.target.value,
                                }))
                              }
                              className="bg-background"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                            <Input
                              placeholder="+91 9876543210"
                              value={newAddress.phone || ""}
                              onChange={(e) =>
                                setNewAddress((prev) => ({
                                  ...prev,
                                  phone: e.target.value,
                                }))
                              }
                              className="bg-background"
                            />
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <Button onClick={handleAddAddress} className="flex-1">
                            Save Address
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => {
                              setShowAddressForm(false)
                              setNewAddress({})
                            }}
                            className="flex-1 bg-transparent"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </Card>
                  )}

                  {/* Saved Addresses */}
                  {addresses.map((address) => (
                    <Card key={address.id} className="p-6 border-0 bg-card shadow-sm">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-foreground">
                            {address.label}
                            {address.isDefault && (
                              <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                                Default
                              </span>
                            )}
                          </h3>
                        </div>
                        <button
                          onClick={() => handleDeleteAddress(address.id)}
                          className="text-red-600 hover:text-red-700 transition"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>

                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>
                          {address.firstName} {address.lastName}
                        </p>
                        <p>{address.address}</p>
                        <p>
                          {address.city}, {address.state} {address.pincode}
                        </p>
                        <p>{address.phone}</p>
                      </div>
                    </Card>
                  ))}

                  {addresses.length === 0 && !showAddressForm && (
                    <Card className="p-12 border-0 bg-card shadow-sm text-center">
                      <MapPin className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-foreground mb-2">No Saved Addresses</h3>
                      <p className="text-muted-foreground">Save your addresses for faster checkout!</p>
                    </Card>
                  )}
                </div>
              )}

              {/* Wishlist Tab */}
              {activeTab === "wishlist" && (
                <div>
                  {userWishlist.length === 0 ? (
                    <Card className="p-12 border-0 bg-card shadow-sm text-center">
                      <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-foreground mb-2">Your Wishlist is Empty</h3>
                      <p className="text-muted-foreground mb-4">Save your favorite products to view them later!</p>
                      <Button onClick={() => navigate("/")}>Start Shopping</Button>
                    </Card>
                  ) : (
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                      {userWishlist.map((product) => (
                        <Card
                          key={product.id}
                          className="p-4 border-0 bg-card shadow-sm hover:shadow-md transition cursor-pointer"
                          onClick={() => navigate(`/product/${product.id}`)}
                        >
                          <img
                            src={product.images[0] || "/placeholder.svg"}
                            alt={product.name}
                            className="h-32 w-full rounded object-cover mb-3"
                          />
                          <h3 className="font-semibold text-foreground text-sm line-clamp-2 mb-2">{product.name}</h3>
                          <p className="text-primary font-bold">₹{product.price.toFixed(2)}</p>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Reviews Tab */}
              {activeTab === "reviews" && (
                <div className="space-y-4">
                  {reviews.length === 0 ? (
                    <Card className="p-12 border-0 bg-card shadow-sm text-center">
                      <Star className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-foreground mb-2">No Reviews Yet</h3>
                      <p className="text-muted-foreground mb-4">Share your experience by reviewing products!</p>
                      <Button onClick={() => navigate("/")}>Browse Products</Button>
                    </Card>
                  ) : (
                    reviews.map((review) => (
                      <Card key={review.id} className="p-6 border-0 bg-card shadow-sm">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-foreground">{review.productName}</h3>
                            <p className="text-sm text-muted-foreground">
                              {new Date(review.createdAt).toLocaleDateString("en-IN")}
                            </p>
                          </div>
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                                }`}
                              />
                            ))}
                          </div>
                        </div>

                        <h4 className="font-medium text-foreground mb-2">{review.title}</h4>
                        <p className="text-sm text-muted-foreground">{review.comment}</p>
                      </Card>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default AccountDashboard

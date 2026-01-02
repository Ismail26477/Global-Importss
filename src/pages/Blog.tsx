"use client"

import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { User, ArrowRight } from "lucide-react"

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Complete Guide to Selecting the Right Plywood for Your Project",
      excerpt: "Learn how to choose the perfect plywood grade, thickness, and finish for your woodworking projects.",
      author: "Raj Kumar",
      date: "Jan 15, 2026",
      readTime: "8 min read",
      category: "Guides",
      image: "/plywood-selection-guide.jpg",
    },
    {
      id: 2,
      title: "Top 10 Hardware Tools Every DIY Enthusiast Should Own",
      excerpt: "Discover the essential hardware tools that will make your DIY projects easier and more professional.",
      author: "Priya Singh",
      date: "Jan 10, 2026",
      readTime: "6 min read",
      category: "DIY",
      image: "/hardware-tools-collection.jpg",
    },
    {
      id: 3,
      title: "Sustainable Building Materials: The Future of Construction",
      excerpt:
        "Explore eco-friendly plywood options and sustainable hardware solutions for environmentally conscious builders.",
      author: "Arjun Patel",
      date: "Jan 5, 2026",
      readTime: "10 min read",
      category: "Industry News",
      image: "/sustainable-building-materials.jpg",
    },
    {
      id: 4,
      title: "Budget-Friendly Home Renovation Ideas with Quality Materials",
      excerpt: "Transform your home without breaking the bank using cost-effective materials from Global Imports.",
      author: "Neha Sharma",
      date: "Dec 28, 2025",
      readTime: "7 min read",
      category: "DIY",
      image: "/home-renovation-interior.png",
    },
    {
      id: 5,
      title: "Understanding Plywood Grades: A Comprehensive Breakdown",
      excerpt:
        "Get an in-depth understanding of plywood grades, veneer quality, and how to pick the right one for your needs.",
      author: "Vikram Das",
      date: "Dec 20, 2025",
      readTime: "9 min read",
      category: "Guides",
      image: "/plywood-grades-comparison.jpg",
    },
    {
      id: 6,
      title: "Professional Tips for Installing Hardware Like an Expert",
      excerpt: "Master the art of hardware installation with tips from professional contractors and builders.",
      author: "Anjali Verma",
      date: "Dec 15, 2025",
      readTime: "6 min read",
      category: "Guides",
      image: "/hardware-installation-workshop.jpg",
    },
    {
      id: 7,
      title: "Latest Industry Trends in Construction Materials",
      excerpt: "Stay updated with the newest trends and innovations in building materials and hardware industry.",
      author: "Rohan Gupta",
      date: "Dec 10, 2025",
      readTime: "5 min read",
      category: "Industry News",
      image: "/construction-trends-2026.jpg",
    },
    {
      id: 8,
      title: "How to Maintain and Care for Your Wood Furniture",
      excerpt: "Essential tips for maintaining wooden furniture and preserving the quality of plywood-based items.",
      author: "Divya Mishra",
      date: "Dec 5, 2025",
      readTime: "5 min read",
      category: "DIY",
      image: "/wood-furniture-maintenance.jpg",
    },
  ]

  const categories = ["All", "Guides", "DIY", "Industry News"]
  const [selectedCategory, setSelectedCategory] = React.useState("All")

  const filteredPosts =
    selectedCategory === "All" ? blogPosts : blogPosts.filter((post) => post.category === selectedCategory)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Blog Header */}
        <section className="bg-gradient-to-r from-primary/10 to-primary/5 border-b">
          <div className="container mx-auto px-4 py-12 md:py-16">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Global Imports Blog</h1>
            <p className="text-lg text-foreground/70 max-w-2xl">
              Expert insights, DIY guides, and industry news for all your building and hardware needs.
            </p>
          </div>
        </section>

        {/* Category Filter */}
        <section className="container mx-auto px-4 py-8">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <Link key={post.id} to={`/blog/${post.id}`}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer overflow-hidden">
                  <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-48 object-cover" />
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                      <span className="text-xs text-muted-foreground">{post.readTime}</span>
                    </div>
                    <CardTitle className="text-xl line-clamp-2">{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4 line-clamp-2">{post.excerpt}</CardDescription>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          <span>{post.author}</span>
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="bg-primary/5 border-t border-b my-12">
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
              <p className="text-foreground/70 mb-6">
                Get the latest articles, tips, and exclusive offers delivered to your inbox.
              </p>
              <div className="flex gap-2 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 rounded-md border border-input bg-background"
                />
                <Button>Subscribe</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

import React from "react"
export default Blog

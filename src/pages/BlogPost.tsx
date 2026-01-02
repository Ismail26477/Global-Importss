"use client"

import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { useParams, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Calendar, User, ChevronLeft, Share2, ThumbsUp } from "lucide-react"

const BlogPost = () => {
  const { id } = useParams()
  const [liked, setLiked] = React.useState(false)

  const blogPosts: Record<
    number,
    {
      id: number
      title: string
      author: string
      date: string
      readTime: string
      category: string
      image: string
      content: string
      excerpt: string
    }
  > = {
    1: {
      id: 1,
      title: "Complete Guide to Selecting the Right Plywood for Your Project",
      author: "Raj Kumar",
      date: "Jan 15, 2026",
      readTime: "8 min read",
      category: "Guides",
      image: "/plywood-selection-guide.jpg",
      excerpt: "Learn how to choose the perfect plywood grade, thickness, and finish for your woodworking projects.",
      content: `
        <h2>Introduction</h2>
        <p>Choosing the right plywood is crucial for the success of any woodworking or construction project. With so many options available, it can be overwhelming to decide which plywood best suits your needs. This comprehensive guide will help you understand the different types of plywood and make an informed decision.</p>
        
        <h2>Understanding Plywood Grades</h2>
        <p>Plywood is graded based on the quality of its veneer surfaces. The grades range from A to D, with A being the highest quality. Here's what each grade means:</p>
        <ul>
          <li><strong>Grade A:</strong> Smooth and sanded with no knots or defects</li>
          <li><strong>Grade B:</strong> Minor defects allowed, suitable for most projects</li>
          <li><strong>Grade C:</strong> More noticeable defects, good for structural work</li>
          <li><strong>Grade D:</strong> Lowest quality, typically used for backing</li>
        </ul>
        
        <h2>Thickness Matters</h2>
        <p>Plywood comes in various thicknesses, typically ranging from 1/4 inch to 3/4 inch. The thickness you choose depends on your project's requirements and the support structure available. Thicker plywood is stronger but more expensive.</p>
        
        <h2>Choosing the Right Finish</h2>
        <p>You can choose between veneer finish, laminate finish, or paint-ready finish. Each has its advantages depending on your intended use and aesthetic preferences.</p>
        
        <h2>Conclusion</h2>
        <p>By understanding these key factors, you'll be able to select the perfect plywood for your project. Remember to always consider your specific needs and budget when making your decision.</p>
      `,
    },
    2: {
      id: 2,
      title: "Top 10 Hardware Tools Every DIY Enthusiast Should Own",
      author: "Priya Singh",
      date: "Jan 10, 2026",
      readTime: "6 min read",
      category: "DIY",
      image: "/hardware-tools-collection.jpg",
      excerpt: "Discover the essential hardware tools that will make your DIY projects easier and more professional.",
      content: `
        <h2>Building Your Tool Collection</h2>
        <p>Every DIY enthusiast needs a basic set of tools to tackle various projects around the home. Here are the 10 most essential tools you should have in your toolkit.</p>
        
        <h2>Essential Tools</h2>
        <ol>
          <li><strong>Hammer:</strong> A versatile tool for driving and removing nails</li>
          <li><strong>Drill:</strong> Essential for drilling holes and driving screws</li>
          <li><strong>Saw:</strong> Necessary for cutting wood and other materials</li>
          <li><strong>Measuring Tape:</strong> Ensures accurate measurements for your projects</li>
          <li><strong>Level:</strong> Helps ensure everything is perfectly level</li>
          <li><strong>Screwdriver Set:</strong> Various types for different screw heads</li>
          <li><strong>Wrench Set:</strong> For tightening bolts and nuts</li>
          <li><strong>Pliers:</strong> For gripping and bending wire</li>
          <li><strong>Square:</strong> Essential for checking right angles</li>
          <li><strong>Tool Bag:</strong> Keeps everything organized and portable</li>
        </ol>
        
        <h2>Investing in Quality</h2>
        <p>While it might be tempting to buy the cheapest tools, investing in quality tools will save you money in the long run and make your projects more enjoyable.</p>
      `,
    },
  }

  const post = blogPosts[Number(id) as number]

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-12">
          <p>Blog post not found.</p>
          <Link to="/blog">
            <Button className="mt-4">Back to Blog</Button>
          </Link>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Back Button */}
        <div className="container mx-auto px-4 py-6">
          <Link to="/blog" className="flex items-center gap-2 text-primary hover:underline">
            <ChevronLeft className="h-4 w-4" />
            Back to Blog
          </Link>
        </div>

        {/* Hero Image */}
        <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-80 object-cover" />

        {/* Article Content */}
        <article className="container mx-auto px-4 py-12 max-w-3xl">
          {/* Meta Info */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4 flex-wrap">
              <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                {post.category}
              </span>
              <span className="text-sm text-muted-foreground">{post.readTime}</span>
            </div>
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <div className="flex items-center gap-6 text-muted-foreground border-b pb-6">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{post.date}</span>
              </div>
            </div>
          </div>

          {/* Article Body */}
          <div className="prose prose-sm md:prose-base max-w-none mb-8">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 py-8 border-t border-b">
            <Button
              variant={liked ? "default" : "outline"}
              size="sm"
              onClick={() => setLiked(!liked)}
              className="gap-2"
            >
              <ThumbsUp className="h-4 w-4" />
              {liked ? "Liked" : "Like"}
            </Button>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </div>

          {/* Author Card */}
          <Card className="p-6 mt-12">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-lg">{post.author}</h3>
                <p className="text-sm text-muted-foreground">Expert contributor at Global Imports</p>
              </div>
            </div>
          </Card>
        </article>

        {/* Related Articles */}
        <section className="bg-muted/50 py-12 mt-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <img
                    src={`/open-book-knowledge.png?height=200&width=400&query=article ${i}`}
                    alt="Related article"
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-bold text-sm mb-2 line-clamp-2">Related Article Title {i}</h3>
                    <Link to="/blog" className="text-primary text-sm">
                      Read More →
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

import React from "react"
export default BlogPost

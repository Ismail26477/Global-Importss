import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Rajesh Kumar",
      role: "Home Builder, Delhi",
      image: "/professional-man.jpg",
      rating: 5,
      text: "Global Imports has been my go-to supplier for high-quality plywood and hardware. Their products are consistently excellent, and their customer service is outstanding. Highly recommended!",
    },
    {
      id: 2,
      name: "Priya Sharma",
      role: "Interior Designer, Mumbai",
      image: "/professional-woman-diverse.png",
      rating: 5,
      text: "The variety and quality of materials available at Global Imports is impressive. I've recommended them to all my clients. Fast delivery and competitive prices make them the best choice.",
    },
    {
      id: 3,
      name: "Arjun Patel",
      role: "Contractor, Bangalore",
      image: "/contractor-professional.jpg",
      rating: 5,
      text: "Working with Global Imports for the past 3 years has been a pleasure. Their products are reliable, and they always deliver on time. Great support team too!",
    },
    {
      id: 4,
      name: "Anjali Verma",
      role: "Furniture Maker, Pune",
      image: "/artisan-craftsperson.jpg",
      rating: 5,
      text: "The quality of plywood from Global Imports is exceptional. It makes my work easier and the final products look fantastic. I couldn't ask for a better supplier.",
    },
    {
      id: 5,
      name: "Vikram Singh",
      role: "DIY Enthusiast, Hyderabad",
      image: "/diy-enthusiast.jpg",
      rating: 5,
      text: "As a DIY enthusiast, I've tried many suppliers, but Global Imports stands out. Their products are of excellent quality, and the prices are reasonable. Perfect for all my projects!",
    },
    {
      id: 6,
      name: "Divya Mishra",
      role: "Construction Manager, Chennai",
      image: "/business-woman-manager.jpg",
      rating: 5,
      text: "Global Imports is reliable and professional. Their hardware and plywood products have never disappointed. I recommend them to all construction professionals I know.",
    },
  ]

  const stats = [
    { label: "Happy Customers", value: "10,000+" },
    { label: "Years in Business", value: "15+" },
    { label: "Quality Products", value: "500+" },
    { label: "Average Rating", value: "4.9/5" },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Header Section */}
        <section className="bg-gradient-to-r from-primary/10 to-primary/5 border-b">
          <div className="container mx-auto px-4 py-12 md:py-16">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Customer Testimonials</h1>
            <p className="text-lg text-foreground/70 max-w-2xl">
              Don't just take our word for it. Read what our satisfied customers have to say about Global Imports.
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm md:text-base text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials Grid */}
        <section className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  {/* Star Rating */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  {/* Quote Icon */}
                  <Quote className="h-8 w-8 text-primary/30 mb-3" />

                  {/* Testimonial Text */}
                  <p className="text-foreground/80 mb-6 leading-relaxed italic">{testimonial.text}</p>

                  {/* Author Info */}
                  <div className="flex items-center gap-4 pt-6 border-t">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary text-primary-foreground py-12 mt-12">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Join Thousands of Satisfied Customers</h2>
            <p className="text-lg mb-8 opacity-90">
              Experience the quality and service that our customers love. Shop with Global Imports today.
            </p>
            <button className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all">
              Shop Now
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default Testimonials

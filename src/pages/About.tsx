import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Award, Users, Globe } from "lucide-react"

const About = () => {
  const values = [
    {
      icon: Award,
      title: "Quality",
      description: "We source only the finest materials and products for our customers.",
    },
    {
      icon: Users,
      title: "Customer First",
      description: "Your satisfaction is our top priority. We're here to serve you.",
    },
    {
      icon: Globe,
      title: "Reliability",
      description: "Consistent delivery, fair prices, and honest business practices.",
    },
    {
      icon: CheckCircle,
      title: "Innovation",
      description: "Always staying ahead with the latest products and services.",
    },
  ]

  const team = [
    {
      name: "Amit Singh",
      role: "Founder & CEO",
      image: "/business-leader.jpg",
    },
    {
      name: "Neha Sharma",
      role: "Operations Director",
      image: "/operations-manager-meeting.png",
    },
    {
      name: "Rohan Gupta",
      role: "Sales Manager",
      image: "/sales-professional.png",
    },
    {
      name: "Priya Verma",
      role: "Customer Service Lead",
      image: "/customer-service-interaction.png",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary/10 to-primary/5 border-b">
          <div className="container mx-auto px-4 py-12 md:py-16">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">About Global Imports</h1>
            <p className="text-lg text-foreground/70 max-w-2xl">
              Your trusted partner for quality building materials and hardware solutions since 2011.
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Story</h2>
              <p className="text-foreground/70 mb-4 leading-relaxed">
                Global Imports was founded in 2011 with a simple mission: to provide high-quality building materials and
                hardware at competitive prices. What started as a small operation has grown into a trusted supplier
                serving thousands of customers across India.
              </p>
              <p className="text-foreground/70 mb-4 leading-relaxed">
                Over the years, we've built strong relationships with leading manufacturers and suppliers worldwide,
                ensuring that our customers always get the best products available. Our commitment to quality,
                reliability, and exceptional customer service has made us the preferred choice for contractors,
                builders, and DIY enthusiasts.
              </p>
              <p className="text-foreground/70 leading-relaxed">
                Today, Global Imports continues to grow and innovate, always striving to meet the evolving needs of our
                customers and the industry.
              </p>
            </div>
            <img src="/warehouse-facility.jpg" alt="Our warehouse" className="rounded-lg w-full" />
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="bg-muted/50 py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/70 leading-relaxed">
                    To be the leading supplier of quality building materials and hardware, committed to customer
                    satisfaction, innovation, and sustainable practices.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Our Vision</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/70 leading-relaxed">
                    To create a world where quality building materials are accessible to everyone, supporting dreams and
                    building better communities.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Core Values</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <Card key={index} className="text-center">
                  <CardContent className="pt-6">
                    <Icon className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="font-bold text-lg mb-2">{value.title}</h3>
                    <p className="text-sm text-foreground/70">{value.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Team Section */}
        <section className="bg-muted/50 py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Meet Our Team</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {team.map((member, index) => (
                <Card key={index} className="text-center overflow-hidden">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-48 object-cover"
                  />
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-lg">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </CardContent>
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

export default About

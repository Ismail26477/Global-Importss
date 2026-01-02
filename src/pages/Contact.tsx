"use client"

import type React from "react"

import { useState } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, Send, MapPin, Phone, Mail, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

const Contact = () => {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      })
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary/10 to-primary/5 border-b">
          <div className="container mx-auto px-4 py-12">
            <Link
              to="/help"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground mb-4 hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Help
            </Link>
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-lg text-muted-foreground">We'd love to hear from you. Send us a message anytime.</p>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Contact Information */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <Phone className="h-6 w-6 text-primary mb-2" />
                    <CardTitle className="text-lg">Phone</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">Call us Monday-Friday</p>
                    <a href="tel:+918001001234" className="text-primary font-semibold hover:underline">
                      +91 800 100 1234
                    </a>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <Mail className="h-6 w-6 text-primary mb-2" />
                    <CardTitle className="text-lg">Email</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">Response within 24 hours</p>
                    <a href="mailto:support@globalimports.com" className="text-primary font-semibold hover:underline">
                      support@globalimports.com
                    </a>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <Clock className="h-6 w-6 text-primary mb-2" />
                    <CardTitle className="text-lg">Hours</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1 text-sm">
                      <p>
                        <span className="font-semibold">Mon-Fri:</span> 9:00 AM - 6:00 PM IST
                      </p>
                      <p>
                        <span className="font-semibold">Sat:</span> 10:00 AM - 4:00 PM IST
                      </p>
                      <p>
                        <span className="font-semibold">Sun:</span> Closed
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <MapPin className="h-6 w-6 text-primary mb-2" />
                    <CardTitle className="text-lg">Office</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Global Imports Headquarters
                      <br />
                      123 Business Park
                      <br />
                      New Delhi, India 110001
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Send us a Message</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-semibold text-foreground">Name *</label>
                          <Input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your name"
                            required
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-semibold text-foreground">Email *</label>
                          <Input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="your@email.com"
                            required
                            className="mt-1"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-semibold text-foreground">Phone</label>
                        <Input
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 XXXXX XXXXX"
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-semibold text-foreground">Subject *</label>
                        <Input
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="What is this about?"
                          required
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-semibold text-foreground">Message *</label>
                        <Textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Tell us more details about your inquiry..."
                          rows={6}
                          required
                          className="mt-1"
                        />
                      </div>

                      <Button type="submit" disabled={isSubmitting} className="w-full">
                        <Send className="h-4 w-4 mr-2" />
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Contact

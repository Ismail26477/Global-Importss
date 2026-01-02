"use client"

import type React from "react"

import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/contexts/AuthContext"
import { useToast } from "@/hooks/use-toast"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { Mail, Lock, User } from "lucide-react"

const Auth = () => {
  const [searchParams] = useSearchParams()
  const isSignUp = searchParams.get("mode") === "signup"
  const [mode, setMode] = useState<"signin" | "signup">(isSignUp ? "signup" : "signin")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { signUp, signIn } = useAuth()
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (mode === "signup") {
        if (!name.trim()) {
          toast({ title: "Error", description: "Please enter your name", variant: "destructive" })
          setIsLoading(false)
          return
        }
        await signUp(email, password, name)
        toast({ title: "Success", description: "Account created successfully!" })
      } else {
        await signIn(email, password)
        toast({ title: "Success", description: "Signed in successfully!" })
      }
      navigate("/")
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Authentication failed",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-background flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl">{mode === "signup" ? "Create Account" : "Sign In"}</CardTitle>
            <CardDescription>
              {mode === "signup"
                ? "Join Global Imports to save wishlists and reviews"
                : "Welcome back to Global Imports"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === "signup" && (
                <div>
                  <label className="text-sm font-medium mb-2 block">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={isLoading}
                      className="pl-10"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="text-sm font-medium mb-2 block">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full h-10" disabled={isLoading}>
                {isLoading ? "Loading..." : mode === "signup" ? "Create Account" : "Sign In"}
              </Button>
            </form>

            <div className="mt-4 pt-4 border-t text-center text-sm">
              {mode === "signup" ? (
                <>
                  Already have an account?{" "}
                  <button onClick={() => setMode("signin")} className="text-primary hover:underline font-medium">
                    Sign In
                  </button>
                </>
              ) : (
                <>
                  Don't have an account?{" "}
                  <button onClick={() => setMode("signup")} className="text-primary hover:underline font-medium">
                    Create one
                  </button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}

export default Auth

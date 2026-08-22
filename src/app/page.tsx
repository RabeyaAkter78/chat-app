"use client";

import React, { useState } from "react";
import { 
  MessageSquare, 
  User, 
  Phone, 
  ArrowRight, 
  Loader2, 
  CheckCircle2, 
  AlertCircle 
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Simple validation
    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }
    if (!phone.trim()) {
      setError("Please enter your phone number");
      return;
    }

    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    const cleanedPhone = phone.replace(/[\s()-]/g, "");
    if (cleanedPhone.length < 7 || cleanedPhone.length > 15) {
      setError("Please enter a valid phone number");
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSuccess(true);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 p-4 dark:bg-zinc-950 transition-colors duration-300">
      {/* Background patterns */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-zinc-950 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] opacity-70" />

      <div className="w-full max-w-md">
        {/* Brand Logo */}
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md shadow-primary/20 dark:shadow-none mb-3">
            <MessageSquare className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            ChatApp
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Connect with friends and family instantly
          </p>
        </div>

        {success ? (
          <Card className="border-zinc-200/80 dark:border-zinc-800 shadow-xl bg-white dark:bg-zinc-900/50 backdrop-blur-xs">
            <CardContent className="pt-8 pb-6 text-center flex flex-col items-center">
              <div className="rounded-full bg-emerald-50 dark:bg-emerald-950/30 p-3 text-emerald-600 dark:text-emerald-400 mb-4 animate-bounce">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <CardTitle className="text-xl font-semibold mb-2">Welcome, {name}!</CardTitle>
              <CardDescription className="text-center max-w-xs">
                You have successfully signed in with your phone number ({phone}). Setting up your chat room now...
              </CardDescription>
            </CardContent>
            <CardFooter className="flex justify-center pb-8">
              <Button onClick={() => setSuccess(false)} variant="outline" className="w-full sm:w-auto">
                Go back to login
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <Card className="border-zinc-200/80 dark:border-zinc-800 shadow-xl bg-white dark:bg-zinc-900/50 backdrop-blur-xs">
            <CardHeader className="space-y-1">
              <CardTitle className="text-xl font-semibold tracking-tight">Sign In / Register</CardTitle>
              <CardDescription>
                Enter your details below to start chatting
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                {error && (
                  <div className="flex items-center gap-2 rounded-lg bg-destructive/10 dark:bg-destructive/20 p-3 text-sm text-destructive border border-destructive/20 dark:border-destructive/30">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-zinc-400 dark:text-zinc-500" />
                    <Input
                      id="name"
                      placeholder="John Doe"
                      className="pl-9 bg-zinc-50/50 dark:bg-zinc-950/30 border-zinc-200 dark:border-zinc-800 focus:border-zinc-400 dark:focus:border-zinc-600 focus:ring-0"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-zinc-400 dark:text-zinc-500" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      className="pl-9 bg-zinc-50/50 dark:bg-zinc-950/30 border-zinc-200 dark:border-zinc-800 focus:border-zinc-400 dark:focus:border-zinc-600 focus:ring-0"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500">
                    Include country code, e.g. +1 for USA
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-3">
                <Button type="submit" className="w-full font-medium" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Continue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
            
              </CardFooter>
            </form>
          </Card>
        )}
      </div>
    </div>
  );
}

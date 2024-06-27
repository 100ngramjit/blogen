"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoaderButton } from "@/components/ui/loader-button";
import { Eye, EyeOff } from "lucide-react";

export default function SignInForm({ handleSubmit, isLoading }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="mx-auto flex max-w-md flex-col items-center justify-center px-4 py-12 m-2 rounded shadow-2xl shadow-black bg-white border-2 border-black">
        <div className="w-full space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Sign in to your account
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              <span>Don&apos;t have an account?</span>
              <Link
                href="/register"
                className="px-1 font-medium text-primary hover:underline"
                prefetch={false}
              >
                Register
              </Link>
            </p>
          </div>
          <form
            className="space-y-6"
            onSubmit={(e) => handleSubmit(e, email, password)}
          >
            <div>
              <Label htmlFor="email" className="my-2">
                Email address
              </Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="my-1">
                  Password
                </Label>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  placeholder="Enter your password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="pr-10"
                />
                <Button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                  variant="link"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </Button>
              </div>
            </div>
            <LoaderButton type="submit" isLoading={isLoading}>
              Sign in
            </LoaderButton>
          </form>
        </div>
      </div>
    </div>
  );
}

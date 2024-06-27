"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { LoaderButton } from "@/components/ui/loader-button";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

export default function RegisterForm({ handleSubmit, isLoading }: any) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="mx-auto flex max-w-md flex-col items-center justify-center px-4 py-12 m-2 rounded border-2	border-black shadow-2xl shadow-black">
        <div className="w-full space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Register for an account
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Already have an account?
              <Link
                href="/signin"
                className="px-1 font-medium text-primary hover:underline"
                prefetch={false}
              >
                Sign in
              </Link>
            </p>
          </div>
          <form
            className="space-y-6"
            onSubmit={(e) =>
              handleSubmit(e, email, password, confirmPassword, name)
            }
          >
            <div>
              <Label htmlFor="name" className="my-2">
                Name
              </Label>
              <Input
                id="name"
                type="text"
                autoComplete="name"
                required
                placeholder="Enter your name"
                value={name}
                onChange={handleNameChange}
              />
            </div>
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
                  autoComplete="new-password"
                  required
                  placeholder="Enter a password"
                  value={password}
                  onChange={handlePasswordChange}
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
            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="confirm-password" className="my-1">
                  Confirm Password
                </Label>
              </div>
              <div className="relative">
                <Input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
                <Button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                  variant="link"
                >
                  {showConfirmPassword ? <EyeOff /> : <Eye />}
                </Button>
              </div>
            </div>
            <LoaderButton type="submit" isLoading={isLoading}>
              Register
            </LoaderButton>
          </form>
        </div>
      </div>
    </div>
  );
}

"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoaderButton } from "@/components/ui/loader-button";
import { Eye, EyeOff, LogIn } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
    <div className="flex items-center justify-center min-h-screen ">
      <Card className="w-[350px]">
        {/* <div className="w-full space-y-6"> */}
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold tracking-tight">
            Sign in to your account
          </CardTitle>
          <CardDescription className="mt-2 text-sm text-muted-foreground">
            <span>Don&apos;t have an account?</span>
            <Link
              href="/register"
              className="px-1 font-medium text-primary hover:underline"
              prefetch={false}
            >
              Register
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="space-y-6"
            onSubmit={(e) => handleSubmit(e, email, password)}
          >
            <div className="grid w-full items-center gap-4">
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
                <span>
                  <LogIn className="h-4 w-4 mx-2" />
                </span>
              </LoaderButton>
            </div>
          </form>
        </CardContent>
        {/* </div> */}
      </Card>
    </div>
  );
}

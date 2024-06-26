"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export default function Home() {
  const handleUserLogin = () => {
    signIn();
  };

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 md:px-6">
      <div className="container mx-auto max-w-md space-y-6 text-center">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Blogen
          </h1>
          <p className="text-muted-foreground md:text-xl">
            A minimalist blog for the modern reader.
          </p>
        </div>
        <Button onClick={handleUserLogin}>Sign In</Button>
        <p className="text-muted-foreground">
          &copy; 2023 Blogen. All rights reserved.
        </p>
      </div>
    </div>
  );
}

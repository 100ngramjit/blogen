"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  // const router = useRouter();
  const handleUserLogin = () => {
    signIn();
  };

  return (
    <div className="flex justify-center p-2 m-2">
      <Button onClick={handleUserLogin}>Sign In</Button>
    </div>
  );
}

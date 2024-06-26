"use client";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "../_components/navbar";
import { signOut } from "next-auth/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { toast } = useToast();
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
    toast({
      title: "Signed Out!",
      variant: "destructive",
    });
  };
  return (
    <div>
      <Navbar handleLogout={handleLogout} />
      {children}
    </div>
  );
}

"use client";
import Breadcrumb from "../_components/breadcrumbs";
import Navbar from "../_components/navbar";
import { signOut } from "next-auth/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/5 blur-[120px] rounded-full z-0 pointer-events-none" />
      <Navbar handleLogout={handleLogout} />
      <main className="relative z-10 pt-28 pb-12 transition-all duration-500 ease-in-out">
        {children}
      </main>
    </div>
  );
}

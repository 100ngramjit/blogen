"use client";
import Navbar from "../_components/navbar";
import { signOut } from "next-auth/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const handleLogout = async () => {
    await signOut();
  };
  return (
    <div>
      <Navbar handleLogout={handleLogout} />
      {children}
    </div>
  );
}

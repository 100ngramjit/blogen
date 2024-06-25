"use client";
import { useRouter } from "next/navigation";
import Navbar from "../_components/navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const handleLogout = () => {
    // sessionStorage.removeItem("authToken");
    // router.refresh();
    router.push("/");
  };
  return (
    <div>
      <Navbar handleLogout={handleLogout} />
      {children}
    </div>
  );
}

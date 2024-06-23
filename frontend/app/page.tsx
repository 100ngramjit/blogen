"use client";
import LoginForm from "./_components/signInForm";
import RegisterForm from "./_components/registerForm";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleStart = () => {
    router.push("/signin");
  };
  useEffect(() => {
    handleStart();
  }, []);
  return <div className="flex justify-center p-2 m-2"></div>;
}

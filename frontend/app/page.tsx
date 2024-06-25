"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const handleUserLogin = () => {
    // const token = sessionStorage.getItem("authToken");
    router.push("/signin");

    // if (token) {
    //   router.push("/feed");
    // } else {
    //   router.push("/signin");
    // }
  };
  useEffect(() => {
    handleUserLogin();
  });
  // router.push("/signin");

  return <div className="flex justify-center p-2 m-2"></div>;
}

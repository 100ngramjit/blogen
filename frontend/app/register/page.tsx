"use client";
import { useToast } from "@/components/ui/use-toast";
import RegisterForm from "../_components/registerForm";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { toast } = useToast();

  async function handleSubmit(
    e: React.FormEvent,
    email: string,
    password: string,
    confirmPassword: string,
    name: string
  ) {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast({
        title: "Passwords not matching !",
      });
    }

    try {
      setIsLoading(true);

      let bodyContent = JSON.stringify({
        email: email,
        password: password,
        name: name,
      });

      let reqOptions = {
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/signup`,
        method: "POST",
        data: bodyContent,
      };
      let response = await axios.request(reqOptions);
      if (response.data.token) {
        toast({
          title: "Sign up success!",
          description: "Sign in with your register credentials now!",
        });
        setIsLoading(false);

        router.push("/signin");
      } else {
        toast({
          title: "Error!",
          description: response.data.err || response.data.message || "Signup failed",
          variant: "destructive",
        });
        setIsLoading(false);
      }
    } catch (e: any) {
      setIsLoading(false);
      const backendErr = e.response?.data?.err;
      
      if (backendErr?.code === "P2002") {
        return toast({
          title: "Email already exists",
          description: "Use a different email to signup",
          variant: "destructive",
        });
      }

      toast({
        title: "Signup Error",
        description: e.response?.data?.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  }


  return <RegisterForm handleSubmit={handleSubmit} isLoading={isLoading} />;
}

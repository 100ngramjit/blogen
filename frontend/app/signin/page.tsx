"use client";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import SignInForm from "../_components/signInForm";
import { useToast } from "@/components/ui/use-toast";
import { signIn } from "next-auth/react";

export default function page() {
  const router = useRouter();
  const { toast } = useToast();

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
    email: string,
    password: string
  ) {
    event.preventDefault();

    try {
      const response = await signIn("credentials", {
        username: email,
        password: password,
        redirect: false,
      });
      console.log("response", response);

      if (response?.ok) {
        toast({
          title: "Sign in success!",
        });
        router.refresh();
        router.push("/feed");
      } else {
        toast({
          title: "Error!",
          description: JSON.stringify(response),
          variant: "destructive",
        });
      }
    } catch (e) {
      toast({
        title: JSON.stringify(e),
      });
    }
  }
  return <SignInForm handleSubmit={handleSubmit} />;
}

//TODO : Store the token recieved on sign in

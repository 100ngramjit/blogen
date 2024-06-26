"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import SignInForm from "../_components/signInForm";
import { useToast } from "@/components/ui/use-toast";
import { signIn } from "next-auth/react";

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
    email: string,
    password: string
  ) {
    event.preventDefault();

    try {
      setIsLoading(true);
      const response = await signIn("credentials", {
        username: email,
        password: password,
        redirect: false,
      });

      if (response?.ok) {
        toast({
          title: "Sign in success!",
        });
        setIsLoading(false);

        router.push("/blogs");
      } else {
        toast({
          title: "Error!",
          description: JSON.stringify(response),
          variant: "destructive",
        });
        setIsLoading(false);
      }
    } catch (e) {
      toast({
        title: JSON.stringify(e),
      });
      setIsLoading(false);
    }
  }
  return <SignInForm handleSubmit={handleSubmit} isLoading={isLoading} />;
}

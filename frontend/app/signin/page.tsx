"use client";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import SignInForm from "../_components/signInForm";
import { useToast } from "@/components/ui/use-toast";

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
      let bodyContent = JSON.stringify({
        email: email,
        password: password,
      });

      let reqOptions = {
        url: "https://my-app.blogen.workers.dev/api/user/signin",
        method: "POST",
        data: bodyContent,
      };
      let response = await axios.request(reqOptions);
      console.log(response.data);
      if (response.data.token) {
        toast({
          title: "Sign in success!",
        });
        router.refresh();
        router.push("/feed");
      } else {
        toast({
          title: "Error!",
          description: response.data.msg,
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

//TODO : Fix CORS error in signin ,
//TODO : Store the token recieved on sign in
//TODO : Authentication using next : https://nextjs.org/docs/pages/building-your-application/authentication

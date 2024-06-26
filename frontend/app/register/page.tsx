"use client";
import { useToast } from "@/components/ui/use-toast";
import RegisterForm from "../_components/registerForm";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Page() {
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
      let bodyContent = JSON.stringify({
        email: email,
        password: password,
        name: name,
      });

      let reqOptions = {
        url: "https://my-app.blogen.workers.dev/api/user/signup",
        method: "POST",
        data: bodyContent,
      };
      let response = await axios.request(reqOptions);
      if (response.data.token) {
        toast({
          title: "Sign up success!",
          description: "Sign in with your register credentials now!",
        });
        router.refresh();
        router.push("/signin");
      } else {
        toast({
          title: "Error!",
          description: JSON.stringify(response.data),
          variant: "destructive",
        });
      }
    } catch (e: any) {
      if (e.response.data.err.code === "P2002") {
        return toast({
          title: "Email already exists",
          description: "use a different email to signup",
          variant: "destructive",
        });
      }
      toast({
        title: JSON.stringify(e),
      });
    }
  }

  return <RegisterForm handleSubmit={handleSubmit} />;
}

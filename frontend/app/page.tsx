import LoginForm from "./_components/signInForm";
import RegisterForm from "./_components/registerForm";
import { useRouter } from "next/navigation";
import { cookies } from "next/headers";

export default function Home() {
  const router = useRouter();

  const token = cookies().get("authToken");
  if (token) {
    router.push("/feed");
  } else {
    router.push("/signin");
  }

  return <div className="flex justify-center p-2 m-2"></div>;
}

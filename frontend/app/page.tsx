import LoginForm from "./_components/signInForm";
import RegisterForm from "./_components/registerForm";

export default function Home() {
  return (
    <div className="flex justify-center p-2 m-2">
      <LoginForm />
      <RegisterForm />
    </div>
  );
}

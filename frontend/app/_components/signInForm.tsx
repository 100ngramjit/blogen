import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SignInForm() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center justify-center px-4 py-12 m-2 rounded border-2 border-black shadow-2xl">
      <div className="w-full space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              href="#"
              className="font-medium text-primary hover:underline"
              prefetch={false}
            >
              Register
            </Link>
          </p>
        </div>
        <form className="space-y-6">
          <div>
            <Label htmlFor="email" className="my-2">
              Email address
            </Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              required
              placeholder="name@example.com"
            />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="my-1">
                Password
              </Label>
              <Link
                href="#"
                className="text-sm font-medium text-primary hover:underline"
                prefetch={false}
              >
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="Enter your password"
            />
          </div>
          <Button type="submit" className="w-full">
            Sign in
          </Button>
        </form>
      </div>
    </div>
  );
}

import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function RegisterForm() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center justify-center px-4 py-12 m-2 rounded border-2	border-black shadow-2xl ">
      <div className="w-full space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Register for an account
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="#"
              className="font-medium text-primary hover:underline"
              prefetch={false}
            >
              Sign in
            </Link>
          </p>
        </div>
        <form className="space-y-6">
          <div>
            <Label htmlFor="name" className="my-2">
              Name
            </Label>
            <Input
              id="name"
              type="text"
              autoComplete="name"
              required
              placeholder="Enter your name"
            />
          </div>
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
            </div>
            <Input
              id="password"
              type="password"
              autoComplete="new-password"
              required
              placeholder="Enter a password"
            />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="confirm-password" className="my-1">
                Confirm Password
              </Label>
            </div>
            <Input
              id="confirm-password"
              type="password"
              autoComplete="new-password"
              required
              placeholder="Confirm your password"
            />
          </div>
          <Button type="submit" className="w-full">
            Register
          </Button>
        </form>
      </div>
    </div>
  );
}

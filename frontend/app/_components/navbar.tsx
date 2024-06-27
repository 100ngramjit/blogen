import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { JSX, SVGProps } from "react";

const Navbar = ({ handleLogout }: any) => {
  return (
    <header className="bg-violet-600 text-white rounded-b-3xl bg-gradient-to-r from-[#6366F1] to-[#9333EA] text-white fixed w-full">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link
          href="/blogs"
          className="flex items-center gap-2 text-lg font-bold"
          prefetch={false}
        >
          <FeatherIcon className="h-6 w-6" />
          <span>Blogen</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          <Links handleLogout={handleLogout} />
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle navigation</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-violet-600 text-white">
            <div className="grid gap-6 p-4">
              <Links handleLogout={handleLogout} />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};
export default Navbar;

function FeatherIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.67 19a2 2 0 0 0 1.416-.588l6.154-6.172a6 6 0 0 0-8.49-8.49L5.586 9.914A2 2 0 0 0 5 11.328V18a1 1 0 0 0 1 1z" />
      <path d="M16 8 2 22" />
      <path d="M17.5 15H9" />
    </svg>
  );
}

function MenuIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

const Links = ({ handleLogout }: any) => {
  return (
    <>
      <Link
        href="/blogs
    "
        className="hover:text-violet-200"
        prefetch={false}
      >
        Home
      </Link>

      <Link
        href="/blogs/create"
        className="hover:text-violet-200"
        prefetch={false}
      >
        Create
      </Link>
      <Button
        onClick={handleLogout}
        className="bg-inherit border-2 border-white-500"
        size="sm"
      >
        Logout
      </Button>
    </>
  );
};
//TODO: getBlogs API
//TODO: password Hashing

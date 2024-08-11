"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

import { AlignJustify, Feather, LogOut } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "./theme-toggle";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

const Navbar = ({ handleLogout }: any) => {
  const { data: session } = useSession();
  const pathname = usePathname();
  return (
    <header className="bg-violet-600 text-white rounded-lg bg-gradient-to-r from-[#6533EA] to-[#A233EA] fixed w-[96vw] sm:w-[98vw] lg:w-[99vw] z-50 top-0 left-0 m-2">
      <div className="mx-auto flex h-16 items-center justify-between px-2 md:px-6">
        <Link
          href="/blogs"
          className="flex items-center gap-2 text-lg font-bold"
          prefetch={false}
        >
          <Feather className="h-6 w-6" />
          <span>Blogen</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          <Links handleLogout={handleLogout} />
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden border border-white"
            >
              <AlignJustify className="h-6 w-6" />
              <span className="sr-only">Toggle navigation</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-violet-600 text-white">
            <SheetTitle className="px-4 text-sm ">
              <VisuallyHidden.Root>Menu</VisuallyHidden.Root>
            </SheetTitle>
            <div className="grid gap-6 p-4">
              <span className="text-sm font-semibold">
                Welcome, {session?.user?.name}
              </span>
              <SheetClose asChild>
                <Link
                  href="/blogs"
                  className={`hover:text-violet-200 ${
                    pathname === "/blogs"
                      ? "bg-violet-500 text-white px-3 py-1 rounded-full text-md font-bold"
                      : ""
                  }`}
                  prefetch={false}
                >
                  Feed
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  href="/blogs/create"
                  className={`hover:text-violet-200 ${
                    pathname === "/blogs/create"
                      ? "bg-violet-500 text-white px-3 py-1 rounded-full text-md font-bold"
                      : ""
                  }`}
                  prefetch={false}
                >
                  Create
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  href="/blogs/byme"
                  className={`hover:text-violet-200 ${
                    pathname === "/blogs/byme"
                      ? "bg-violet-500 text-white px-3 py-1 rounded-full text-md font-bold"
                      : ""
                  }`}
                  prefetch={false}
                >
                  My Blogs
                </Link>
              </SheetClose>
              <ModeToggle />
              <Button
                onClick={handleLogout}
                className="bg-inherit border-2 dark:border-white"
                size="sm"
              >
                Logout
                <span>
                  <LogOut className="h-4 w-4 ml-2" />
                </span>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navbar;

const Links = ({ handleLogout }: any) => {
  const pathname = usePathname();
  const { data: session } = useSession();
  return (
    <>
      <span className="text-sm font-semibold">
        Welcome, {session?.user?.name}
      </span>
      <Link
        href="/blogs"
        className={`hover:text-violet-200 ${
          pathname === "/blogs"
            ? "bg-violet-500 text-white px-3 py-1 rounded-full text-md font-bold"
            : ""
        }`}
        prefetch={false}
      >
        Feed
      </Link>
      <Link
        href="/blogs/create"
        className={`hover:text-violet-200 ${
          pathname === "/blogs/create"
            ? "bg-violet-500 text-white px-3 py-1 rounded-full text-md font-bold"
            : ""
        }`}
        prefetch={false}
      >
        Create
      </Link>
      <Link
        href="/blogs/byme"
        className={`hover:text-violet-200 ${
          pathname === "/blogs/byme"
            ? "bg-violet-500 text-white px-3 py-1 rounded-full text-md font-bold"
            : ""
        }`}
        prefetch={false}
      >
        My Blogs
      </Link>
      <ModeToggle />
      <Button
        onClick={handleLogout}
        className="bg-inherit border-2 dark:border-white"
        size="sm"
      >
        Logout
        <span>
          <LogOut className="h-4 w-4 ml-2" />
        </span>
      </Button>
    </>
  );
};

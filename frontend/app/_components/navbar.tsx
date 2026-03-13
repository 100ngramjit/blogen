"use client";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
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
import { HeaderSearch } from "./header-search";

const Navbar = ({ handleLogout }: any) => {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-1/2 -translate-x-1/2 z-50 w-[96vw] mt-4 transition-all duration-300 pointer-events-none">
      <div className="mx-auto h-20 w-full flex items-center justify-between px-4 md:px-8 rounded-2xl bg-gradient-to-r from-yellow-400/90 via-yellow-500/90 to-orange-500/90 backdrop-blur-md border border-white/20 shadow-lg shadow-yellow-500/20 text-primary-foreground pointer-events-auto">
        <Link
          href="/blogs"
          className="flex items-center gap-2 text-xl font-extrabold tracking-tight hover:scale-105 transition-transform shrink-0"
          prefetch={false}
        >
          <div className="bg-white/20 p-1.5 rounded-lg border border-white/30">
            <Feather className="h-5 w-5" />
          </div>
          <span className="drop-shadow-sm">Blogen</span>
        </Link>

        <div className="flex items-center gap-2">
          <nav className="hidden items-center gap-6 md:flex shrink-0">
            <Links handleLogout={handleLogout} />
          </nav>
          
          <div className="flex md:hidden items-center gap-2">
            <HeaderSearch />
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="border border-white/40 text-primary-foreground hover:bg-white/20"
                >
                  <AlignJustify className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500 text-primary-foreground border-white/20 w-[280px] sm:w-[350px]"
              >
                <SheetTitle className="px-4 text-sm ">
                  <VisuallyHidden.Root>Menu</VisuallyHidden.Root>
                </SheetTitle>
                <div className="flex flex-col gap-3 p-4">
                  <div className="mb-4">
                    <span className="text-xs uppercase tracking-widest opacity-70 font-bold block mb-1">
                      Session
                    </span>
                    <span className="text-lg font-extrabold block">
                      {session ? `Hi, ${session?.user?.name?.split(" ")[0]}!` : "Welcome!"}
                    </span>
                  </div>
                  <span className="text-xs uppercase tracking-widest opacity-70 font-bold block">
                    Navigation
                  </span>
                  {[
                    { name: "Feed", href: "/blogs" },
                    ...(session ? [
                      { name: "Create", href: "/blogs/create" },
                      { name: "My Blogs", href: "/blogs/byme" }
                    ] : [])
                  ].map((tab) => (
                    <SheetClose key={tab.href} asChild>
                      <Link
                        href={tab.href}
                        className={`relative flex items-center px-4 py-3 rounded-xl text-lg font-bold transition-colors z-10 ${
                          pathname === tab.href
                            ? "text-yellow-600"
                            : "hover:bg-white/10"
                        }`}
                        prefetch={false}
                      >
                        {pathname === tab.href && (
                          <motion.div
                            layoutId="activeTabMobile"
                            className="absolute inset-0 bg-white rounded-xl shadow-lg z-[-1]"
                            transition={{
                              type: "spring",
                              bounce: 0.1,
                              duration: 0.6,
                            }}
                          />
                        )}
                        {tab.name}
                      </Link>
                    </SheetClose>
                  ))}

                  <div className="mt-6 pt-6 border-t border-white/20 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <span className="font-bold">Appearance</span>
                      <ModeToggle />
                    </div>
                    {session ? (
                      <Button
                        onClick={handleLogout}
                        className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20 py-6 text-lg font-bold rounded-xl"
                        size="lg"
                      >
                        Logout
                        <LogOut className="h-5 w-5 ml-2" />
                      </Button>
                    ) : (
                      <div className="flex flex-col gap-2">
                        <Link href="/signin" className="w-full">
                          <Button variant="ghost" className="w-full text-white font-bold border border-white/20 rounded-xl">Sign In</Button>
                        </Link>
                        <Link href="/register" className="w-full">
                          <Button className="w-full bg-white text-yellow-600 font-bold rounded-xl active:bg-white/90">Get Started</Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
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
      {session?.user && (
        <span className="text-sm font-bold bg-white/20 px-3 py-1.5 rounded-lg border border-white/20 backdrop-blur-sm">
          Hi, {session?.user?.name?.split(" ")[0]}!
        </span>
      )}
      <div className="flex items-center gap-1 bg-white/20 p-1 rounded-xl border border-white/20 relative">
        {[
          { name: "Feed", href: "/blogs" },
          ...(session ? [
            { name: "Create", href: "/blogs/create" },
            { name: "My Blogs", href: "/blogs/byme" }
          ] : [])
        ].map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className={`relative px-4 py-2 rounded-lg text-sm font-bold transition-colors duration-200 z-10 ${
              pathname === tab.href
                ? "text-yellow-600"
                : "text-primary-foreground/90 hover:text-white"
            }`}
            prefetch={false}
          >
            {pathname === tab.href && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-white rounded-lg shadow-sm z-[-1]"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            {tab.name}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-3 border-l border-white/30 pl-4 ml-2">
        <HeaderSearch />
        <ModeToggle />
        {session ? (
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="bg-white/10 hover:bg-white/30 text-primary-foreground border border-white/20 font-bold"
            size="sm"
          >
            Logout
            <LogOut className="h-4 w-4 ml-2" />
          </Button>
        ) : (
          <div className="flex items-center gap-2">
            <Link href="/signin">
              <Button variant="ghost" className="text-white font-bold hover:bg-white/20">Sign In</Button>
            </Link>
            <Link href="/register">
              <Button className="bg-white text-yellow-600 font-bold hover:bg-white/90 active:scale-95 transition-all">Get Started</Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};



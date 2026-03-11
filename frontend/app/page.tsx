"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Home() {
  const handleUserLogin = () => {
    signIn();
  };
  const { data: session, status } = useSession();
  if (status === "authenticated") {
    redirect("/blogs");
  }
  if (status === "unauthenticated") {
    return (
      <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 md:px-6 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/20 blur-[130px] rounded-full z-0 opacity-50" />
        
        <div className="relative z-10 w-full max-w-md bg-white/70 dark:bg-black/40 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-[2.5rem] shadow-2xl p-10 md:p-14 space-y-10 text-center transform hover:scale-[1.01] transition-all duration-500">
          <div className="space-y-4">
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black uppercase tracking-[0.2em]">
              Welcome to the future
            </div>
            <h1 className="text-6xl md:text-7xl font-black tracking-tighter bg-gradient-to-b from-gray-950 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent drop-shadow-sm">
              Blogen.
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl font-medium leading-relaxed italic">
              A minimalist space for the <span className="text-primary font-bold">modern</span> reader.
            </p>
          </div>
          <Button 
            onClick={handleUserLogin}
            className="w-full h-16 rounded-2xl text-xl font-black shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:scale-105 transition-all active:scale-95"
          >
            Get Started
          </Button>
          <div className="pt-4 flex flex-col items-center gap-1 opacity-60">
            <p className="text-xs font-bold uppercase tracking-widest">
              Join thousands of writers
            </p>
            <p className="text-[10px] font-medium">
              &copy; {new Date().getFullYear()} Blogen. Crafted with precision.
            </p>
          </div>
        </div>
      </div>
    );
  }
  return null;
}

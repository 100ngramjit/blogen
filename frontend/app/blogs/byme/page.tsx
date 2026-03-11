import BlogCards from "@/app/_components/blog-cards";
import Breadcrumb from "@/app/_components/breadcrumbs";
import { NEXT_AUTH_CONFIG } from "@/lib/authconfig";
import { getServerSession } from "next-auth/next";

const Page = async () => {
  const session = await getServerSession(NEXT_AUTH_CONFIG);

  return (
    <div className="mx-auto px-4 py-12 max-w-7xl">
      <div className="flex flex-col gap-6 text-center pb-16">
        <div className="inline-block mx-auto px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest animate-fade-in">
          Manage your content
        </div>
        <h1 className="text-5xl md:text-7xl lg:text-9xl font-black tracking-tight drop-shadow-sm bg-gradient-to-b from-gray-950 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
          Your Blogs
        </h1>
        <p className="max-w-2xl mx-auto text-muted-foreground text-base md:text-xl font-medium leading-relaxed">
          A collection of all your published stories. Refine your drafts, manage
          your active posts, and look back at your journey.
        </p>
        <div className="flex justify-center transform hover:scale-105 transition-transform duration-300">
          <Breadcrumb />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <BlogCards session={session} blogtype="all" />
      </div>
    </div>
  );
};
export default Page;

import { getServerSession } from "next-auth";
import { NEXT_AUTH_CONFIG } from "../../lib/authconfig";
import BlogFeed from "../_components/blog-feed";

const Page = async () => {
  const session = await getServerSession(NEXT_AUTH_CONFIG);

  return (
    <div className="mx-auto px-4 py-12 max-w-7xl">
      <div className="flex flex-col gap-6 text-center pb-16">
        <div className="inline-block mx-auto px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest animate-fade-in">
          Quick glance
        </div>
        <h1 className="text-5xl md:text-7xl lg:text-9xl font-black tracking-tight drop-shadow-sm bg-gradient-to-b from-gray-950 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
          Stories & Ideas
        </h1>
        <p className="max-w-2xl mx-auto text-muted-foreground text-base md:text-xl font-medium leading-relaxed">
          The latest blogs according to your interests. Explore perspectives, shared insights, and creative deep dives.
        </p>
      </div>
      
      <BlogFeed session={session} />
    </div>
  );
};


export default Page;

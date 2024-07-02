import { getServerSession } from "next-auth";
import { NEXT_AUTH_CONFIG } from "../../lib/authconfig";
import BlogCards from "../_components/blog-cards";

const Page = async () => {
  const session = await getServerSession(NEXT_AUTH_CONFIG);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-4 text-center pb-8">
        <p className="text-lg">Quick glance</p>
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-extrabold">
          Stories & Ideas
        </h1>
        <p className="text-sm text-gray-500">
          The latest blogs according to your interests
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <BlogCards session={session} blogtype="latest" />
      </div>
    </div>
  );
};

export default Page;

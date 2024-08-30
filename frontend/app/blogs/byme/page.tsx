import BlogCards from "@/app/_components/blog-cards";
import Breadcrumb from "@/app/_components/breadcrumbs";
import { NEXT_AUTH_CONFIG } from "@/lib/authconfig";
import { getServerSession } from "next-auth/next";

const Page = async () => {
  const session = await getServerSession(NEXT_AUTH_CONFIG);

  return (
    <div className=" mx-auto px-4 py-8">
      <div className="flex flex-col gap-4 text-center pb-8">
        <p className="text-lg">Quick glance</p>
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-extrabold">
          Your Blogs
        </h1>
        <p className="text-sm text-gray-500">All the blogs published by you</p>
        <div className="flex justify-center">
          <Breadcrumb />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <BlogCards session={session} blogtype="all" />
      </div>
    </div>
  );
};
export default Page;

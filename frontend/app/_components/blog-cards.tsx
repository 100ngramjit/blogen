"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const BlogCards = ({ token }: { token: string }) => {
  const router = useRouter();

  const [blogs, setBlogs] = useState({ number_of_posts: null, posts: [] });
  const [isLoading, setIsLoading] = useState(false);

  const getBlogs = async (token: string) => {
    try {
      setIsLoading(true);
      let headersList = {
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      let reqOptions = {
        url: "https://my-app.blogen.workers.dev/api/article/all",
        method: "GET",
        headers: headersList,
      };

      let response = await axios.request(reqOptions);
      console.log(response.data);
      setIsLoading(false);
      setBlogs(response.data);
    } catch (e) {
      console.error(e);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBlogs(token);
  }, []);

  if (blogs?.number_of_posts === 0) {
    return (
      <>
        <div />
        <div>
          <p className="text-center">
            No blogs yet! Get started
            <Link
              href="/blogs/create"
              className="px-1 text-primary hover:underline"
            >
              here
            </Link>
          </p>
        </div>
        <div />
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        {[1, 2, 3, 4, 5, 6].map((ele) => (
          <Skeleton key={ele} className="w-full h-56 rounded-xl" />
        ))}
      </>
    );
  }

  return (
    <>
      {blogs.posts.map((ele: any) => (
        <Card
          key={ele?.id}
          className="bg-background rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-500"
        >
          <CardHeader>
            <CardTitle
              onClick={() => router.push(`/blogs/${ele.id}`)}
              className="hover:underline cursor-pointer"
            >
              {ele.title}
            </CardTitle>
            <div className="flex items-center text-muted-foreground text-sm mb-4">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span className="px-2">John Doe</span>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground line-clamp-3">{ele.content}</p>
          </CardContent>
        </Card>
      ))}
    </>
  );
};
export default BlogCards;

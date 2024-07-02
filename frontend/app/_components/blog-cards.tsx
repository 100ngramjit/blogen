"use client";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import { ClockIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const BlogCards = ({ session, blogtype }: any) => {
  const router = useRouter();
  const token = session.user.jwtToken;
  const name = session.user.name;

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
        url: `https://my-app.blogen.workers.dev/api/article/${blogtype}`,
        method: "GET",
        headers: headersList,
      };

      let response = await axios.request(reqOptions);
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
          className="flex flex-col rounded-lg shadow-md cursor-pointer"
          key={ele?.id}
          onClick={() => router.push(`/blogs/details/${ele.id}`)}
        >
          <CardHeader>
            <CardTitle className="text-2xl font-bold">{ele.title}</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow text-muted-foreground">
            <p className="text-muted-foreground line-clamp-3">{ele.content}</p>
          </CardContent>
          <CardFooter className="flex items-center justify-between text-sm mt-auto">
            <div>
              <Badge variant="secondary" className="font-medium">
                {blogtype === "all" ? name : ele.author.name}
              </Badge>
            </div>
            <Badge
              variant="secondary"
              className="flex items-center gap-2 text-muted-foreground"
            >
              <ClockIcon className="w-4 h-4" />
              {new Date(ele.createdAt).toLocaleString()}
            </Badge>
          </CardFooter>
        </Card>
      ))}
    </>
  );
};
export default BlogCards;

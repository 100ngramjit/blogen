"use client";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { formatDistanceToNowStrict } from "date-fns";
import { ClockIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function CardSkeleton() {
  return (
    <Card className="flex flex-col rounded-lg shadow-md animate-pulse">
      <CardHeader>
        <div className="h-8 bg-gray-300 rounded w-3/4"></div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      </CardContent>
      <CardFooter className="flex items-center justify-between mt-auto">
        <div className="h-6 bg-gray-300 rounded w-20"></div>
        <div className="h-6 bg-gray-300 rounded w-32"></div>
      </CardFooter>
    </Card>
  );
}
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
          <CardSkeleton key={ele} />
        ))}
      </>
    );
  }

  return (
    <>
      {blogs.posts.map((ele: any) => (
        <Card
          className="flex flex-col rounded-lg shadow-2xl dark:shadow-lg cursor-pointer"
          key={ele?.id}
          onClick={() => router.push(`/blogs/details/${ele.id}`)}
        >
          <CardHeader>
            <CardTitle className="text-2xl font-bold hover:underline">
              {ele.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow text-muted-foreground">
            <p className="text-muted-foreground line-clamp-3">{ele.content}</p>
          </CardContent>
          <CardFooter className="flex items-center justify-between text-sm mt-auto">
            <div>
              <Badge variant="secondary" className="font-medium">
                {ele.author.name}
              </Badge>
            </div>
            <Badge
              variant="secondary"
              className="flex items-center gap-2 text-muted-foreground"
            >
              <ClockIcon className="w-4 h-4" />
              {formatDistanceToNowStrict(new Date(ele.createdAt), {
                addSuffix: true,
              })}
            </Badge>
          </CardFooter>
        </Card>
      ))}
    </>
  );
};
export default BlogCards;

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
import { Button } from "@/components/ui/button";
import { ClockIcon, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function CardSkeleton() {
  return (
    <Card className="flex flex-col rounded-lg shadow-md animate-pulse border-primary/20">
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
const BlogCards = ({ session, blogtype, searchQuery }: any) => {
  const router = useRouter();
  const token = session?.user?.jwtToken;
  const name = session?.user?.name;

  const [blogs, setBlogs] = useState({ number_of_posts: null, posts: [] as any[], has_more: false });
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [page, setPage] = useState(1);

  const getBlogs = async (token?: string, isMore = false) => {
    try {
      if (isMore) {
        setIsFetchingMore(true);
      } else {
        setIsLoading(true);
      }

      let headersList: any = {
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
        "Content-Type": "application/json",
      };

      if (token) {
        headersList["Authorization"] = `Bearer ${token}`;
      }

      const currentPage = isMore ? page + 1 : 1;
      const limit = 6;

      const url = searchQuery 
        ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/article/search?q=${searchQuery}&p=${currentPage}&l=${limit}`
        : `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/article/${blogtype}?p=${currentPage}&l=${limit}`;

      let reqOptions = {
        url: url,
        method: "GET",
        headers: headersList,
      };

      let response = await axios.request(reqOptions);
      
      if (isMore) {
        setBlogs(prev => ({
          ...response.data,
          posts: [...prev.posts, ...response.data.posts]
        }));
        setPage(currentPage);
        setIsFetchingMore(false);
      } else {
        setBlogs(response.data);
        setPage(1);
        setIsLoading(false);
      }
    } catch (e) {
      console.error(e);
      setIsLoading(false);
      setIsFetchingMore(false);
    }
  };

  useEffect(() => {
    getBlogs(token);
  }, [searchQuery, blogtype]); // Added blogtype to dependencies as well

  if (blogs?.number_of_posts === 0) {
    return (
      <div className="col-span-full py-20 text-center">
        <p className="text-xl font-medium text-muted-foreground">
          No blogs yet! Get started
          <Link
            href="/blogs/create"
            className="px-2 text-primary hover:underline font-bold"
          >
            here
          </Link>
        </p>
      </div>
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
          className="relative group overflow-hidden flex flex-col rounded-xl shadow-xl hover:shadow-2xl dark:shadow-md cursor-pointer border-primary/20 transition-all duration-500 ease-out"
          key={ele?.id}
          onClick={() => router.push(`/blogs/details/${ele.id}`)}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <CardHeader className="relative z-10 pb-2">
            <CardTitle className="text-2xl font-bold tracking-tight line-clamp-2 group-hover:text-primary transition-colors">
              {ele.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10 flex-grow">
            <p className="text-muted-foreground line-clamp-3 leading-relaxed">{ele.content}</p>
          </CardContent>
          <CardFooter className="relative z-10 flex items-center justify-between text-sm mt-auto pt-4 border-t border-primary/5">
            <div className="flex gap-2">
              <Badge variant="secondary" className="font-semibold px-3 py-1">
                {ele.author.name}
              </Badge>
              {!ele.published && (
                <Badge variant="destructive" className="font-bold opacity-80 uppercase tracking-tighter text-[10px]">
                  Private
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground font-medium">
              <ClockIcon className="w-4 h-4 opacity-70" />
              {formatDistanceToNowStrict(new Date(ele.createdAt), {
                addSuffix: true,
              })}
            </div>
          </CardFooter>
        </Card>
      ))}

      {blogs.has_more && (
        <div className="flex justify-center mt-12 mb-8 col-span-full">
          <Button 
            onClick={() => getBlogs(token, true)} 
            disabled={isFetchingMore}
            variant="outline"
            className="px-10 py-7 text-lg font-black rounded-2xl border-2 border-primary/20 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 shadow-xl shadow-primary/5 group"
          >
            {isFetchingMore ? (
              <>
                <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                Curating more stories...
              </>
            ) : (
              <>
                Load More Stories
                <span className="ml-2 group-hover:translate-x-1 transition-transform inline-block">→</span>
              </>
            )}
          </Button>
        </div>
      )}
    </>
  );
};
export default BlogCards;

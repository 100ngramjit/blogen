"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { useEffect, useState } from "react";
const BlogCards = ({ token }: { token: string }) => {
  const [blogs, setBlogs] = useState({ number_of_posts: 0, posts: [] });
  const getBlogs = async (token: string) => {
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
    setBlogs(response.data);
  };

  useEffect(() => {
    getBlogs(token);
  }, []);

  if (!blogs?.number_of_posts) {
    return <div>No Blogs Yet!</div>;
  }

  return (
    <>
      {blogs.posts.map((ele: any) => (
        <Card
          key={ele?.id}
          className="bg-background rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-500"
        >
          <CardHeader>
            <CardTitle>{ele.title}</CardTitle>
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

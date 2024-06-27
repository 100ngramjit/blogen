"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const Page = () => {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/blogs/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });
      console.log("res", response);
      if (response.ok) {
        console.log("Blog post created successfully");
        setTitle("");
        setContent("");
        toast({
          title: "Blog published successfully",
        });
      } else {
        toast({
          title: "server error! please try again",
          variant: "destructive",
        });
        console.error("Failed to create blog post");
      }
    } catch (error) {
      toast({
        title: "server error! please try again",
        variant: "destructive",
      });
      console.error("An error occurred:", error);
    }
  };

  return (
    <main className="flex-1">
      <section className="flex min-h-[calc(100dvh-80px)] items-center justify-center bg-background px-4 py-4 md:px-6">
        <div className="container mx-auto max-w-md space-y-6 text-center">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Create a New Blog
            </h1>
            <p className="text-muted-foreground md:text-xl">
              Share your thoughts, insights, and stories with the world.
            </p>
          </div>
          <form className="space-y-4 text-left" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Enter your blog title"
                value={title}
                onChange={handleTitleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                placeholder="Write your blog post here..."
                className="min-h-[300px]"
                value={content}
                onChange={handleContentChange}
              />
            </div>
            <Button
              type="submit"
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              Publish
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Page;

"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { LoaderButton } from "@/components/ui/loader-button";
import { useRouter } from "next/navigation";
import { Send } from "lucide-react";
import Breadcrumb from "@/app/_components/breadcrumbs";

const Page = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast({
        title: "Please fill in the title and content",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/blogs/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });
      if (response.ok) {
        setTitle("");
        setContent("");
        toast({
          title: "Blog published successfully",
        });
        setIsLoading(false);
        router.push("/blogs");
      } else {
        toast({
          title: "Server error! Please try again",
          variant: "destructive",
        });
        console.error("Failed to create blog post");
        setIsLoading(false);
      }
    } catch (error) {
      toast({
        title: "Server error! Please try again",
        variant: "destructive",
      });
      console.error("An error occurred:", error);
      setIsLoading(false);
    }
  };

  return (
    <main className="flex-1 overflow-hidden relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full z-0" />
      
      <section className="relative z-10 flex min-h-[calc(100dvh-80px)] py-12 items-center justify-center px-4 md:px-6">
        <div className="w-full max-w-3xl">
          <div className="mb-8 flex justify-center transform hover:scale-105 transition-transform duration-300">
            <Breadcrumb />
          </div>

          <div className="bg-white/80 dark:bg-black/40 backdrop-blur-xl rounded-3xl border border-gray-200 dark:border-white/10 shadow-2xl overflow-hidden">
            <div className="p-8 md:p-12 space-y-8">
              <div className="space-y-3 text-center">
                <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-600 tracking-tighter sm:text-5xl md:text-6xl">
                  Create a New Blog
                </h1>
                <p className="text-muted-foreground text-md md:text-xl font-medium">
                  Jot down your thoughts, insights, and stories.
                </p>
              </div>

              <form className="space-y-6 text-left" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-bold uppercase tracking-wider opacity-70">Title</Label>
                  <Input
                    id="title"
                    placeholder="A catchy, interesting title..."
                    className="bg-gray-50/50 dark:bg-white/5 border-gray-200 dark:border-white/10 rounded-xl h-14 text-lg font-bold focus:ring-2 focus:ring-primary/20 transition-all"
                    value={title}
                    onChange={handleTitleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content" className="text-sm font-bold uppercase tracking-wider opacity-70">Content</Label>
                  <Textarea
                    id="content"
                    placeholder="Tell your story..."
                    className="min-h-[350px] bg-gray-50/50 dark:bg-white/5 border-gray-200 dark:border-white/10 rounded-2xl p-6 text-lg leading-relaxed focus:ring-2 focus:ring-primary/20 transition-all"
                    value={content}
                    onChange={handleContentChange}
                  />
                </div>
                <div className="pt-4 flex justify-center">
                  <LoaderButton
                    type="submit"
                    isLoading={isLoading}
                    disabled={!title.trim() || !content.trim()}
                    className="h-14 px-12 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all hover:scale-105"
                  >
                    Publish Story
                    <Send className="h-5 w-5 ml-3" />
                  </LoaderButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Page;

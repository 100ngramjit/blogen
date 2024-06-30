"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoaderButton } from "@/components/ui/loader-button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { Pencil, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function EditDialog({ article, id, session }: any) {
  const router = useRouter();
  const { toast } = useToast();

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState(article.title);
  const [content, setContent] = useState(article.content);

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const headersList = {
        accept: "application/json",
        "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
        Authorization: `Bearer ${session?.user.jwtToken}`,
        "Content-Type": "application/json",
      };
      const bodyContent = JSON.stringify({
        title: title,
        content: content,
      });
      const reqOptions = {
        url: `https://my-app.blogen.workers.dev/api/article/${id}`,
        method: "PUT",
        headers: headersList,
        data: bodyContent,
      };

      await axios.request(reqOptions);
      setIsLoading(false);

      toast({
        title: "Done!",
        description: "Blog updated successfully",
      });
      router.refresh();
      setOpen(false);
    } catch (e: any) {
      setIsLoading(false);

      toast({
        title: "Error!",
        description: e?.response.data.Error,
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm lg:max-w-lg min-w-[90%] md:min-w-[50%] h-[75vh]">
        <DialogHeader>
          <DialogTitle>Edit Blog</DialogTitle>
          <DialogDescription>
            Make changes to your blog here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form
          className="grid gap-4 py-4 overflow-y-auto h-full"
          onSubmit={onSave}
        >
          <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-left">
              Title
            </Label>
            <Input
              id="title"
              className="col-span-3"
              value={title}
              onChange={onTitleChange}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
            <Label htmlFor="content" className="text-left">
              Content
            </Label>
            <Textarea
              id="content"
              placeholder="Edit your blog post here..."
              className="col-span-3"
              value={content}
              onChange={onContentChange}
            />
          </div>
          <DialogFooter>
            <LoaderButton isLoading={isLoading} type="submit">
              Save changes
              <span>
                <Save className="h-4 w-4 mx-2" />
              </span>
            </LoaderButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { Loader2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeleteButton({ session, id }: any) {
  const router = useRouter();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);

  const onDeleteConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const headersList = {
        accept: "application/json",
        "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
        Authorization: `Bearer ${session?.user.jwtToken}`,
        "Content-Type": "application/json",
      };
      const reqOptions = {
        url: `https://my-app.blogen.workers.dev/api/article/${id}`,
        method: "DELETE",
        headers: headersList,
      };

      await axios.request(reqOptions);
      setIsLoading(false);

      toast({
        title: "Done!",
        description: "Blog deleted successfully",
      });
      router.push("/blogs");
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
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your blog
            and remove it from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onDeleteConfirm}
            disabled={isLoading}
            className="border-destructive bg-destructive text-destructive-foreground active:bg-destructive hover:bg-destructive"
          >
            {isLoading && (
              <span>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              </span>
            )}
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

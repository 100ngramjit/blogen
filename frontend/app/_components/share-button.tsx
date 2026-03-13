"use client";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export function ShareButton({ title }: { title: string }) {
  const { toast } = useToast();

  const handleShare = async () => {
    const shareUrl = typeof window !== "undefined" ? window.location.href : "";

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url: shareUrl,
        });
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          console.error("Error sharing:", err);
        }
      }
    } else {
      // Simple fallback if navigator.share is not available (e.g. desktop Chrome)
      try {
        await navigator.clipboard.writeText(shareUrl);
        toast({
          title: "Link copied!",
          description: "Sharing is not natively supported on this browser, so the link was copied instead.",
        });
      } catch (err) {
        toast({
          title: "Sharing unavailable",
          description: "Your browser doesn't support native sharing.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="hover:text-primary transition-colors"
      onClick={handleShare}
    >
      <Share2 className="h-4 w-4" />
    </Button>
  );
}

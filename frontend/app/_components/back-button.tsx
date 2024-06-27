"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <Button
      variant="secondary"
      size="icon"
      className="my-2"
      onClick={() => router.back()}
    >
      <ChevronLeft className="h-6 w-6" />
    </Button>
  );
}

"use client";

import { useRouter } from "next/navigation";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <button onClick={() => router.push("/")}>Try again</button>
      </body>
    </html>
  );
}

"use client";

import BlogCards from "./blog-cards";

export default function BlogFeed({ session }: { session: any }) {
  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <BlogCards session={session} blogtype="latest" />
      </div>
    </div>
  );
}



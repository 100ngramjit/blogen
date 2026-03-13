import { Suspense } from "react";
import axios from "axios";
import { CardHeader, CardTitle, CardContent, Card } from "@/components/ui/card";
import { NEXT_AUTH_CONFIG } from "@/lib/authconfig";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import { EditDialog } from "@/app/_components/edit-dialog";
import { DeleteButton } from "@/app/_components/delete-button";
import { ClockIcon, UserIcon, BookOpenIcon, ArrowLeftIcon } from "lucide-react";
import { formatDistanceToNowStrict } from "date-fns";
import { ScrollProgressBar } from "@/app/_components/scroll-progress";
import Breadcrumb from "@/app/_components/breadcrumbs";
import { Button } from "@/components/ui/button";
import Link from "next/link";

async function fetchArticle(id: string, jwtToken?: string) {
  const headersList: any = {
    accept: "application/json",
    "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
    "Content-Type": "application/json",
  };

  if (jwtToken) {
    headersList["Authorization"] = `Bearer ${jwtToken}`;
  }

  const reqOptions = {
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/article/details/${id}`,
    method: "GET",
    headers: headersList,
    timeout: 5000,
  };

  const response = await axios.request(reqOptions);
  return response.data.article;
}

function SkeletonLoader() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="h-6 w-32 bg-gray-200 dark:bg-white/5 rounded-full mb-8 animate-pulse" />
      <Card
        variant="static"
        className="bg-white/80 dark:bg-black/40 backdrop-blur-xl rounded-[2.5rem] border border-gray-200 dark:border-white/10 shadow-2xl overflow-hidden"
      >
        <CardHeader className="p-8 md:p-12 pb-4">
          <div className="h-12 bg-gray-200 dark:bg-white/5 rounded-2xl w-3/4 mb-8 animate-pulse" />
          <div className="flex gap-4">
            <div className="h-10 w-32 bg-gray-200 dark:bg-white/5 rounded-full animate-pulse" />
            <div className="h-10 w-32 bg-gray-200 dark:bg-white/5 rounded-full animate-pulse" />
          </div>
        </CardHeader>
        <CardContent className="p-8 md:p-12 pt-0">
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 dark:bg-white/5 rounded w-full animate-pulse" />
            <div className="h-4 bg-gray-200 dark:bg-white/5 rounded w-full animate-pulse" />
            <div className="h-4 bg-gray-200 dark:bg-white/5 rounded w-5/6 animate-pulse" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

async function ArticleContent({ id, session }: any) {
  const article = await fetchArticle(id, session?.user?.jwtToken);

  if (!article) {
    return (
      <div className="flex flex-col items-center justify-center p-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Article Not Found</h2>
        <Link href="/blogs">
          <Button variant="outline">Back to Blogs</Button>
        </Link>
      </div>
    );
  }

  // Calculate reading time
  const wordsPerMinute = 240;
  const words = article.content.trim().split(/\s+/).length;
  const readingTime = Math.ceil(words / wordsPerMinute);

  return (
    <div className="animate-slide-up max-w-4xl mx-auto mb-16">
      <div className="flex items-center justify-between mb-8 px-2 group">
        <div className="flex items-center gap-4">
          <Breadcrumb />
        </div>

        {session && article.author.email === session?.user.email && (
          <div className="flex bg-white/50 dark:bg-white/5 backdrop-blur-md rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
            <EditDialog article={article} id={id} session={session} />
            <div className="w-[1px] bg-gray-200 dark:bg-white/10 self-stretch my-2" />
            <DeleteButton session={session} id={id} />
          </div>
        )}
      </div>

      <Card
        variant="static"
        className="bg-white/80 dark:bg-black/40 backdrop-blur-xl rounded-[2.5rem] border border-gray-200 dark:border-white/10 shadow-2xl overflow-hidden transition-all duration-500 hover:shadow-primary/5"
      >
        <div className="relative">
          <CardHeader className="p-8 md:p-12 pb-6">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-foreground tracking-tight leading-[1.1] mb-8">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 sm:gap-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground font-black text-xl shadow-lg shadow-primary/20 transition-transform hover:scale-105 active:scale-95">
                  {article?.author.name?.charAt(0)}
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-wider text-muted-foreground mb-0.5">
                    Author
                  </p>
                  <p className="font-bold text-base leading-none">
                    {article?.author.name}
                  </p>
                </div>
              </div>

              <div className="h-8 w-px bg-gray-200 dark:bg-white/10 hidden sm:block" />

              <div className="flex items-center gap-6">
                <div className="flex flex-col gap-0.5">
                  <p className="text-xs font-black uppercase tracking-wider text-muted-foreground">
                    Published
                  </p>
                  <div className="flex items-center gap-1.5 text-sm font-semibold">
                    <ClockIcon className="w-4 h-4 text-primary" />
                    <span>
                      {formatDistanceToNowStrict(new Date(article.createdAt), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-0.5">
                  <p className="text-xs font-black uppercase tracking-wider text-muted-foreground">
                    Reading Time
                  </p>
                  <div className="flex items-center gap-1.5 text-sm font-semibold text-primary">
                    <BookOpenIcon className="w-4 h-4" />
                    <span>{readingTime} min read</span>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>

          <div className="px-8 md:px-12">
            <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-white/10 to-transparent" />
          </div>

          <CardContent className="p-8 md:p-12 pt-8">
            <p className="whitespace-pre-wrap text-lg md:text-xl leading-relaxed font-medium text-foreground/80 first-letter:text-7xl first-letter:font-black first-letter:mr-3 first-letter:float-left first-letter:text-primary selection:bg-primary/20">
              {article.content}
            </p>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const session = await getServerSession(NEXT_AUTH_CONFIG);

  return (
    <>
      <ScrollProgressBar />
      <div className="min-h-screen bg-gray-50/50 dark:bg-[#050505] pt-12">
        <div className="container mx-auto px-4">
          <Suspense fallback={<SkeletonLoader />}>
            <ArticleContent id={id} session={session} />
          </Suspense>
        </div>
      </div>
    </>
  );
}


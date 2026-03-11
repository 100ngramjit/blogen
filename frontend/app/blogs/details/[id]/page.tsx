import { Suspense } from "react";
import axios from "axios";
import { CardHeader, CardTitle, CardContent, Card } from "@/components/ui/card";
import { NEXT_AUTH_CONFIG } from "@/lib/authconfig";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import { EditDialog } from "@/app/_components/edit-dialog";
import { DeleteButton } from "@/app/_components/delete-button";
import { ClockIcon } from "lucide-react";
import { formatDistanceToNowStrict } from "date-fns";
import { ScrollProgressBar } from "@/app/_components/scroll-progress";
import Breadcrumb from "@/app/_components/breadcrumbs";

async function fetchArticle(id: string, jwtToken: string) {
  const headersList = {
    accept: "application/json",
    "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
    Authorization: `Bearer ${jwtToken}`,
    "Content-Type": "application/json",
  };

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
    <Card
      variant="static"
      className="bg-background rounded-lg overflow-hidden shadow-md animate-pulse"
    >
      <CardHeader>
        <div className="h-8 bg-gray-300 rounded w-1/2 mb-4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/3"></div>
      </CardHeader>
      <CardContent>
        <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      </CardContent>
    </Card>
  );
}

async function ArticleContent({ id, session }: any) {
  const article = await fetchArticle(id, session.user.jwtToken);

  return (
    <div className="animate-slide-up">
      <Card
        variant="static"
        className="bg-white/80 dark:bg-black/40 backdrop-blur-xl rounded-[2.5rem] border border-gray-200 dark:border-white/10 shadow-2xl overflow-hidden"
      >
        <CardHeader className="p-8 pb-2">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-primary drop-shadow-sm leading-tight">
              {article.title}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-6 mt-6">
            <div className="flex items-center gap-3 bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-black text-xs">
                {article?.author.name?.charAt(0)}
              </div>
              <span className="text-sm font-bold tracking-wide uppercase">
                {article?.author.name}
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium bg-black/5 dark:bg-white/5 px-4 py-2 rounded-full">
              <ClockIcon className="w-4 h-4 text-primary" />
              <span>
                {formatDistanceToNowStrict(new Date(article.createdAt), {
                  addSuffix: true,
                })}
              </span>
            </div>
          </div>

          {article.author.email === session?.user.email && (
            <div className="flex gap-2 bg-black/5 dark:bg-white/5 rounded-2xl border border-black/5 dark:border-white/5 shadow-sm w-fit mt-4">
              <EditDialog article={article} id={id} session={session} />
              <DeleteButton session={session} id={id} />
            </div>
          )}
        </CardHeader>

        <div className="px-8 md:px-12 my-2">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-white/10 to-transparent" />
        </div>

        <CardContent className="p-8 md:p-12 pt-0">
          <p className="whitespace-pre-wrap text-lg md:text-xl leading-relaxed font-medium opacity-90 first-letter:text-5xl first-letter:font-black first-letter:mr-3 first-letter:float-left first-letter:text-primary">
            {article.content}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const session = await getServerSession(NEXT_AUTH_CONFIG);

  if (!session) {
    await signOut({ callbackUrl: "/" });
    return null;
  }

  return (
    <>
      <ScrollProgressBar />
      <div className=" mx-auto px-4 py-4">
        {/* <BackButton /> */}
        {/* <Breadcrumb /> */}

        <Suspense fallback={<SkeletonLoader />}>
          <ArticleContent id={id} session={session} />
        </Suspense>
      </div>
    </>
  );
}

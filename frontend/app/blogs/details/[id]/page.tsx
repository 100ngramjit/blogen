import { Suspense } from "react";
import axios from "axios";
import { CardHeader, CardTitle, CardContent, Card } from "@/components/ui/card";
import { NEXT_AUTH_CONFIG } from "@/lib/authconfig";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import BackButton from "@/app/_components/back-button";
import { EditDialog } from "@/app/_components/edit-dialog";
import { DeleteButton } from "@/app/_components/delete-button";
import { ClockIcon } from "lucide-react";
import { formatDistanceToNowStrict } from "date-fns";
import { ScrollProgressBar } from "@/app/_components/scroll-progress";

async function fetchArticle(id: string, jwtToken: string) {
  const headersList = {
    accept: "application/json",
    "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
    Authorization: `Bearer ${jwtToken}`,
    "Content-Type": "application/json",
  };

  const reqOptions = {
    url: `https://my-app.blogen.workers.dev/api/article/details/${id}`,
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
    <Card
      variant="static"
      className="bg-background rounded-lg overflow-hidden shadow-2xl "
    >
      <CardHeader>
        <CardTitle className="flex items-top justify-between">
          <p className="lg:text-4xl md:text-3xl sm:text-2xl">{article.title}</p>
          {article.author.email === session?.user.email && (
            <div className="flex justify-start">
              <EditDialog article={article} id={id} session={session} />
              <DeleteButton session={session} id={id} />
            </div>
          )}
        </CardTitle>
        <div className="flex items-center text-muted-foreground text-sm mb-4">
          by<span className="px-1">{article?.author.name}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <ClockIcon className="w-4 h-4" />
          <span>
            {formatDistanceToNowStrict(new Date(article.createdAt), {
              addSuffix: true,
            })}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="whitespace-pre-wrap">{article.content}</p>
      </CardContent>
    </Card>
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
      <div className="container mx-auto px-4 py-4">
        <BackButton />
        <Suspense fallback={<SkeletonLoader />}>
          <ArticleContent id={id} session={session} />
        </Suspense>
      </div>
    </>
  );
}

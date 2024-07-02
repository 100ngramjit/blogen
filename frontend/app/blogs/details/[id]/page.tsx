import axios from "axios";
import { CardHeader, CardTitle, CardContent, Card } from "@/components/ui/card";
import { NEXT_AUTH_CONFIG } from "@/lib/authconfig";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import BackButton from "@/app/_components/back-button";
import { EditDialog } from "@/app/_components/edit-dialog";
import { DeleteButton } from "@/app/_components/delete-button";
import { ClockIcon } from "lucide-react";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const session = await getServerSession(NEXT_AUTH_CONFIG);

  if (!session) {
    await signOut({ callbackUrl: "/" });
  }
  let headersList = {
    accept: "application/json",
    "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
    Authorization: `Bearer ${session?.user.jwtToken}`,
    "Content-Type": "application/json",
  };

  let reqOptions = {
    url: `https://my-app.blogen.workers.dev/api/article/details/${id}`,
    method: "GET",
    headers: headersList,
  };

  try {
    const response = await axios.request(reqOptions);
    const { article } = response.data;
    return (
      <div className="container mx-auto px-4 py-4">
        <BackButton />
        <Card className="bg-background rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-500">
          <CardHeader>
            <CardTitle className="flex items-top justify-between">
              <p className="text-4xl">{article.title}</p>
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
              <span>{new Date(article.createdAt).toLocaleString()}</span>
            </div>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap">{article.content}</p>
          </CardContent>
        </Card>
      </div>
    );
  } catch (error) {
    console.error("Error during API request:", error);
    return <div>Error fetching post details.</div>;
  }
}

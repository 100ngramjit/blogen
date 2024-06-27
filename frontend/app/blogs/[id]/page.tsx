import axios from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CardHeader, CardTitle, CardContent, Card } from "@/components/ui/card";
import { NEXT_AUTH_CONFIG } from "@/lib/authconfig";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import BackButton from "@/app/_components/back-button";

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
            <CardTitle>{article.title}</CardTitle>
            <div className="flex items-center text-muted-foreground text-sm mb-4">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span className="px-2">John Doe</span>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground whitespace-pre-wrap">
              {article.content}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  } catch (error) {
    console.error("Error during API request:", error);
    return <div>Error fetching post details.</div>;
  }
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getServerSession } from "next-auth";
import { NEXT_AUTH_CONFIG } from "../../lib/authconfig";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Page = async () => {
  const session = await getServerSession(NEXT_AUTH_CONFIG);
  console.log("session", session);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-4 text-center pb-8">
        <p className="text-lg">Quick glance</p>
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-extrabold">
          Stories & Ideas
        </h1>
        <p className="text-sm text-gray-500">
          The Latest Blogs according to your interests
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-background rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-500">
          <CardHeader>
            <CardTitle>Exploring the Wonders of Nature</CardTitle>
            <div className="flex items-center text-muted-foreground text-sm mb-4">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span className="px-2">John Doe</span>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground line-clamp-3">
              Discover the beauty and serenity of the great outdoors as we
              explore the wonders of nature in this captivating blog post. From
              towering mountains to serene forests, prepare to be amazed by the
              breathtaking sights that await.
            </p>
          </CardContent>
        </Card>
        <Card className="bg-background rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle>The Art of Mindful Living</CardTitle>
            <div className="flex items-center text-muted-foreground text-sm mb-4">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span className="px-2">Jane Smith</span>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground line-clamp-3">
              In this thought-provoking blog post, we explore the transformative
              power of mindfulness and how it can enrich our daily lives.
              Discover practical techniques to cultivate inner peace and find
              balance in the midst of our fast-paced world.
            </p>
          </CardContent>
        </Card>
        <Card className="bg-background rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle>The Future of Technology</CardTitle>
            <div className="flex items-center text-muted-foreground text-sm mb-4">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span className="px-2">Alex Johnson</span>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground line-clamp-3">
              Dive into the cutting-edge world of technology and explore the
              latest innovations that are shaping our future. From artificial
              intelligence to renewable energy, this blog post offers a glimpse
              into the exciting advancements that will transform the way we
              live, work, and interact with the world around us.
            </p>
          </CardContent>
        </Card>
        <Card className="bg-background rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle>The Art of Storytelling</CardTitle>
            <div className="flex items-center text-muted-foreground text-sm mb-4">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span className="px-2">Emily Davis</span>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground line-clamp-3">
              Discover the power of storytelling and how it can captivate and
              inspire audiences. In this blog post, we delve into the art of
              crafting compelling narratives that resonate with readers, and
              explore the ways in which storytelling can transform our
              perspectives and enrich our lives.
            </p>
          </CardContent>
        </Card>
        <Card className="bg-background rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle>The Importance of Self-Care</CardTitle>
            <div className="flex items-center text-muted-foreground text-sm mb-4">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span className="px-2">Michael Lee</span>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground line-clamp-3">
              In a world that often demands our constant attention and
              productivity, it's crucial to prioritize self-care. This blog post
              explores the transformative power of self-care practices and how
              they can help us maintain our physical, mental, and emotional
              well-being in the face of life's challenges.
            </p>
          </CardContent>
        </Card>
        <Card className="bg-background rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle>The Art of Sustainable Living</CardTitle>
            <div className="flex items-center text-muted-foreground text-sm mb-4">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span className="px-2">Sarah Wilson</span>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground line-clamp-3">
              In this thought-provoking blog post, we explore the principles of
              sustainable living and how we can all contribute to a more
              eco-friendly future. From reducing our carbon footprint to
              embracing renewable energy, discover practical tips and inspiring
              stories that will empower you to live a more sustainable
              lifestyle.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Page;

//TODO : integrate create post API

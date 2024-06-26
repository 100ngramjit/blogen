import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getServerSession } from "next-auth";
import { NEXT_AUTH_CONFIG } from "../../lib/authconfig";

const Page = async () => {
  const session = await getServerSession(NEXT_AUTH_CONFIG);
  console.log("session", session);
  return (
    <div className="pt-20">
      <div className="flex flex-col gap-5">
        <p className="text-sm text-center">Quick glance</p>

        <h1 className="text-8xl text-center font-extrabold">Stories & Ideas</h1>
        <p className="text-sm text-center text-gray-500">
          The Latest Blogs according to your interests
        </p>
      </div>
      <div className="flex justify-center">
        <div className="p-4 w-1/3 h-1/2">
          <Card>
            <CardContent className="h-max p-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              id consectetur elit, ut maximus elit. Praesent eu mauris sit amet
              lorem sodales egestas non nec massa. Vivamus ligula libero, mattis
              eu rutrum eget, vehicula sit amet dolor. Praesent ipsum leo,
              tempus id arcu et, consequat vulputate lacus. Duis tellus ex,
              eleifend non molestie vel, varius eget magna. Nullam tortor lorem,
              sagittis at turpis et, pulvinar consequat felis. Nunc non nisl
              lobortis felis pretium semper. Maecenas egestas nunc at molestie
              lacinia. Sed non maximus tellus. Nullam tortor lorem, sagittis at
              turpis et, pulvinar consequat felis. Nunc non nisl lobortis felis
              pretium semper.Nullam tortor lorem, sagittis at turpis et,
              pulvinar consequat felis. Nunc non nisl lobortis felis pretium
              semper.Nullam tortor lorem, sagittis at turpis et, pulvinar
              consequat felis. Nunc non nisl lobortis felis pretium
              semper.Nullam tortor lorem, sagittis at turpis et, pulvinar
              consequat felis. Nunc non nisl lobortis felis pretium semper.Nunc
              non nisl lobortis felis pretium semper.Nullam tortor lorem,
              sagittis at turpis et, pulvinar consequat felis.Nullam tortor
              lorem, sagittis at turpis et, pulvinar consequat felis. Nunc non
              nisl lobortis felis pretium semper.Nullam tortor lorem, sagittis
              at turpis et, pulvinar consequat felis. Nunc non nisl lobortis
              felis pretium semper.Nullam tortor lorem, sagittis at turpis et,
              pulvinar consequat felis. Nunc non nisl lobortis felis pretium
              semper.Nullam tortor lorem, sagittis at turpis et, pulvinar
              consequat felis. Nunc non nisl lobortis felis pretium semper.Nunc
              non nisl lobortis felis pretium semper.Nullam tortor lorem,
              sagittis at turpis et, pulvinar consequat felis
            </CardContent>
          </Card>
        </div>
        <div className="grid grid-cols-1 gap-2 p-4">
          {[1, 2, 3].map((_, index) => (
            <Card key={index} className="max-w-[240px]">
              <img
                src="https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                alt="Bold typography"
                className="w-full h-[100px] object-cover rounded-t-lg"
              />
              <CardHeader>
                <CardTitle className="text-md">This is the title</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <Badge variant="secondary" className="rounded-full text-xs">
                  8 min read
                </Badge>
                <span className="text-xs mx-2">27 Apr 2023</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
//TODO : integrate create post API

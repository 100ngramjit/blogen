import { NEXT_AUTH_CONFIG } from "@/lib/authconfig";
import axios from "axios";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const session = await getServerSession(NEXT_AUTH_CONFIG);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let headersList = {
      accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
      "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
      Authorization: `Bearer ${session.user.jwtToken}`,
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify(body);

    let reqOptions = {
      url: "https://my-app.blogen.workers.dev/api/article",
      method: "POST",
      headers: headersList,
      data: bodyContent,
    };

    let response = await axios.request(reqOptions);
    return NextResponse.json({
      res: response.data,
    });
  } catch (error) {
    console.error("Error during API request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

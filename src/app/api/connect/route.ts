import { auth } from "@/auth";
import { corsair } from "@/server/corsair";
import { generateOAuthUrl } from "corsair/oauth";
import { NextResponse } from "next/server";


const REDIRECT_URI = `${process.env.AUTH_URL}/api/auth`;

export async function GET(request: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const plugin = searchParams.get("plugin");

  if (!plugin) {
    return new NextResponse("Missing plugin", { status: 400 });
  }

  const { url, state } = await generateOAuthUrl(corsair, plugin, {
    tenantId: session.user.id,
    redirectUri: REDIRECT_URI,
  });

  const response = NextResponse.redirect(url);

  response.cookies.set("oauth_state", state, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 600,
  });

  return response;
}

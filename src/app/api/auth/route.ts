import { corsair } from "@/server/corsair";
import { processOAuthCallback } from "corsair/oauth";
import { NextResponse } from "next/server";

const REDIRECT_URI = `${process.env.AUTH_URL}/api/auth`;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const code = searchParams.get("code");
  const state = searchParams.get("state");

  if (!code || !state) {
    const response = new NextResponse("Missing code or state", {
      status: 400,
    });

    response.cookies.delete("oauth_state");
    return response;
  }

  const cookieStore = request.headers
    .get("cookie")
    ?.split("; ")
    .find((cookie) => cookie.startsWith("oauth_state="));

  const storedState = cookieStore?.split("=")[1];

  if (!storedState || storedState !== state) {
    const response = new NextResponse("Invalid state", {
      status: 400,
    });

    response.cookies.delete("oauth_state");
    return response;
  }

  try {
    const result = await processOAuthCallback(corsair, {
      code,
      state,
      redirectUri: REDIRECT_URI,
    });

    const response = NextResponse.redirect(
      `${process.env.AUTH_URL}/dashboard?connected=${result.plugin}`,
    );

    response.cookies.delete("oauth_state");

    return response;
  } catch (error) {
    console.error(error);

    const response = new NextResponse("OAuth failed", {
      status: 500,
    });

    response.cookies.delete("oauth_state");

    return response;
  }
}

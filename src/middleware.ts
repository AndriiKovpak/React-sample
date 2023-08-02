import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { authControllerVerifyEmail } from "./rest/apiComponents";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/auth/verify-email")) {
    const tokenId = request.nextUrl.searchParams.get("token");
    if (!tokenId) return NextResponse.rewrite(new URL("/auth/login", request.url));
    await authControllerVerifyEmail({ body: { tokenId } });
    return NextResponse.rewrite(new URL("/auth/login", request.url));
  }
  throw new Error("middleware not implemented");
}

export const config = {
  matcher: ["/auth/verify-email"],
};

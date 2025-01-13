import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let token = request.cookies.get("jwtToken")?.value;

  const { pathname } = request.nextUrl;
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  if (!BASE_URL) {
    console.error("환경 변수가 설정되지 않았습니다: NEXT_PUBLIC_BASE_URL");
    return NextResponse.next();
  }

  let isTokenValid = false;

  if (token) {
    try {
      const response = await fetch(`${BASE_URL}/user/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });

      isTokenValid = response.ok;
    } catch (error) {
      console.error("토큰 검증 실패:", error);
    }
  }

  if (pathname === "/login" || pathname === "/register") {
    if (isTokenValid) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (token && !isTokenValid) {
      const response = NextResponse.next();
      response.cookies.delete("jwtToken");
      return response;
    }

    return NextResponse.next();
  }
  if (!token || !isTokenValid) {
    const response = NextResponse.redirect(new URL("/login", request.url));
    if (token) {
      response.cookies.delete("jwtToken");
    }
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"]
};

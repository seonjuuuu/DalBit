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
  if (pathname === "/login") {
    if (token) {
      try {
        const response = await fetch(`${BASE_URL}/user/me`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        });

        if (response.ok) {
          return NextResponse.redirect(new URL("/", request.url));
        }
      } catch (error) {
        console.error("토큰 검증 실패:", error);
      }
    }
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"]
};

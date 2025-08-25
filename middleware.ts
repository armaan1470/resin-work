import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest } from "next/server";

// Create middleware for development mode
const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  // Only run middleware in development mode
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};

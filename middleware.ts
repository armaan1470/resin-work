import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest } from "next/server";

// Create middleware for internationalization
const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  // Run middleware in development mode
  if (process.env.NODE_ENV === "development") {
    return intlMiddleware(request);
  }

  // For static exports, the post-build script handles redirects
  // This middleware won't run in production static builds
  return;
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};

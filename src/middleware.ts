export { auth as middleware } from "@/lib/auth";

export const config = {
  // Protect all /admin/* routes (the actual URL segment, not the route group)
  matcher: ["/admin/:path*"],
};

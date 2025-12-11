import { auth } from "@/lib/authHelper";
import { NextResponse } from "next/server";

export async function middleware(request) {
    const session = await auth();
    const { pathname } = request.nextUrl;

    // Protect admin routes
    if (pathname.startsWith("/admin")) {
        if (!session?.user) {
            return NextResponse.redirect(new URL("/login?callbackUrl=" + pathname, request.url));
        }

        if (session.user.role !== "admin") {
            return NextResponse.redirect(new URL("/", request.url));
        }
    }

    // Protect user routes
    if (pathname.startsWith("/profile") || pathname.startsWith("/orders")) {
        if (!session?.user) {
            return NextResponse.redirect(new URL("/login?callbackUrl=" + pathname, request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/profile", "/orders", "/admin/:path*"],
};

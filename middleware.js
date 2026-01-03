import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request) {
    const { pathname } = request.nextUrl;
    
    try {
        // Get the token using next-auth/jwt which works in Edge runtime
        const token = await getToken({ 
            req: request,
            secret: process.env.NEXTAUTH_SECRET 
        });

        // Protect admin routes
        if (pathname.startsWith("/admin")) {
            if (!token) {
                return NextResponse.redirect(new URL("/login?callbackUrl=" + pathname, request.url));
            }

            if (token.role !== "admin") {
                return NextResponse.redirect(new URL("/", request.url));
            }
        }

        // Protect user routes
        if (pathname.startsWith("/profile") || pathname.startsWith("/orders")) {
            if (!token) {
                return NextResponse.redirect(new URL("/login?callbackUrl=" + pathname, request.url));
            }
        }

        return NextResponse.next();
    } catch (error) {
        console.error("Middleware error:", error);
        return NextResponse.next();
    }
}

export const config = {
    matcher: ["/profile", "/orders", "/admin/:path*"],
};

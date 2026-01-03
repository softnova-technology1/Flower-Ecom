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

        console.log("🔒 Middleware:", pathname, "| Token:", token ? `User: ${token.email}, Role: ${token.role}` : "No token");

        // Protect admin routes
        if (pathname.startsWith("/admin")) {
            if (!token) {
                console.log("❌ No token - redirecting to login");
                return NextResponse.redirect(new URL("/login?callbackUrl=" + pathname, request.url));
            }

            if (token.role !== "admin") {
                console.log("❌ Not admin - role:", token.role, "- redirecting to home");
                return NextResponse.redirect(new URL("/", request.url));
            }
            
            console.log("✅ Admin access granted");
        }

        // Protect user routes
        if (pathname.startsWith("/profile") || pathname.startsWith("/orders")) {
            if (!token) {
                return NextResponse.redirect(new URL("/login?callbackUrl=" + pathname, request.url));
            }
        }

        return NextResponse.next();
    } catch (error) {
        console.error("❌ Middleware error:", error);
        return NextResponse.next();
    }
}

export const config = {
    matcher: ["/profile", "/orders", "/admin/:path*"],
};

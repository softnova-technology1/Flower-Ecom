import { auth } from "@/lib/authHelper";
import { NextResponse } from "next/server";

export async function checkAdminAuth() {
    const session = await auth();

    if (!session?.user) {
        return {
            authorized: false,
            error: "Not authenticated",
            redirect: "/login",
        };
    }

    if (session.user.role !== "admin") {
        return {
            authorized: false,
            error: "Not authorized - Admin access required",
            redirect: "/",
        };
    }

    return {
        authorized: true,
        user: session.user,
    };
}

export function unauthorizedResponse(message = "Unauthorized") {
    return NextResponse.json(
        { success: false, error: message },
        { status: 401 }
    );
}

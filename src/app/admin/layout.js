"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import styles from "@/styles/AdminLayout.module.css";

export default function AdminLayout({ children }) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "loading") return; // Wait for session to load

        if (status === "unauthenticated") {
            router.push("/login");
            return;
        }

        if (session && session.user?.role !== "admin") {
            router.push("/");
        }
    }, [session, status, router]);

    if (status === "loading") {
        return (
            <div className={styles.loading}>
                <h2>Loading...</h2>
            </div>
        );
    }

    if (!session) {
        return null; // Will redirect via useEffect
    }

    if (session.user?.role !== "admin") {
        return null; // Will redirect via useEffect
    }

    return (
        <div className={styles.adminLayout}>
            <AdminSidebar />
            <main className={styles.mainContent}>{children}</main>
        </div>
    );
}

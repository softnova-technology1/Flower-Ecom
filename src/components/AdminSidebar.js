"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import styles from "@/styles/AdminSidebar.module.css";

export default function AdminSidebar() {
    const pathname = usePathname();

    const navLinks = [
        { href: "/admin", label: "Dashboard", icon: "📊" },
        { href: "/admin/orders", label: "Orders", icon: "📦" },
        { href: "/admin/products", label: "Products", icon: "🛍️" },
        { href: "/admin/users", label: "Users", icon: "👥" },
    ];

    const handleLogout = async () => {
        await signOut({ redirect: true, callbackUrl: "/" });
    };

    return (
        <div className={styles.sidebar}>
            <div className={styles.header}>
                <h2 className={styles.title}>Admin Panel</h2>
            </div>

            <nav className={styles.nav}>
                {navLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={`${styles.navLink} ${pathname === link.href ? styles.active : ""
                            }`}
                    >
                        <span className={styles.icon}>{link.icon}</span>
                        <span>{link.label}</span>
                    </Link>
                ))}
            </nav>

            <div className={styles.footer}>
                <Link href="/" className={styles.backLink}>
                    ← Back to Store
                </Link>
                <button onClick={handleLogout} className={styles.logoutBtn}>
                    Logout
                </button>
            </div>
        </div>
    );
}

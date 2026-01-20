"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
    MdDashboard,
    MdShoppingCart,
    MdInventory,
    MdPeople,
    MdStorefront,
    MdLogout,
    MdArrowBack,
    MdDescription
} from "react-icons/md";
import styles from "@/styles/AdminSidebar.module.css";

export default function AdminSidebar() {
    const pathname = usePathname();

    const navLinks = [
        { href: "/admin", label: "Dashboard", icon: MdDashboard },
        { href: "/admin/orders", label: "Orders", icon: MdShoppingCart },
        { href: "/admin/products", label: "Products", icon: MdInventory },
        { href: "/admin/blogs/add", label: "Add Blog", icon: MdDescription },
        { href: "/admin/users", label: "Users", icon: MdPeople },
    ];

    const handleLogout = async () => {
        await signOut({ redirect: true, callbackUrl: "/" });
    };

    return (
        <div className={styles.sidebar}>
            <div className={styles.header}>
                <MdStorefront className={styles.logo} />
                <h2 className={styles.title}>Flower Shop</h2>
                <p className={styles.subtitle}>Admin Panel</p>
            </div>

            <nav className={styles.nav}>
                {navLinks.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href;

                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`${styles.navLink} ${isActive ? styles.active : ""}`}
                        >
                            <Icon className={styles.icon} />
                            <span>{link.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className={styles.footer}>
                <Link href="/" className={styles.backLink}>
                    <MdArrowBack className={styles.backIcon} />
                    <span>Back to Store</span>
                </Link>
                <button onClick={handleLogout} className={styles.logoutBtn}>
                    <MdLogout className={styles.logoutIcon} />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
}

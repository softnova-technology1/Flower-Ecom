"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useCart } from "@/context/CartContext";
import styles from "@/styles/Navbar.module.css";

export default function Navbar() {
    const [openDropdown, setOpenDropdown] = useState(false);
    const [openCart, setOpenCart] = useState(false);
    const [openUserMenu, setOpenUserMenu] = useState(false);
    const { cart } = useCart();
    const { data: session, status } = useSession();

    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    const handleLogout = async () => {
        await signOut({ redirect: true, callbackUrl: "/" });
    };

    return (
        <>
            <div className={styles.navbar1}>
                <header className={styles.navbar}>
                    <div className={styles.logoSection}>
                        <h1 className={styles.logoIcon}>Dazzling Sky</h1>

                        <nav className={styles.navLinks}>
                            <Link href="/">Home</Link>
                            <Link href="/about">About</Link>
                            <Link href="/products">Products</Link>

                            <div className={styles.dropdown}>
                                <span
                                    className={styles.dropBtn}
                                    onClick={() => setOpenDropdown(!openDropdown)}
                                >
                                    Pages ▾
                                </span>

                                {openDropdown && (
                                    <div className={styles.dropdownMenu}>
                                        <Link href="/blog">Blog</Link>
                                        <Link href="/faq">FAQ</Link>
                                    </div>
                                )}
                            </div>

                            <Link href="/contact">Contact</Link>
                        </nav>
                    </div>

                    <div className={styles.rightSection}>
                        {/* User Menu */}
                        {status === "loading" ? (
                            <div className={styles.userSection}>
                                <span>Loading...</span>
                            </div>
                        ) : session ? (
                            <div className={styles.userSection}>
                                <div
                                    className={styles.userButton}
                                    onClick={() => setOpenUserMenu(!openUserMenu)}
                                >
                                    <span className={styles.userIcon}>👤</span>
                                    <span className={styles.userName}>{session.user.name}</span>
                                    <span className={styles.dropArrow}>▾</span>
                                </div>

                                {openUserMenu && (
                                    <div className={styles.userDropdown}>
                                        <Link href="/profile" onClick={() => setOpenUserMenu(false)}>
                                            Profile
                                        </Link>
                                        <Link href="/orders" onClick={() => setOpenUserMenu(false)}>
                                            My Orders
                                        </Link>
                                        <button onClick={handleLogout} className={styles.logoutBtn}>
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className={styles.authLinks}>
                                <Link href="/login" className={styles.loginLink}>Login</Link>
                                <Link href="/register" className={styles.registerLink}>Register</Link>
                            </div>
                        )}

                        {/* Cart Section */}
                        <div className={styles.cartSection} onClick={() => setOpenCart(true)}>
                            <span className={styles.price}>${totalPrice.toFixed(2)}</span>

                            <div className={styles.cartIcon}>
                                🛒
                                <span className={styles.cartCount}>{totalItems}</span>
                            </div>
                        </div>
                    </div>
                </header>
            </div>

            {/* ---------- CART DRAWER ---------- */}
            <div className={`${styles.offCanvas} ${openCart ? styles.showCart : ""}`}>
                <div className={styles.cartHeader}>
                    <h3>Your Cart</h3>
                    <button onClick={() => setOpenCart(false)}>✕</button>
                </div>

                <div className={styles.cartItems}>
                    {cart.length === 0 ? (
                        <p>Your cart is empty</p>
                    ) : (
                        cart.map((item, index) => (
                            <div className={styles.cartItem} key={index}>
                                <img src={item.image} alt={item.name} className={styles.cartItemImage} />
                                <div className={styles.cartItemInfo}>
                                    <p className={styles.itemName}>{item.name}</p>
                                    <p className={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* ------ VIEW CART BUTTON ------ */}
                <Link href="/cart">
                    <button className={styles.viewCartBtn} onClick={() => setOpenCart(false)}>
                        View Cart
                    </button>
                </Link>
            </div>

            {/* Overlay */}
            {openCart && <div className={styles.cartOverlay} onClick={() => setOpenCart(false)}></div>}
        </>
    );
}

"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";
import { newsletterAPI } from "@/lib/api";
import styles from "@/styles/Footer.module.css";

const Footer = () => {
    const contentRef = useRef(null);
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(styles.show);
                    }
                });
            },
            { threshold: 0.3 }
        );

        const currentContent = contentRef.current;

        if (currentContent) observer.observe(currentContent);

        return () => {
            if (currentContent) observer.unobserve(currentContent);
        };
    }, []);

    const handleSubscribe = async (e) => {
        e.preventDefault();

        if (!email.trim()) {
            toast.error("Please enter your email", {
                position: "top-center",
            });
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            toast.error("Please enter a valid email", {
                position: "top-center",
            });
            return;
        }

        setLoading(true);

        try {
            const response = await newsletterAPI.subscribe(email);

            if (response.success) {
                toast.success("Successfully subscribed to newsletter!", {
                    position: "top-center",
                });
                setEmail(""); // Clear input
            }
        } catch (error) {
            toast.error(error.message || "Failed to subscribe. Please try again.", {
                position: "top-center",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <footer className={styles.footer}>
            <div ref={contentRef} className={styles.fadeUp}>
                <div className={styles.topGrid}>
                    <div>
                        <h3 className={styles.heading1}>Quick Menu</h3>
                        <ul className={styles.menuList}>
                            <li>Wishlist</li>
                            <li>Voucher</li>
                            <li>Payment</li>
                            <li>Guarantee</li>
                            <li>Free Shipping</li>
                        </ul>
                    </div>

                    <div className={styles.centerBox}>
                        <h2 className={styles.subscribeTitle}>
                            Subscribe and Grab <span>70% Off</span>
                        </h2>
                        <p className={styles.subText}>
                            I am text block. Click edit button to change this text. Lorem ipsum
                            dolor sit amet.
                        </p>

                        <form onSubmit={handleSubscribe}>
                            <div className={styles.inputRow}>
                                <input
                                    className={styles.input}
                                    type="email"
                                    placeholder="Enter your email here"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={loading}
                                />
                            </div>

                            <button
                                type="submit"
                                className={styles.emailBtn}
                                disabled={loading}
                            >
                                {loading ? "Subscribing..." : "Send Email"}
                            </button>
                        </form>
                    </div>

                    <div>
                        <h3 className={styles.heading}>Contact Us</h3>
                        <div className={styles.contactInfo}>
                            <p className={styles.label}>Call Us</p>
                            <p>+1 234 567 89</p>

                            <p className={styles.label}>Email</p>
                            <p>example@domain.com</p>

                            <p className={styles.label}>Address</p>
                            <p>Singapore</p>
                        </div>
                    </div>
                </div>

                <div className={styles.divider}></div>

                <div className={styles.middleRow}>
                    <ul className={styles.bottomMenu}>
                        <li onClick={() => router.push("/")}>Home</li>
                        <li onClick={() => router.push("/about")}>About Us</li>
                        <li onClick={() => router.push("/blog")}>Blog</li>
                    </ul>

                    <div className={styles.logo}>
                        <h1 className={styles.logoIcon}>Dazzling Sky</h1>
                    </div>

                    <div className={styles.social}>
                        <span>Follow Us</span>
                        <RxCross2 />
                        <FaFacebookF />
                        <FaInstagram />
                        <FaTiktok />
                    </div>
                </div>

                <div className={styles.divider}></div>

                <p className={styles.copy}>Softnova Technology</p>
            </div>
        </footer>
    );
};

export default Footer;
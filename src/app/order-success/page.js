"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import PageWrapper from "@/components/PageWrapper";
import styles from "@/styles/OrderSucces.module.css";
import FinalNav from "@/components/FinalNav";

export default function OrderSuccessPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const orderId = searchParams.get("orderId");

    return (
        <>
            <ScrollToTop />
            <FinalNav />
            <PageWrapper>
                <div className={styles.successPage}>
                    <div className={styles.successBox}>
                        <div className={styles.checkmark}>✓</div>
                        <h1>Order Placed Successfully!</h1>
                        <p>Thank you for your purchase. Your order has been confirmed.</p>
                        {orderId && (
                            <p className={styles.orderNumber}>
                                Order ID: {orderId.slice(-8).toUpperCase()}
                            </p>
                        )}
                        <p className={styles.infoText}>
                            We'll send you an email confirmation shortly with your order details.
                        </p>

                        <div className={styles.buttonGroup}>
                            <button
                                className={styles.continueBtn}
                                onClick={() => router.push("/products")}
                            >
                                Continue Shopping
                            </button>
                            <button
                                className={styles.homeBtn}
                                onClick={() => router.push("/")}
                            >
                                Go to Home
                            </button>
                        </div>
                    </div>
                </div>
                <Footer />
            </PageWrapper>
        </>
    );
}

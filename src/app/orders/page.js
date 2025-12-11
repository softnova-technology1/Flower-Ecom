"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageWrapper from "@/components/PageWrapper";
import styles from "@/styles/Orders.module.css";

export default function OrdersPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login?callbackUrl=/orders");
        }
        if (session?.user) {
            fetchOrders();
        }
    }, [session, status, router]);

    const fetchOrders = async () => {
        try {
            const response = await fetch("/api/orders");
            const data = await response.json();

            if (data.success) {
                setOrders(data.orders || []);
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusBadge = (status) => {
        const statusColors = {
            pending: "#ffa500",
            processing: "#2196f3",
            shipped: "#9c27b0",
            delivered: "#4caf50",
            cancelled: "#f44336",
        };

        return {
            backgroundColor: statusColors[status] || "#999",
            color: "white",
            padding: "4px 12px",
            borderRadius: "12px",
            fontSize: "12px",
            fontWeight: "600",
            textTransform: "capitalize",
        };
    };

    if (status === "loading" || loading) {
        return (
            <>
                <Navbar />
                <div style={{ textAlign: "center", padding: "100px 20px" }}>
                    <h2>Loading orders...</h2>
                </div>
                <Footer />
            </>
        );
    }

    if (!session) {
        return null;
    }

    return (
        <>
            <Navbar />
            <PageWrapper>
                <div className={styles.container}>
                    <h1 className={styles.title}>My Orders</h1>

                    {orders.length === 0 ? (
                        <div className={styles.emptyState}>
                            <h3>No orders yet</h3>
                            <p>Start shopping to see your orders here</p>
                            <button
                                onClick={() => router.push("/products")}
                                className={styles.shopBtn}
                            >
                                Browse Products
                            </button>
                        </div>
                    ) : (
                        <div className={styles.ordersList}>
                            {orders.map((order) => (
                                <div key={order._id} className={styles.orderCard}>
                                    <div className={styles.orderHeader}>
                                        <div>
                                            <h3>Order #{order._id.slice(-8).toUpperCase()}</h3>
                                            <p className={styles.orderDate}>
                                                {new Date(order.createdAt).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })}
                                            </p>
                                        </div>
                                        <span style={getStatusBadge(order.status)}>
                                            {order.status}
                                        </span>
                                    </div>

                                    <div className={styles.orderItems}>
                                        {order.items.map((item, index) => (
                                            <div key={index} className={styles.orderItem}>
                                                <span>{item.name}</span>
                                                <span>
                                                    {item.quantity} x ${item.price.toFixed(2)}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className={styles.orderFooter}>
                                        <div className={styles.orderAddress}>
                                            <strong>Delivery Address:</strong>
                                            <p>
                                                {order.shippingAddress.address}, {order.shippingAddress.city}
                                            </p>
                                        </div>
                                        <div className={styles.orderTotal}>
                                            <strong>Total:</strong>
                                            <span className={styles.totalAmount}>
                                                ${order.totalAmount.toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <Footer />
            </PageWrapper>
        </>
    );
}

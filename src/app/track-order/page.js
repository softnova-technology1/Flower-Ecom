"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import FinalNav from "@/components/FinalNav";
import Footer from "@/components/Footer";
import { Container } from "react-bootstrap";
import styles from "@/styles/TrackOrder.module.css";

export default function TrackOrderPage() {
    const [trackingNumber, setTrackingNumber] = useState("");
    const [orderId, setOrderId] = useState("");
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searchType, setSearchType] = useState("tracking"); // tracking or orderId

    const handleTrack = async () => {
        const searchValue = searchType === "tracking" ? trackingNumber : orderId;

        if (!searchValue.trim()) {
            toast.error(`Please enter ${searchType === "tracking" ? "tracking number" : "order ID"}`);
            return;
        }

        setLoading(true);

        try {
            const endpoint = searchType === "tracking" 
                ? `/api/orders/track?trackingNumber=${searchValue}`
                : `/api/orders/${searchValue}`;

            const response = await fetch(endpoint);
            const data = await response.json();

            if (data.success) {
                setOrder(data.order);
            } else {
                toast.error(data.error || "Order not found");
                setOrder(null);
            }
        } catch (error) {
            console.error("Error tracking order:", error);
            toast.error("Failed to track order. Please try again.");
            setOrder(null);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        const colors = {
            pending_payment: "#fbbf24",
            payment_received: "#60a5fa",
            confirmed: "#3b82f6",
            preparing: "#8b5cf6",
            out_for_delivery: "#f59e0b",
            delivered: "#10b981",
            cancelled: "#ef4444",
        };
        return colors[status] || "#6b7280";
    };

    const getStatusLabel = (status) => {
        const labels = {
            pending_payment: "Pending Payment",
            payment_received: "Payment Received",
            confirmed: "Order Confirmed",
            preparing: "Preparing Bouquet",
            out_for_delivery: "Out for Delivery",
            delivered: "Delivered",
            cancelled: "Cancelled",
        };
        return labels[status] || status;
    };

    const getStatusIcon = (status) => {
        const icons = {
            pending_payment: "💳",
            payment_received: "✅",
            confirmed: "📞",
            preparing: "💐",
            out_for_delivery: "🚚",
            delivered: "🎉",
            cancelled: "❌",
        };
        return icons[status] || "📦";
    };

    const statusFlow = [
        { key: "pending_payment", label: "Payment" },
        { key: "payment_received", label: "Verification" },
        { key: "confirmed", label: "Confirmed" },
        { key: "preparing", label: "Preparing" },
        { key: "out_for_delivery", label: "On the Way" },
        { key: "delivered", label: "Delivered" },
    ];

    const getCurrentStepIndex = () => {
        if (!order) return -1;
        return statusFlow.findIndex(s => s.key === order.status);
    };

    return (
        <>
            <FinalNav />
            <div className={styles.trackPage}>
                <Container>
                    <div className={styles.wrapper}>
                        <h1>Track Your Order</h1>
                        <p className={styles.subtitle}>
                            Enter your tracking number or order ID to check delivery status
                        </p>

                        {/* Search Box */}
                        <div className={styles.searchBox}>
                            <div className={styles.tabs}>
                                <button
                                    className={searchType === "tracking" ? styles.activeTab : ""}
                                    onClick={() => setSearchType("tracking")}
                                >
                                    Tracking Number
                                </button>
                                <button
                                    className={searchType === "orderId" ? styles.activeTab : ""}
                                    onClick={() => setSearchType("orderId")}
                                >
                                    Order ID
                                </button>
                            </div>

                            <div className={styles.inputGroup}>
                                {searchType === "tracking" ? (
                                    <input
                                        type="text"
                                        placeholder="Enter tracking number (e.g., TRK123456)"
                                        value={trackingNumber}
                                        onChange={(e) => setTrackingNumber(e.target.value.toUpperCase())}
                                        className={styles.input}
                                    />
                                ) : (
                                    <input
                                        type="text"
                                        placeholder="Enter order ID"
                                        value={orderId}
                                        onChange={(e) => setOrderId(e.target.value)}
                                        className={styles.input}
                                    />
                                )}
                                <button
                                    onClick={handleTrack}
                                    className={styles.trackBtn}
                                    disabled={loading}
                                >
                                    {loading ? "Tracking..." : "Track Order"}
                                </button>
                            </div>
                        </div>

                        {/* Order Details */}
                        {order && (
                            <div className={styles.orderDetails}>
                                {/* Header */}
                                <div className={styles.orderHeader}>
                                    <div>
                                        <h2>Order #{order._id.slice(-8).toUpperCase()}</h2>
                                        {order.trackingNumber && (
                                            <p className={styles.trackingNum}>
                                                Tracking: {order.trackingNumber}
                                            </p>
                                        )}
                                    </div>
                                    <div className={styles.statusBadge} style={{ background: getStatusColor(order.status) }}>
                                        {getStatusIcon(order.status)} {getStatusLabel(order.status)}
                                    </div>
                                </div>

                                {/* Status Timeline */}
                                <div className={styles.timeline}>
                                    {statusFlow.map((step, index) => {
                                        const currentIndex = getCurrentStepIndex();
                                        const isCompleted = index <= currentIndex;
                                        const isCurrent = index === currentIndex;

                                        return (
                                            <div key={step.key} className={styles.timelineStep}>
                                                <div
                                                    className={`${styles.stepCircle} ${
                                                        isCompleted ? styles.completed : ""
                                                    } ${isCurrent ? styles.current : ""}`}
                                                >
                                                    {isCompleted ? "✓" : index + 1}
                                                </div>
                                                <p className={styles.stepLabel}>{step.label}</p>
                                                {index < statusFlow.length - 1 && (
                                                    <div
                                                        className={`${styles.stepLine} ${
                                                            isCompleted ? styles.completedLine : ""
                                                        }`}
                                                    />
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Two Columns */}
                                <div className={styles.detailsGrid}>
                                    {/* Left - Order Items */}
                                    <div className={styles.itemsSection}>
                                        <h3>Order Items</h3>
                                        {order.items.map((item, index) => (
                                            <div key={index} className={styles.item}>
                                                <img src={item.image} alt={item.name} />
                                                <div className={styles.itemInfo}>
                                                    <p className={styles.itemName}>{item.name}</p>
                                                    <p className={styles.itemQty}>
                                                        Quantity: {item.quantity}
                                                    </p>
                                                </div>
                                                <p className={styles.itemPrice}>
                                                    {item.price * item.quantity} SGD
                                                </p>
                                            </div>
                                        ))}

                                        <div className={styles.totalRow}>
                                            <span>Total</span>
                                            <span>{order.totalPrice} SGD</span>
                                        </div>
                                    </div>

                                    {/* Right - Delivery Info */}
                                    <div className={styles.infoSection}>
                                        <h3>Delivery Information</h3>
                                        
                                        <div className={styles.infoBox}>
                                            <p className={styles.infoLabel}>Recipient</p>
                                            <p className={styles.infoValue}>{order.shippingAddress.name}</p>
                                        </div>

                                        <div className={styles.infoBox}>
                                            <p className={styles.infoLabel}>Phone</p>
                                            <p className={styles.infoValue}>{order.shippingAddress.phone}</p>
                                        </div>

                                        <div className={styles.infoBox}>
                                            <p className={styles.infoLabel}>Address</p>
                                            <p className={styles.infoValue}>
                                                {order.shippingAddress.street}, {order.shippingAddress.city}
                                            </p>
                                        </div>

                                        {order.deliveryDate && (
                                            <div className={styles.infoBox}>
                                                <p className={styles.infoLabel}>Scheduled Delivery</p>
                                                <p className={styles.infoValue}>
                                                    {order.deliveryDate} at {order.deliveryTime}
                                                </p>
                                            </div>
                                        )}

                                        {order.deliveryPartner?.name && (
                                            <div className={styles.infoBox}>
                                                <p className={styles.infoLabel}>Delivery Partner</p>
                                                <p className={styles.infoValue}>
                                                    {order.deliveryPartner.name}
                                                    <br />
                                                    📞 {order.deliveryPartner.phone}
                                                </p>
                                            </div>
                                        )}

                                        {order.isPaid && (
                                            <div className={styles.paymentBadge}>
                                                ✓ Payment Verified
                                            </div>
                                        )}

                                        {order.customerConfirmed && (
                                            <div className={styles.confirmBadge}>
                                                ✓ Order Confirmed by You
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Need Help Section */}
                                <div className={styles.helpSection}>
                                    <p>Need help with your order?</p>
                                    <a href="/contact" className={styles.contactBtn}>
                                        Contact Us
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                </Container>
            </div>
            <Footer />
        </>
    );
}


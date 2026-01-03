"use client";

import React, { useState, useEffect } from "react";
import { 
    MdShoppingCart, 
    MdAttachMoney, 
    MdInventory, 
    MdPeople,
    MdTrendingUp,
    MdAccessTime
} from "react-icons/md";
import styles from "@/styles/AdminDashboard.module.css";

export default function AdminDashboard() {
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAnalytics();
    }, []);

    const fetchAnalytics = async () => {
        try {
            const response = await fetch("/api/admin/analytics");
            const data = await response.json();

            if (data.success) {
                setAnalytics(data.analytics);
            }
        } catch (error) {
            console.error("Error fetching analytics:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className={styles.loading}>
                <div className={styles.spinner}></div>
                <p>Loading analytics...</p>
            </div>
        );
    }

    if (!analytics) {
        return <div className={styles.error}>Failed to load analytics</div>;
    }

    const metrics = [
        {
            icon: MdShoppingCart,
            label: "Total Orders",
            value: analytics.totalOrders,
            color: "#3b82f6",
            bgColor: "rgba(59, 130, 246, 0.1)"
        },
        {
            icon: MdAttachMoney,
            label: "Total Revenue",
            value: `$${analytics.totalRevenue.toFixed(2)}`,
            color: "#10b981",
            bgColor: "rgba(16, 185, 129, 0.1)"
        },
        {
            icon: MdInventory,
            label: "Total Products",
            value: analytics.totalProducts,
            color: "#f59e0b",
            bgColor: "rgba(245, 158, 11, 0.1)"
        },
        {
            icon: MdPeople,
            label: "Total Users",
            value: analytics.totalUsers,
            color: "#8b5cf6",
            bgColor: "rgba(139, 92, 246, 0.1)"
        }
    ];

    return (
        <div className={styles.dashboard}>
            <div className={styles.titleBar}>
                <div>
                    <h1 className={styles.title}>Dashboard</h1>
                    <p className={styles.welcomeText}>Welcome back! Here's what's happening today.</p>
                </div>
                <div className={styles.dateTime}>
                    <MdAccessTime />
                    <span>{new Date().toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                    })}</span>
                </div>
            </div>

            {/* Metrics Cards */}
            <div className={styles.metricsGrid}>
                {metrics.map((metric, index) => {
                    const Icon = metric.icon;
                    return (
                        <div key={index} className={styles.metricCard} style={{ borderTop: `3px solid ${metric.color}` }}>
                            <div className={styles.metricIcon} style={{ 
                                background: metric.bgColor,
                                color: metric.color
                            }}>
                                <Icon />
                            </div>
                            <div className={styles.metricInfo}>
                                <h3>{metric.label}</h3>
                                <p className={styles.metricValue}>{metric.value}</p>
                            </div>
                            <div className={styles.metricTrend}>
                                <MdTrendingUp style={{ color: metric.color }} />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Recent Orders */}
            <div className={styles.section}>
                <h2>Recent Orders</h2>
                <div className={styles.table}>
                    <table>
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {analytics.recentOrders.map((order) => (
                                <tr key={order._id}>
                                    <td>#{order._id.slice(-8).toUpperCase()}</td>
                                    <td>
                                        {order.user?.name || order.guestEmail || "Guest"}
                                    </td>
                                    <td>${order.totalPrice.toFixed(2)}</td>
                                    <td>
                                        <span className={`${styles.badge} ${styles[order.status]}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td>
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Revenue Chart */}
            <div className={styles.section}>
                <h2>Revenue (Last 7 Days)</h2>
                <div className={styles.chartContainer}>
                    {analytics.revenueByDay.map((day) => (
                        <div key={day._id} className={styles.chartBar}>
                            <div
                                className={styles.bar}
                                style={{
                                    height: `${(day.revenue / Math.max(...analytics.revenueByDay.map(d => d.revenue))) * 200}px`
                                }}
                            >
                                <span className={styles.barValue}>
                                    ${day.revenue.toFixed(0)}
                                </span>
                            </div>
                            <span className={styles.barLabel}>
                                {new Date(day._id).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

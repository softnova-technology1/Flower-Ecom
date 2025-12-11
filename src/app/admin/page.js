"use client";

import React, { useState, useEffect } from "react";
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
        return <div className={styles.loading}>Loading analytics...</div>;
    }

    if (!analytics) {
        return <div className={styles.error}>Failed to load analytics</div>;
    }

    return (
        <div className={styles.dashboard}>
            <h1 className={styles.title}>Dashboard</h1>

            {/* Metrics Cards */}
            <div className={styles.metricsGrid}>
                <div className={styles.metricCard}>
                    <div className={styles.metricIcon}>📦</div>
                    <div className={styles.metricInfo}>
                        <h3>Total Orders</h3>
                        <p className={styles.metricValue}>{analytics.totalOrders}</p>
                    </div>
                </div>

                <div className={styles.metricCard}>
                    <div className={styles.metricIcon}>💰</div>
                    <div className={styles.metricInfo}>
                        <h3>Total Revenue</h3>
                        <p className={styles.metricValue}>
                            ${analytics.totalRevenue.toFixed(2)}
                        </p>
                    </div>
                </div>

                <div className={styles.metricCard}>
                    <div className={styles.metricIcon}>🛍️</div>
                    <div className={styles.metricInfo}>
                        <h3>Total Products</h3>
                        <p className={styles.metricValue}>{analytics.totalProducts}</p>
                    </div>
                </div>

                <div className={styles.metricCard}>
                    <div className={styles.metricIcon}>👥</div>
                    <div className={styles.metricInfo}>
                        <h3>Total Users</h3>
                        <p className={styles.metricValue}>{analytics.totalUsers}</p>
                    </div>
                </div>
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

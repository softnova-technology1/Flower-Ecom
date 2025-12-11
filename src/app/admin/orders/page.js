"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import styles from "@/styles/AdminOrders.module.css";

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchOrders();
    }, [statusFilter]);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            let url = "/api/admin/orders";
            const params = new URLSearchParams();

            if (statusFilter !== "all") {
                params.append("status", statusFilter);
            }
            if (searchQuery) {
                params.append("search", searchQuery);
            }

            if (params.toString()) {
                url += "?" + params.toString();
            }

            const response = await fetch(url);
            const data = await response.json();

            if (data.success) {
                setOrders(data.orders);
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
            toast.error("Failed to fetch orders");
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (orderId, newStatus) => {
        try {
            const response = await fetch(`/api/admin/orders/${orderId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus }),
            });

            const data = await response.json();

            if (data.success) {
                toast.success("Order status updated!");
                fetchOrders();
            } else {
                toast.error(data.error || "Failed to update status");
            }
        } catch (error) {
            console.error("Error updating status:", error);
            toast.error("Failed to update status");
        }
    };

    const getStatusBadge = (status) => {
        return <span className={`${styles.badge} ${styles[status]}`}>{status}</span>;
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Orders Management</h1>

            {/* Filters */}
            <div className={styles.filters}>
                <div className={styles.filterGroup}>
                    <label>Status:</label>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className={styles.select}
                    >
                        <option value="all">All Orders</option>
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>

                <div className={styles.filterGroup}>
                    <input
                        type="text"
                        placeholder="Search by email or ID..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={styles.searchInput}
                    />
                    <button onClick={fetchOrders} className={styles.searchBtn}>
                        Search
                    </button>
                </div>
            </div>

            {/* Orders Table */}
            {loading ? (
                <div className={styles.loading}>Loading orders...</div>
            ) : orders.length === 0 ? (
                <div className={styles.empty}>No orders found</div>
            ) : (
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Items</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id}>
                                    <td>#{order._id.slice(-8).toUpperCase()}</td>
                                    <td>
                                        {order.user?.name || order.guestEmail || "Guest"}
                                        <br />
                                        <small>{order.user?.email || order.guestEmail}</small>
                                    </td>
                                    <td>{order.items.length} items</td>
                                    <td>${order.totalPrice.toFixed(2)}</td>
                                    <td>{getStatusBadge(order.status)}</td>
                                    <td>
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </td>
                                    <td>
                                        <select
                                            value={order.status}
                                            onChange={(e) =>
                                                handleStatusUpdate(order._id, e.target.value)
                                            }
                                            className={styles.statusSelect}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="processing">Processing</option>
                                            <option value="shipped">Shipped</option>
                                            <option value="delivered">Delivered</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

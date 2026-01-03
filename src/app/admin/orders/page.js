"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { 
    MdShoppingCart, 
    MdVisibility, 
    MdPhone, 
    MdSearch,
    MdFilterList,
    MdLocalShipping,
    MdCheckCircle,
    MdCancel,
    MdClose
} from "react-icons/md";
import styles from "@/styles/AdminOrders.module.css";
import Link from "next/link";

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showModal, setShowModal] = useState(false);

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

    const generateTrackingNumber = () => {
        // Generate tracking number: TRK + timestamp + random
        const timestamp = Date.now().toString().slice(-6);
        const random = Math.random().toString(36).substring(2, 5).toUpperCase();
        return `TRK${timestamp}${random}`;
    };

    const handleGenerateTracking = async (orderId) => {
        const trackingNumber = generateTrackingNumber();

        try {
            const response = await fetch(`/api/admin/orders/${orderId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ trackingNumber }),
            });

            const data = await response.json();

            if (data.success) {
                toast.success(`Tracking number generated: ${trackingNumber}`);
                fetchOrders();
            } else {
                toast.error(data.error || "Failed to generate tracking");
            }
        } catch (error) {
            console.error("Error generating tracking:", error);
            toast.error("Failed to generate tracking");
        }
    };

    const handleConfirmOrder = async (orderId, notes = "") => {
        try {
            const response = await fetch(`/api/admin/orders/${orderId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    customerConfirmed: true,
                    ownerNotes: notes,
                    status: "confirmed",
                }),
            });

            const data = await response.json();

            if (data.success) {
                toast.success("Order confirmed!");
                fetchOrders();
                setShowModal(false);
            } else {
                toast.error(data.error || "Failed to confirm order");
            }
        } catch (error) {
            console.error("Error confirming order:", error);
            toast.error("Failed to confirm order");
        }
    };

    const openOrderDetails = (order) => {
        setSelectedOrder(order);
        setShowModal(true);
    };

    const getStatusBadge = (status) => {
        return <span className={`${styles.badge} ${styles[status]}`}>{status}</span>;
    };

    return (
        <div className={styles.container}>
            <div className={styles.titleBar}>
                <div className={styles.titleGroup}>
                    <MdShoppingCart className={styles.titleIcon} />
                    <h1 className={styles.title}>Orders Management</h1>
                </div>
                <div className={styles.stats}>
                    <div className={styles.statItem}>
                        <span className={styles.statValue}>{orders.length}</span>
                        <span className={styles.statLabel}>Total Orders</span>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className={styles.filters}>
                <div className={styles.filterGroup}>
                    <MdFilterList className={styles.filterIcon} />
                    <label>Status:</label>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className={styles.select}
                    >
                        <option value="all">All Orders</option>
                        <option value="pending_payment">Pending Payment</option>
                        <option value="payment_received">Payment Received</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="preparing">Preparing</option>
                        <option value="out_for_delivery">Out for Delivery</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>

                <div className={styles.filterGroup}>
                    <MdSearch className={styles.filterIcon} />
                    <input
                        type="text"
                        placeholder="Search by email or ID..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={styles.searchInput}
                    />
                    <button onClick={fetchOrders} className={styles.searchBtn}>
                        <MdSearch /> Search
                    </button>
                </div>
            </div>

            {/* Orders Table */}
            {loading ? (
                <div className={styles.loading}>
                    <div className={styles.spinner}></div>
                    <p>Loading orders...</p>
                </div>
            ) : orders.length === 0 ? (
                <div className={styles.empty}>
                    <MdShoppingCart className={styles.emptyIcon} />
                    <p>No orders found</p>
                </div>
            ) : (
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Phone</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Tracking</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id}>
                                    <td>#{order._id.slice(-8).toUpperCase()}</td>
                                    <td>
                                        {order.shippingAddress?.name || "Guest"}
                                        <br />
                                        <small>{order.guestEmail}</small>
                                    </td>
                                    <td>
                                        <a href={`tel:${order.shippingAddress?.phone}`} className={styles.phoneLink}>
                                            <MdPhone /> {order.shippingAddress?.phone}
                                        </a>
                                    </td>
                                    <td className={styles.priceCell}>${order.totalPrice.toFixed(2)}</td>
                                    <td>{getStatusBadge(order.status)}</td>
                                    <td>
                                        {order.trackingNumber ? (
                                            <span className={styles.tracking}>
                                                <MdLocalShipping /> {order.trackingNumber}
                                            </span>
                                        ) : (
                                            <button
                                                onClick={() => handleGenerateTracking(order._id)}
                                                className={styles.genBtn}
                                            >
                                                <MdLocalShipping /> Generate
                                            </button>
                                        )}
                                    </td>
                                    <td className={styles.actions}>
                                        <button
                                            onClick={() => openOrderDetails(order)}
                                            className={styles.viewBtn}
                                        >
                                            <MdVisibility /> View
                                        </button>
                                        <select
                                            value={order.status}
                                            onChange={(e) =>
                                                handleStatusUpdate(order._id, e.target.value)
                                            }
                                            className={styles.statusSelect}
                                        >
                                            <option value="pending_payment">Pending Payment</option>
                                            <option value="payment_received">Payment Received</option>
                                            <option value="confirmed">Confirmed</option>
                                            <option value="preparing">Preparing</option>
                                            <option value="out_for_delivery">Out for Delivery</option>
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

            {/* Order Details Modal */}
            {showModal && selectedOrder && (
                <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <button className={styles.closeBtn} onClick={() => setShowModal(false)}>
                            <MdClose />
                        </button>

                        <h2>Order #{selectedOrder._id.slice(-8).toUpperCase()}</h2>

                        <div className={styles.modalContent}>
                            {/* Customer Info */}
                            <div className={styles.section}>
                                <h3>Customer Information</h3>
                                <p><strong>Name:</strong> {selectedOrder.shippingAddress?.name}</p>
                                <p><strong>Email:</strong> {selectedOrder.guestEmail}</p>
                                <p>
                                    <strong>Phone:</strong>{" "}
                                    <a href={`tel:${selectedOrder.shippingAddress?.phone}`}>
                                        {selectedOrder.shippingAddress?.phone}
                                    </a>
                                </p>
                                <p><strong>Address:</strong> {selectedOrder.shippingAddress?.street}</p>
                                {selectedOrder.deliveryDate && (
                                    <p>
                                        <strong>Delivery:</strong> {selectedOrder.deliveryDate} at {selectedOrder.deliveryTime}
                                    </p>
                                )}
                            </div>

                            {/* Order Items */}
                            <div className={styles.section}>
                                <h3>Order Items</h3>
                                {selectedOrder.items.map((item, index) => (
                                    <div key={index} className={styles.orderItem}>
                                        <span>{item.name} x {item.quantity}</span>
                                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                ))}
                                <div className={styles.total}>
                                    <strong>Total:</strong>
                                    <strong>${selectedOrder.totalPrice.toFixed(2)}</strong>
                                </div>
                            </div>

                            {/* Payment Info */}
                            <div className={styles.section}>
                                <h3>Payment Information</h3>
                                <p><strong>Method:</strong> {selectedOrder.paymentMethod.toUpperCase()}</p>
                                {selectedOrder.paymentResult?.transactionId && (
                                    <p><strong>Transaction ID:</strong> {selectedOrder.paymentResult.transactionId}</p>
                                )}
                                {selectedOrder.paymentResult?.paymentScreenshot && (
                                    <div className={styles.screenshot}>
                                        <p><strong>Payment Screenshot:</strong></p>
                                        <img
                                            src={selectedOrder.paymentResult.paymentScreenshot}
                                            alt="Payment proof"
                                            style={{ maxWidth: "100%", borderRadius: "8px" }}
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Call Customer & Confirm */}
                            {!selectedOrder.customerConfirmed && (
                                <div className={styles.confirmSection}>
                                    <MdPhone className={styles.confirmIcon} />
                                    <p>After calling the customer, mark this order as confirmed:</p>
                                    <textarea
                                        placeholder="Add notes from customer call..."
                                        className={styles.notesInput}
                                        id="orderNotes"
                                    />
                                    <button
                                        onClick={() => {
                                            const notes = document.getElementById("orderNotes").value;
                                            handleConfirmOrder(selectedOrder._id, notes);
                                        }}
                                        className={styles.confirmBtn}
                                    >
                                        <MdCheckCircle /> Confirm Order (Called Customer)
                                    </button>
                                </div>
                            )}

                            {selectedOrder.customerConfirmed && (
                                <div className={styles.confirmedBadge}>
                                    <MdCheckCircle className={styles.confirmedIcon} />
                                    <span>Order Confirmed with Customer</span>
                                    {selectedOrder.ownerNotes && (
                                        <p><small>{selectedOrder.ownerNotes}</small></p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

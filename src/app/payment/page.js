"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import FinalNav from "@/components/FinalNav";
import Footer from "@/components/Footer";
import { Container } from "react-bootstrap";
import styles from "@/styles/Payment.module.css";
import Image from "next/image";

export default function PaymentPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const orderId = searchParams.get("orderId");

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [paymentScreenshot, setPaymentScreenshot] = useState(null);
    const [transactionId, setTransactionId] = useState("");
    const [uploading, setUploading] = useState(false);

    // UPI ID - Replace with your actual UPI ID
    const UPI_ID = "yourshop@upi"; // ⚠️ CHANGE THIS TO YOUR ACTUAL UPI ID
    const SHOP_NAME = "Dazzling Sky Flowers";

    useEffect(() => {
        if (orderId) {
            fetchOrder();
        }
    }, [orderId]);

    const fetchOrder = async () => {
        try {
            const response = await fetch(`/api/orders/${orderId}`);
            const data = await response.json();

            if (data.success) {
                setOrder(data.order);
            } else {
                toast.error("Order not found");
                router.push("/");
            }
        } catch (error) {
            console.error("Error fetching order:", error);
            toast.error("Failed to load order details");
        } finally {
            setLoading(false);
        }
    };

    // Generate UPI deep link for GPay/PhonePe
    const generateUPILink = () => {
        const amount = order?.totalPrice || 0;
        const orderRef = `ORDER${orderId?.slice(-8).toUpperCase()}`;
        
        // UPI Intent URL format
        // This will open GPay/PhonePe/Paytm on mobile
        const upiUrl = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(SHOP_NAME)}&am=${amount}&cu=SGD&tn=${encodeURIComponent(orderRef)}`;
        
        return upiUrl;
    };

    const handlePayNow = () => {
        const upiLink = generateUPILink();
        
        // Try to open UPI app
        window.location.href = upiLink;
        
        // Show instructions
        toast.info("Opening payment app... If it doesn't open, use manual payment details below", {
            position: "top-center",
            autoClose: 5000,
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                toast.error("File size should be less than 5MB");
                return;
            }
            setPaymentScreenshot(file);
        }
    };

    const handleSubmitPayment = async () => {
        if (!transactionId.trim()) {
            toast.error("Please enter transaction ID");
            return;
        }

        if (!paymentScreenshot) {
            toast.error("Please upload payment screenshot");
            return;
        }

        setUploading(true);

        try {
            // In a real app, you'd upload to cloud storage (AWS S3, Cloudinary, etc.)
            // For now, we'll convert to base64 and store in DB (not recommended for production)
            
            const reader = new FileReader();
            reader.onloadend = async () => {
                const base64Image = reader.result;

                // Update order with payment proof
                const response = await fetch(`/api/orders/${orderId}/payment`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        transactionId,
                        paymentScreenshot: base64Image,
                        paymentMethod: "upi",
                    }),
                });

                const data = await response.json();

                if (data.success) {
                    toast.success("Payment proof submitted! We'll verify and confirm your order soon.", {
                        position: "top-center",
                        autoClose: 3000,
                    });

                    setTimeout(() => {
                        router.push(`/order-success?orderId=${orderId}`);
                    }, 3000);
                } else {
                    throw new Error(data.error || "Failed to submit payment proof");
                }
            };

            reader.readAsDataURL(paymentScreenshot);
        } catch (error) {
            console.error("Error submitting payment:", error);
            toast.error(error.message || "Failed to submit payment proof");
        } finally {
            setUploading(false);
        }
    };

    if (loading) {
        return (
            <>
                <FinalNav />
                <Container>
                    <div style={{ textAlign: "center", padding: "100px 20px" }}>
                        <h2>Loading payment details...</h2>
                    </div>
                </Container>
                <Footer />
            </>
        );
    }

    if (!order) {
        return (
            <>
                <FinalNav />
                <Container>
                    <div style={{ textAlign: "center", padding: "100px 20px" }}>
                        <h2>Order not found</h2>
                        <button onClick={() => router.push("/")} className={styles.backBtn}>
                            Go to Home
                        </button>
                    </div>
                </Container>
                <Footer />
            </>
        );
    }

    return (
        <>
            <FinalNav />
            <div className={styles.paymentPage}>
                <Container>
                    <div className={styles.wrapper}>
                        {/* Left - Payment Instructions */}
                        <div className={styles.leftBox}>
                            <h1>Complete Your Payment</h1>
                            <p className={styles.orderInfo}>
                                Order ID: <strong>#{orderId?.slice(-8).toUpperCase()}</strong>
                            </p>
                            <p className={styles.amount}>
                                Amount: <strong>{order.totalPrice} SGD</strong>
                            </p>

                            <div className={styles.paymentMethod}>
                                <h3>Pay via UPI</h3>
                                
                                {/* UPI Quick Pay Button */}
                                <button className={styles.upiButton} onClick={handlePayNow}>
                                    <Image
                                        src="/images/Google.png"
                                        alt="UPI"
                                        width={30}
                                        height={30}
                                    />
                                    <span>Pay with GPay/PhonePe</span>
                                </button>

                                <div className={styles.divider}>OR</div>

                                {/* Manual UPI Details */}
                                <div className={styles.manualPayment}>
                                    <h4>Scan QR Code or Use UPI ID</h4>
                                    
                                    <div className={styles.upiDetails}>
                                        <p><strong>UPI ID:</strong></p>
                                        <div className={styles.copyBox}>
                                            <input 
                                                type="text" 
                                                value={UPI_ID} 
                                                readOnly 
                                            />
                                            <button 
                                                onClick={() => {
                                                    navigator.clipboard.writeText(UPI_ID);
                                                    toast.success("UPI ID copied!");
                                                }}
                                            >
                                                Copy
                                            </button>
                                        </div>
                                    </div>

                                    <div className={styles.qrPlaceholder}>
                                        <p>📱 Scan with any UPI app</p>
                                        <p style={{ fontSize: "12px", color: "#666" }}>
                                            (QR code will be generated here in production)
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Proof Submission */}
                            <div className={styles.proofSection}>
                                <h3>Submit Payment Proof</h3>
                                <p>After making payment, upload screenshot and transaction ID</p>

                                <div className={styles.inputGroup}>
                                    <label>Transaction ID / UTR Number *</label>
                                    <input
                                        type="text"
                                        placeholder="Enter transaction ID"
                                        value={transactionId}
                                        onChange={(e) => setTransactionId(e.target.value)}
                                        className={styles.input}
                                    />
                                </div>

                                <div className={styles.inputGroup}>
                                    <label>Payment Screenshot *</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className={styles.fileInput}
                                    />
                                    {paymentScreenshot && (
                                        <p className={styles.fileName}>
                                            ✓ {paymentScreenshot.name}
                                        </p>
                                    )}
                                </div>

                                <button
                                    className={styles.submitBtn}
                                    onClick={handleSubmitPayment}
                                    disabled={uploading}
                                >
                                    {uploading ? "Submitting..." : "Submit Payment Proof"}
                                </button>

                                <p className={styles.noteText}>
                                    ℹ️ Our team will verify your payment and call you within 30 minutes to confirm your order.
                                </p>
                            </div>
                        </div>

                        {/* Right - Order Summary */}
                        <div className={styles.rightBox}>
                            <h2>Order Summary</h2>

                            <div className={styles.orderItems}>
                                {order.items.map((item, index) => (
                                    <div key={index} className={styles.item}>
                                        <img src={item.image} alt={item.name} />
                                        <div className={styles.itemDetails}>
                                            <p className={styles.itemName}>{item.name}</p>
                                            <p className={styles.itemQty}>Qty: {item.quantity}</p>
                                        </div>
                                        <p className={styles.itemPrice}>
                                            {item.price * item.quantity} SGD
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div className={styles.summaryRow}>
                                <span>Subtotal</span>
                                <span>{order.itemsPrice} SGD</span>
                            </div>
                            <div className={styles.summaryRow}>
                                <span>Delivery</span>
                                <span>{order.shippingPrice === 0 ? "FREE" : `${order.shippingPrice} SGD`}</span>
                            </div>
                            <div className={styles.totalRow}>
                                <span>Total</span>
                                <span>{order.totalPrice} SGD</span>
                            </div>

                            <div className={styles.deliveryInfo}>
                                <h4>Delivery Details</h4>
                                <p><strong>To:</strong> {order.shippingAddress.name}</p>
                                <p><strong>Phone:</strong> {order.shippingAddress.phone}</p>
                                <p><strong>Address:</strong> {order.shippingAddress.street}</p>
                                {order.deliveryDate && (
                                    <p><strong>Date:</strong> {order.deliveryDate} at {order.deliveryTime}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
            <Footer />
        </>
    );
}


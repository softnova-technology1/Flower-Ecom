"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import FinalNav from "@/components/FinalNav";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import styles from "@/styles/Cart.module.css";

export default function CartPage() {
    const { cart, updateQty, removeFromCart } = useCart();
    const router = useRouter();

    const total = cart.reduce(
        (acc, item) => acc + Number(item.price) * Number(item.quantity),
        0
    );

    if (cart.length === 0) {
        return (
            <>
                <FinalNav />
                <div style={{ textAlign: "center", padding: "100px 20px" }}>
                    <h2>Your cart is empty</h2>
                    <button
                        onClick={() => router.push("/products")}
                        style={{
                            marginTop: "20px",
                            padding: "12px 30px",
                            background: "#c78a3a",
                            color: "white",
                            border: "none",
                            borderRadius: "6px",
                            cursor: "pointer",
                            fontSize: "16px",
                        }}
                    >
                        Continue Shopping
                    </button>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <ScrollToTop />
            <FinalNav />
                <div className={styles.cartPage1}>
                    <div className={styles.cartPage}>
                        <table className={styles.cartTable}>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Subtotal</th>
                                </tr>
                            </thead>

                            <tbody>
                                {cart.map((item, index) => (
                                    <tr key={index}>
                                        <td>
                                            <button
                                                className={styles.removeBtn}
                                                onClick={() => removeFromCart(item.name)}
                                            >
                                                ×
                                            </button>
                                        </td>

                                        <td className={styles.productInfo}>
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className={styles.img}
                                            />
                                            <span>{item.name}</span>
                                        </td>

                                        <td>${Number(item.price).toFixed(2)}</td>

                                        <td>
                                            <input
                                                type="number"
                                                min="1"
                                                value={item.quantity}
                                                onChange={(e) =>
                                                    updateQty(item.name, Math.max(1, Number(e.target.value)))
                                                }
                                                className={styles.qtyInput}
                                            />
                                        </td>

                                        <td>${(item.price * item.quantity).toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <button className={styles.updateBtn}>Update Cart</button>

                        <div className={styles.couponBox}>
                            <input
                                type="text"
                                placeholder="Coupon code"
                                className={styles.couponInput}
                            />
                            <button className={styles.couponBtn}>Apply coupon</button>
                        </div>

                        <div className={styles.cartActions}>
                            <div className={styles.totals}>
                                <p>
                                    Subtotal: <span>${total.toFixed(2)}</span>
                                </p>
                                <p>
                                    Total: <span>${total.toFixed(2)}</span>
                                </p>

                                <button
                                    className={styles.checkoutBtn}
                                    onClick={() => router.push("/checkout")}
                                >
                                    Proceed to Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            <Footer />
        </>
    );
}

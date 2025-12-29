"use client";

import React from "react";
import { useRouter } from "next/navigation";
import styles from "@/styles/ProductSection.module.css";

export default function ProductSection() {
    const router = useRouter();

    const latestProducts = [
        { name: "Areca Palm", newPrice: 33, image: "/images/p1.png" },
        { name: "Sunflowers", newPrice: 33, image: "/images/p2.png" },
        { name: "White Camellia", newPrice: 33, image: "/images/p3.png" },
        { name: "Rose Red", oldPrice: 35, newPrice: 25, image: "/images/p4.png" },
    ];

    const bestSellingProducts = [
        { name: "Blossom Noir", newPrice: 31, image: "/images/p5.png" },
        { name: "Orchid Flower", oldPrice: 22, newPrice: 18, image: "/images/p6.png" },
        { name: "Pampas Grass", newPrice: 33, image: "/images/p7.png" },
        { name: "Camellia Pink", newPrice: 25, image: "/images/p8.png" },
    ];

    const openDetails = (item) => {
        router.push(`/product/${item.name}`);
    };

    const renderSection = (title, products) => (
        <section className={styles.section}>
            <h2 className={styles.heading}>{title}</h2>

            <div className={styles.grid}>
                {products.map((item, index) => (
                    <div
                        key={index}
                        className={styles.card}
                        style={{ cursor: "pointer" }}
                        onClick={() => openDetails(item)}
                    >
                        <div className={styles.cardHeader}>
                            <h3 className={styles.productName}>{item.name}</h3>

                            <p className={styles.prices}>
                                {item.oldPrice && (
                                    <span className={styles.oldPrice}>${item.oldPrice}</span>
                                )}
                                <span className={styles.newPrice}>${item.newPrice}</span>
                            </p>
                        </div>

                        <div className={styles.imageWrapper}>
                            <img src={item.image} alt={item.name} className={styles.image} />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );

    return (
        <>
            {renderSection("Latest Products", latestProducts)}
            {renderSection("Best Selling Products", bestSellingProducts)}
        </>
    );
}

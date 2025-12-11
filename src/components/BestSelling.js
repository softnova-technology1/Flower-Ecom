"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { productsAPI } from "@/lib/api";
import styles from "@/styles/Bestselling.module.css";

export default function BestSelling() {
    const cardsRef = useRef([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch best selling products from API
        const fetchProducts = async () => {
            try {
                const data = await productsAPI.getBestSelling();
                setProducts(data.products || []);
            } catch (error) {
                console.error("Error fetching best selling products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(styles.show);
                    }
                });
            },
            { threshold: 0.2 }
        );

        cardsRef.current.forEach((card) => {
            if (card) observer.observe(card);
        });

        return () => {
            cardsRef.current.forEach((card) => {
                if (card) observer.unobserve(card);
            });
        };
    }, [products]);

    if (loading) {
        return (
            <section className={styles.section}>
                <h2 className={styles.heading}>Best Selling Products</h2>
                <div className={styles.grid}>
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className={styles.card} style={{ opacity: 0.5 }}>
                            <div className={styles.cardHeader}>
                                <h3 className={styles.productName}>Loading...</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        );
    }

    return (
        <section className={styles.section}>
            <h2 className={styles.heading}>Best Selling Products</h2>
            <div className={styles.grid}>
                {products.slice(0, 4).map((item, index) => (
                    <Link
                        href={`/product/${item._id}`}
                        key={item._id}
                        className={styles.cardLink}
                    >
                        <div className={styles.card} ref={(el) => (cardsRef.current[index] = el)}>
                            <div className={styles.cardHeader}>
                                <h3 className={styles.productName}>{item.name}</h3>

                                <p className={styles.prices}>
                                    {item.oldPrice && (
                                        <span className={styles.oldPrice}>${item.oldPrice}</span>
                                    )}
                                    <span className={styles.newPrice}>${item.price}</span>
                                </p>
                            </div>

                            <div className={styles.imageWrapper}>
                                <img src={item.image} alt={item.name} className={styles.image} />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}

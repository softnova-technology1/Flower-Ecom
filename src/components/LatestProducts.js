"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { productsAPI } from "@/lib/api";
import styles from "@/styles/LatestProducts.module.css";

export default function LatestProducts() {
    const router = useRouter();
    const itemsRef = useRef([]);
    const [visible, setVisible] = useState({});
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch latest products (new arrivals)
        const fetchProducts = async () => {
            try {
                const data = await productsAPI.getAll({ newArrival: 'true', limit: 8 });
                setProducts(data.products || []);
            } catch (error) {
                console.error("Error fetching latest products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const openDetails = (item) => {
        router.push(`/product/${item._id}`);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = entry.target.dataset.index;
                        setVisible((prev) => ({ ...prev, [index]: true }));
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.2 }
        );

        itemsRef.current.forEach((el) => el && observer.observe(el));

        return () => {
            itemsRef.current.forEach((el) => el && observer.unobserve(el));
        };
    }, [products]);

    if (loading) {
        return (
            <section className={styles.container}>
                <h2 className={styles.heading}>Latest Products</h2>
                <div className={styles.grid}>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <div key={i} className={styles.card} style={{ opacity: 0.5 }}>
                            <div className={styles.textBox}>
                                <p className={styles.name}>Loading...</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        );
    }

    return (
        <section className={styles.container}>
            <h2 className={styles.heading}>Latest Products</h2>

            <div className={styles.grid}>
                {products.map((item, index) => (
                    <div
                        key={item._id}
                        data-index={index}
                        ref={(el) => (itemsRef.current[index] = el)}
                        className={`${styles.card} ${visible[index] ? styles.show : ""}`}
                        onClick={() => openDetails(item)}
                    >
                        <div className={styles.textBox}>
                            <p className={styles.name}>{item.name}</p>

                            <p className={styles.price}>
                                {item.oldPrice && item.oldPrice !== item.price ? (
                                    <>
                                        <span className={styles.oldPrice}>${item.oldPrice}</span>
                                        <span className={styles.salePrice}>${item.price}</span>
                                    </>
                                ) : (
                                    <span>${item.price}</span>
                                )}
                            </p>
                        </div>

                        <img className={styles.image} src={item.image} alt={item.name} />
                    </div>
                ))}
            </div>
        </section>
    );
}

"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { productsAPI } from "@/lib/api";
import styles from "@/styles/FlashSale.module.css";

const FlashSale = () => {
    const router = useRouter();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [timeLeft, setTimeLeft] = useState({
        days: 30,
        hours: 23,
        minutes: 58,
        seconds: 33,
    });

    const [animateUnit, setAnimateUnit] = useState("");

    useEffect(() => {
        // Fetch featured products for flash sale
        const fetchProducts = async () => {
            try {
                const data = await productsAPI.getFeatured();
                setProducts(data.products?.slice(0, 3) || []);
            } catch (error) {
                console.error("Error fetching flash sale products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                let { days, hours, minutes, seconds } = prev;
                let changed = "";

                if (seconds > 0) {
                    seconds--;
                    changed = "seconds";
                } else {
                    seconds = 59;
                    if (minutes > 0) {
                        minutes--;
                        changed = "minutes";
                    } else {
                        minutes = 59;
                        if (hours > 0) {
                            hours--;
                            changed = "hours";
                        } else {
                            hours = 23;
                            if (days > 0) {
                                days--;
                                changed = "days";
                            }
                        }
                    }
                }

                setAnimateUnit(changed);
                setTimeout(() => setAnimateUnit(""), 300);
                return { days, hours, minutes, seconds };
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const [visibleIndexes, setVisibleIndexes] = useState([]);
    const cardsRef = useRef([]);
    const imgRef = useRef(null);
    const [imgVisible, setImgVisible] = useState(false);

    useEffect(() => {
        const cardsObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const index = Number(entry.target.getAttribute("data-index"));
                if (entry.isIntersecting) {
                    setVisibleIndexes((prev) =>
                        prev.includes(index) ? prev : [...prev, index]
                    );
                }
            });
        });

        const imgObserver = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setImgVisible(true);
                imgObserver.unobserve(entry.target);
            }
        });

        const currentCards = cardsRef.current.slice();
        currentCards.forEach((card) => card && cardsObserver.observe(card));

        const currentImg = imgRef.current;
        if (currentImg) imgObserver.observe(currentImg);

        return () => {
            currentCards.forEach((card) => card && cardsObserver.unobserve(card));
            if (currentImg) imgObserver.unobserve(currentImg);
        };
    }, [products]);

    return (
        <div className={styles.flashContainer}>
            <div
                className={`${styles.flashLeft} ${imgVisible ? styles.animateImage : ""
                    }`}
                ref={imgRef}
            >
                <img src="/images/d7.png" alt="flower" className={styles.flashBigImg} />

                <button className={styles.viewBtn}>View All Offers</button>
            </div>

            <div className={styles.flashRight}>
                <div className={styles.flashHeader}>
                    <h1 className={styles.title}>Flash Sale</h1>

                    <div className={styles.timerWrapper}>
                        {["days", "hours", "minutes", "seconds"].map((unit, i) => (
                            <div
                                key={i}
                                className={`${styles.timerBox} ${animateUnit === unit ? styles.timerAnimate : ""
                                    }`}
                            >
                                <h3>{timeLeft[unit]}</h3>
                                <p>{unit.charAt(0).toUpperCase() + unit.slice(1)}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.flashProducts}>
                    {loading ? (
                        <div style={{ padding: "20px", textAlign: "center" }}>Loading products...</div>
                    ) : (
                        products.map((item, index) => (
                            <div
                                key={item._id}
                                data-index={index}
                                ref={(el) => (cardsRef.current[index] = el)}
                                className={`${styles.cardBox} ${visibleIndexes.includes(index) ? styles.animate : ""
                                    }`}
                                onClick={() => router.push(`/product/${item._id}`)}
                            >
                                <h3>{item.name}</h3>
                                <p className={styles.price}>
                                    {item.oldPrice && <del>${item.oldPrice}</del>} <span>${item.price}</span>
                                </p>
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className={styles.productImg}
                                />
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default FlashSale;

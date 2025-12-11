"use client";

import React, { useEffect, useRef } from "react";
import styles from "@/styles/New.module.css";

export default function New() {
    const leftRef = React.useRef(null);
    const [showLeft, setShowLeft] = React.useState(false);

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setShowLeft(true);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.2 }
        );

        if (leftRef.current) observer.observe(leftRef.current);

        return () => {
            if (leftRef.current) observer.unobserve(leftRef.current);
        };
    }, []);

    const rightRef = React.useRef(null);
    const [showRight, setShowRight] = React.useState(false);

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setShowRight(true);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.2 }
        );

        if (rightRef.current) observer.observe(rightRef.current);

        return () => {
            if (rightRef.current) observer.unobserve(rightRef.current);
        };
    }, []);

    const contentRef = useRef(null);

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

        if (contentRef.current) observer.observe(contentRef.current);

        return () => {
            if (contentRef.current) observer.unobserve(contentRef.current);
        };
    }, []);

    return (
        <section className={styles.wrapper}>
            <h1 className={styles.heading}>New Collection</h1>

            <div className={styles.container}>
                <div
                    className={`${styles.leftImageBox} ${showLeft ? styles.show : ""}`}
                    ref={leftRef}
                >
                    <img
                        src="/images/n2.png"
                        alt="Rose"
                        className={styles.leftImage}
                    />
                    <div className={styles.statBox}>
                        <h2>99%</h2>
                        <p>Positive feedback on<br />product quality</p>
                    </div>
                </div>

                <div className={`${styles.content}`} ref={contentRef}>
                    <p className={styles.subtitle}>Seraphic Rose</p>
                    <h2 className={styles.title}>
                        This Name Conjures an Image of Divine Beauty<br />and Purity
                    </h2>

                    <p className={styles.text}>
                        I am text block. Click edit button to change this text. Lorem ipsum
                        dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus
                        nec ullamcorper mattis, pulvinar dapibus leo.
                    </p>

                    <div className={styles.row}>
                        <img
                            src="/images/n3.png"
                            alt="Flower"
                            className={styles.smallImage}
                        />

                        <div className={styles.quoteBox}>
                            <p className={styles.quote}>
                                "Lorem ipsum dolor sit amet, consectetur"
                            </p>
                            <span className={styles.quoteAuthor}>John Doe</span>
                        </div>
                    </div>

                    <button className={styles.button}>Explore Products</button>

                    <div className={styles.features}>
                        <div className={styles.featureItem}>🌿 Fast Growing</div>
                        <div className={styles.featureItem}>✨ Easy Care</div>
                    </div>
                </div>

                <div
                    className={`${styles.rightImageBox} ${showRight ? styles.show : ""}`}
                    ref={rightRef}>
                    <img
                        src="/images/n1.png"
                        alt="Flowers"
                        className={styles.rightImage}
                    />
                </div>
            </div>
        </section>
    );
}

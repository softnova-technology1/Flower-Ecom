"use client";

import React, { useEffect, useRef } from "react";
import styles from "@/styles/Category.module.css";

export default function Category() {
    const headingRef = useRef(null);
    const aboutRef = useRef(null);
    const leftRef = useRef(null);
    const smallRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(styles.showAnim);
                    }
                });
            },
            { threshold: 0.3 }
        );

        if (leftRef.current) observer.observe(leftRef.current);
        if (smallRef.current) observer.observe(smallRef.current);

        return () => {
            if (leftRef.current) observer.unobserve(leftRef.current);
            if (smallRef.current) observer.unobserve(smallRef.current);
        };
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        if (entry.target === headingRef.current) {
                            entry.target.classList.add(styles.showOnceUp);
                        }
                        if (entry.target === aboutRef.current) {
                            entry.target.classList.add(styles.showOnceRight);
                        }
                    }
                });
            },
            { threshold: 0.3 }
        );

        if (headingRef.current) observer.observe(headingRef.current);
        if (aboutRef.current) observer.observe(aboutRef.current);

        return () => {
            if (headingRef.current) observer.unobserve(headingRef.current);
            if (aboutRef.current) observer.unobserve(aboutRef.current);
        };
    }, []);

    return (
        <section className={styles.section}>
            <h2 className={`${styles.title} ${styles.slideUpOnce}`} ref={headingRef}>
                Browse By Category
            </h2>
            <div className={`${styles.categoryRow} ${styles.slideRightOnce}`} ref={aboutRef}>
                <div className={styles.categoryCard}>
                    <img src="/images/d1.png" className={styles.catImg} alt="Focal Flowers" />
                    <div>
                        <h4>Focal Flowers</h4>
                        <p>500 Item</p>
                    </div>
                </div>

                <div className={styles.categoryCard}>
                    <img src="/images/d2.png" className={styles.catImg} alt="Filler Flowers" />
                    <div>
                        <h4>Filler Flowers</h4>
                        <p>500 Item</p>
                    </div>
                </div>

                <div className={styles.categoryCard}>
                    <img src="/images/d3.png" className={styles.catImg} alt="Line Flowers" />
                    <div>
                        <h4>Line Flowers</h4>
                        <p>500 Item</p>
                    </div>
                </div>

                <div className={styles.categoryCard}>
                    <img src="/images/d4.png" className={styles.catImg} alt="Greenery" />
                    <div>
                        <h4>Greenery</h4>
                        <p>500 Item</p>
                    </div>
                </div>
            </div>

            <div className={styles.container}>
                <div className={styles.aboutSection}>
                    <div className={`${styles.aboutLeft} ${styles.animLeft}`} ref={leftRef}>
                        <h2 className={styles.hh2}>Make Your Home as Comfortable as Possible</h2>
                        <p className={styles.hh3}>
                            I am text block. Click edit button to change this text. Lorem ipsum
                            dolor sit amet, consectetur adipiscing elit.
                        </p>
                        <button className={styles.btn}>About Us</button>
                    </div>

                    <div className={styles.aboutRight}>
                        <div className={styles.bigRound}>
                            <img src="/images/d5.png" alt="Flower arrangement" />
                        </div>

                        <div className={`${styles.smallRound} ${styles.animRight}`} ref={smallRef}>
                            <img src="/images/d6.png" alt="Small flower" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

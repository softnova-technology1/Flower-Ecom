"use client";

import React, { useEffect, useRef } from "react";
import styles from "@/styles/Customer.module.css";

const customers = [
    {
        name: "John Doe",
        role: "CO Founder",
        rating: "4.9",
        image: "/images/d1.png",
        text: "I am text block. Click edit button to change this text. Lorem, consectetur adipiscing elit."
    },
    {
        name: "Mark Shoo",
        role: "CO Founder",
        rating: "4.9",
        image: "/images/d2.png",
        text: "I am text block. Click edit button to change this text. Lorem, consectetur adipiscing elit."
    },
    {
        name: "Donald",
        role: "CO Founder",
        rating: "4.9",
        image: "/images/d3.png",
        text: "I am text block. Click edit button to change this text. Lorem, consectetur adipiscing elit."
    },
    {
        name: "William",
        role: "CO Founder",
        rating: "4.9",
        image: "/images/d4.png",
        text: "I am text block. Click edit button to change this text. Lorem, consectetur adipiscing elit."
    },
    {
        name: "David lee",
        role: "CO Founder",
        rating: "4.9",
        image: "/images/d5.png",
        text: "I am text block. Click edit button to change this text. Lorem, consectetur adipiscing elit."
    },
    {
        name: "Jonathan",
        role: "CO Founder",
        rating: "4.9",
        image: "/images/d6.png",
        text: "I am text block. Click edit button to change this text. Lorem, consectetur adipiscing elit."
    }
];

export default function Customer() {
    const cardRefs = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(styles.show);
                    } else {
                        entry.target.classList.remove(styles.show);
                    }
                });
            },
            { threshold: 0.3 }
        );

        cardRefs.current.forEach((card) => {
            if (card) observer.observe(card);
        });

        return () => {
            cardRefs.current.forEach((card) => {
                if (card) observer.unobserve(card);
            });
        };
    }, []);

    return (
        <section className={styles.section}>
            <h2 className={styles.title}>Customers Experiences</h2>

            <div className={styles.grid}>
                {customers.map((c, i) => (
                    <div
                        key={i}
                        ref={(el) => (cardRefs.current[i] = el)}
                        className={`${styles.card} ${i < 3 ? styles.left : styles.right}`}>

                        <div className={styles.headerRow}>
                            <div className={styles.userInfo}>
                                <img src={c.image} alt={c.name} className={styles.avatar} />
                                <div>
                                    <h3 className={styles.name}>{c.name}</h3>
                                    <p className={styles.role}>{c.role}</p>
                                </div>
                            </div>

                            <div className={styles.rating}>
                                <span>{c.rating}</span>
                                <span className={styles.star}>⭐</span>
                            </div>
                        </div>

                        <p className={styles.text}>{c.text}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

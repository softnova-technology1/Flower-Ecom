"use client";

import React from "react";
import { FiPackage, FiHeadphones } from "react-icons/fi";
import { FaTruck, FaMedal } from "react-icons/fa";
import styles from "@/styles/Service.module.css";

export default function Service() {
    const services = [
        {
            icon: <FiPackage size={40} />,
            title: "Safety Packing",
            text: "I am text block. Click edit button to change this text.",
        },
        {
            icon: <FaTruck size={40} />,
            title: "Free Shipping",
            text: "I am text block. Click edit button to change this text.",
        },
        {
            icon: <FaMedal size={40} />,
            title: "Original Product",
            text: "I am text block. Click edit button to change this text.",
        },
        {
            icon: <FiHeadphones size={40} />,
            title: "Support 24/7",
            text: "I am text block. Click edit button to change this text.",
        },
    ];

    return (
        <section className={styles.wrapper}>
            <div className={styles.grid}>
                {services.map((item, i) => (
                    <div key={i} className={styles.card}>
                        <div className={styles.icon}>{item.icon}</div>
                        <h3 className={styles.title}>{item.title}</h3>
                        <p className={styles.text}>{item.text}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

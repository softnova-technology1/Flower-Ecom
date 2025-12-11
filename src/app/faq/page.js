"use client";

import React, { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import PageWrapper from "@/components/PageWrapper";
import styles from "@/styles/Faq1.module.css";

const faqData = [
    {
        question: "Nulla sagittis condimentum ligula?",
        answer:
            "I am item content. Click edit button to change this text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
    },
    {
        question: "Suspendisse fermentum. Morbi a mauris?",
        answer:
            "I am item content. Click edit button to change this text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
    },
    {
        question: "Nulla sagittis condimentum ligula?",
        answer:
            "I am item content. Click edit button to change this text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
    },
    {
        question: "Curabitur tellus purus, porta sit amet?",
        answer:
            "I am item content. Click edit button to change this text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
    },
    {
        question: "Ipsum sit amet consectetur adipiscing?",
        answer:
            "I am item content. Click edit button to change this text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
    },
];

export default function FaqPage() {
    const [activeIndex, setActiveIndex] = useState(null);
    const toggleIndex = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const [offsetY, setOffsetY] = useState(0);

    const handleScroll = () => {
        setOffsetY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <ScrollToTop />
            <Navbar />
            <PageWrapper>
                <div className={styles.main}>
                    <div className={styles.main1}>
                        <h1>Faq</h1>
                    </div>

                    <div className={styles.main2}>
                        <img
                            src="/images/flr1.jpg"
                            alt=""
                            className={styles.pImage}
                            style={{ transform: `translateY(${offsetY * -0.25}px)` }}
                        />

                        <img
                            src="/images/flr2.jpg"
                            alt=""
                            className={`${styles.pImage} ${styles.centerImg}`}
                            style={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: `translate(-50%, -50%) translateY(${offsetY * 0.35
                                    }px)`,
                                zIndex: 1,
                            }}
                        />

                        <img
                            src="/images/flr3.jpg"
                            alt=""
                            className={styles.pImage}
                            style={{ transform: ` translateY(${offsetY * -0.2}px) ` }}
                        />
                    </div>
                </div>

                <div className={styles.faqWrapper}>
                    <h1 className={styles.title}>Frequently Asked Question</h1>
                    <div className={styles.faqBox}>
                        <div className={styles.faqHeader}>
                            <span className={styles.icon}>❓</span> General FAQ
                        </div>
                        {faqData.map((item, i) => (
                            <div key={i} className={styles.faqItem}>
                                <div className={styles.question} onClick={() => toggleIndex(i)}>
                                    <h3>{item.question}</h3>
                                    <FaChevronDown
                                        className={`${styles.icon} ${activeIndex === i ? styles.rotate : ""
                                            }`}
                                    />
                                </div>

                                {activeIndex === i && (
                                    <p className={styles.answer}>{item.answer}</p>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className={styles.faqContainer}>
                        <div className={styles.headerBox}>
                            <span className={styles.icon}>🛒</span> Order Process
                        </div>

                        <div className={styles.listWrapper}>
                            {faqData.map((item, i) => (
                                <div key={i} className={styles.faqItem}>
                                    <div className={styles.question} onClick={() => toggleIndex(i)}>
                                        <h3>{item.question}</h3>
                                        <FaChevronDown
                                            className={`${styles.icon} ${activeIndex === i ? styles.rotate : ""
                                                }`}
                                        />
                                    </div>

                                    {activeIndex === i && (
                                        <p className={styles.answer}>{item.answer}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={styles.faqContainer}>
                        <div className={styles.header}>
                            <span className={styles.titlee}>💳 Payments</span>
                        </div>

                        {faqData.map((item, i) => (
                            <div key={i} className={styles.faqItem}>
                                <div className={styles.question} onClick={() => toggleIndex(i)}>
                                    <h3>{item.question}</h3>
                                    <FaChevronDown
                                        className={`${styles.icon} ${activeIndex === i ? styles.rotate : ""
                                            }`}
                                    />
                                </div>

                                {activeIndex === i && (
                                    <p className={styles.answer}>{item.answer}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <Footer />
            </PageWrapper>
        </>
    );
}

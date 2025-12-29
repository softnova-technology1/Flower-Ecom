"use client";

import React, { useState } from "react";
import styles from "@/styles/Faq.module.css";
import { Container } from "react-bootstrap";

const faqs = [
  {
    question: "Nulla sagittis condimentum ligula?",
    answer:
      "This is an example answer. Lorem ipsum dolor sit amet consectetur adipiscing elit.",
  },
  {
    question: "Suspendisse fermentum. Morbi a mauris?",
    answer:
      "This is an example answer. Lorem ipsum dolor sit amet consectetur adipiscing elit.",
  },
  {
    question: "Nulla sagittis condimentum ligula?",
    answer:
      "This is an example answer. Lorem ipsum dolor sit amet consectetur adipiscing elit.",
  },
  {
    question: "Curabitur tellus purus, porta sit amet?",
    answer:
      "This is an example answer. Lorem ipsum dolor sit amet consectetur adipiscing elit.",
  },
  {
    question: "Ipsum sit amet consectetur adipiscing?",
    answer:
      "This is an example answer. Lorem ipsum dolor sit amet consectetur adipiscing elit.",
  },
];

export default function Faq() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const itemRefs = React.useRef([]);
  const [visibleItems, setVisibleItems] = React.useState([]);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.dataset.index);
            setVisibleItems((prev) => ({
              ...prev,
              [index]: true,
            }));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    itemRefs.current.forEach((item, i) => {
      if (item) {
        item.dataset.index = i;
        observer.observe(item);
      }
    });

    return () => {
      itemRefs.current.forEach((item) => {
        if (item) observer.unobserve(item);
      });
    };
  }, []);

  return (
    <>
      <section>
  
      </section>
      <section className={styles.section}>
        <h2 className={styles.title}>Frequently Asked Question</h2>

        <div className={styles.container}>
          <div className={styles.faqList}>
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`${styles.faqItem} ${
                  visibleItems[index] ? styles.show : ""
                }`}
                ref={(el) => (itemRefs.current[index] = el)}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className={styles.faqQuestion}
                >
                  <span>{faq.question}</span>
                  <span className={styles.icon}>
                    {activeIndex === index ? "▲" : "▼"}
                  </span>
                </button>

                {activeIndex === index && (
                  <p className={styles.faqAnswer}>{faq.answer}</p>
                )}

                <div className={styles.line}></div>
              </div>
            ))}
          </div>

          <div className={styles.rightBox}>
            <h3>Still Have Other Questions?</h3>
            <p>
              I am text block. Click edit button to change this text. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit.
            </p>

            <button className={styles.contactBtn}>Contact Us</button>
          </div>
        </div>
      </section>
    </>
  );
}

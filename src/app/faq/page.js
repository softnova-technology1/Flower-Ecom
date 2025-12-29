"use client";

import React, { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import styles from "@/styles/Faq1.module.css";
import { Container } from "react-bootstrap";
import FinalNav from "@/components/FinalNav";

const generalFaq = [
  {
    question: "Do you offer same-day delivery?",
    answer:
      "Yes! We provide same-day delivery across Singapore for orders placed before our cut-off time.",
  },
  {
    question: "Are the flowers fresh?",
    answer:
      "Absolutely. We source fresh, premium-quality flowers daily to ensure every bouquet looks vibrant and long-lasting.",
  },
  {
    question: "Can I customize my bouquet?",
    answer:
      "Yes. You can request custom flowers, colours, wrapping styles, and personalized messages.",
  },
  {
    question: "Do you deliver on weekends and public holidays?",
    answer:
      "Yes, we deliver on weekends. Public holiday delivery depends on availability — contact us to confirm.",
  },
  {
    question: "Can I schedule a delivery in advance?",
    answer:
      "Of course! You can choose your preferred delivery date at checkout.",
  },
];

const orderProcessFaq = [
  {
    question: "Can I track my order?",
    answer:
      "Yes, you will receive delivery updates. Our team will notify you once your bouquet is on the way.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept credit/debit cards, online banking, and digital wallet payments.",
  },
  {
    question: "What if the recipient is not home?",
    answer:
      "Our delivery team will contact the recipient. If unreachable, we will leave the bouquet in a safe spot or reschedule (extra charges may apply).",
  },
  {
    question: "Do you offer corporate or bulk orders?",
    answer:
      "Yes! We provide bouquets for events, offices, celebrations, and corporate gifting.",
  },
  {
    question: "How do I care for my flowers?",
    answer:
      "Place them in clean water, keep them away from direct sunlight, and trim the stems every 2–3 days for longer freshness.",
  },
];

const paymentFaq = [
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit/debit cards, online banking, UPI, and popular e-wallets for a smooth and secure checkout experience.",
  },
  {
    question: "Is my payment information secure?",
    answer:
      "Yes. All payments are processed through trusted, encrypted gateways to ensure your information stays safe and protected.",
  },
  {
    question: "Do you offer Cash on Delivery (COD)?",
    answer:
      "Currently, we do not offer COD. All orders must be paid online to confirm delivery.",
  },
  {
    question: "Will I receive a payment confirmation?",
    answer:
      "Absolutely. Once your payment is successful, a confirmation email/SMS will be sent instantly with your order details.",
  },
  {
    question: "What should I do if my payment fails?",
    answer:
      "If your payment fails, please retry using a different method or contact our support team. We’re happy to help you complete your order.",
  },
  {
    question: "Can I get a refund if I cancel my order?",
    answer:
      "Refunds depend on the cancellation time. If the bouquet has not been prepared or dispatched, a refund may be issued. Please refer to our Cancellation & Refund Policy for more details.",
  },
];

/* ================= COMPONENT ================= */

export default function FaqPage() {
  /* Toggle state for each section */
  const [active, setActive] = useState({
    general: null,
    order: null,
    payment: null,
    success: null,
  });

  const toggle = (section, index) => {
    setActive((prev) => ({
      ...prev,
      [section]: prev[section] === index ? null : index,
    }));
  };

  /* Parallax scroll */
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Reusable FAQ Section */
  const FaqSection = ({ title, icon, data, sectionKey }) => (
    <div className={styles.faqContainer}>
      <div className={styles.faqHeader}>
        <span className={styles.icon}>{icon}</span> {title}
      </div>

      {data.map((item, i) => (
        <div key={i} className={styles.faqItem}>
          <div
            className={styles.question}
            onClick={() => toggle(sectionKey, i)}
          >
            <h3>{item.question}</h3>
            <FaChevronDown
              className={`${styles.chevron} ${
                active[sectionKey] === i ? styles.rotate : ""
              }`}
            />
          </div>

          {active[sectionKey] === i && (
            <p className={styles.answer}>{item.answer}</p>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <>
      <ScrollToTop />
      <FinalNav />
        {/* ===== HERO SECTION ===== */}
      <section>
        <div className={styles.hero}>
          <Container>
            <div className={styles.contents}>
              <h1>Make Your Home as Comfortable as Possible</h1>
              <p>
                Make your home as comfortable as possible with the natural charm
                of fresh flowers.
                <br />
                Add comfort and elegance to your home with beautifully crafted
                fresh flower bouquets
              </p>
            </div>
          </Container>
        </div>
      </section>
        {/* ===== FAQ CONTENT ===== */}
        <div className={styles.faqWrapper}>
          <h1 className={styles.title}>Frequently Asked Questions</h1>

          <FaqSection
            title="General FAQ"
            icon="❓"
            data={generalFaq}
            sectionKey="general"
          />

          <FaqSection
            title="Order Process"
            icon="🛒"
            data={orderProcessFaq}
            sectionKey="order"
          />

          <FaqSection
            title="Payments"
            icon="💳"
            data={paymentFaq}
            sectionKey="payment"
          />
        </div>

        <Footer />
      
    </>
  );
}

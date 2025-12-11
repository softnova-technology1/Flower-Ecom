"use client";

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { contactAPI } from "@/lib/api";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import PageWrapper from "@/components/PageWrapper";
import styles from "@/styles/Contact.module.css";

export default function ContactPage() {
    const [offsetY, setOffsetY] = useState(0);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleScroll = () => {
        setOffsetY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
            toast.error("Please fill all fields", {
                position: "top-center",
            });
            return;
        }

        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            toast.error("Please enter a valid email", {
                position: "top-center",
            });
            return;
        }

        setLoading(true);

        try {
            const response = await contactAPI.submit(formData);

            if (response.success) {
                toast.success("Message sent successfully! We'll get back to you soon.", {
                    position: "top-center",
                });
                // Clear form
                setFormData({ name: "", email: "", message: "" });
            }
        } catch (error) {
            toast.error(error.message || "Failed to send message. Please try again.", {
                position: "top-center",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <ScrollToTop />
            <Navbar />
            <PageWrapper>
                <div className={styles.main}>
                    <div className={styles.main1}>
                        <h1>Contact Us</h1>
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

                <div className={styles.container}>
                    <div className={styles.mapCircle}>
                        <iframe
                            title="London Eye Map"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19809.28020296546!2d-0.127758!3d51.503324!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604b900b9847d%3A0xceb545d49c3e39fb!2sLondon%20Eye!5e0!3m2!1sen!2suk!4v123456789"
                            width="100%"
                            height="100%"
                            style={{ border: "0" }}
                            allowFullScreen=""
                            loading="lazy"
                        ></iframe>
                    </div>

                    <div className={styles.rightSection}>
                        <h1 className={styles.title}>
                            Don't Hesitate to <br />
                            Contact Us, Send <br />
                            Your Message
                        </h1>

                        <p className={styles.text}>
                            I am text block. Click edit button to change this text. Lorem ipsum
                            dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus
                            nec ullamcorper mattis, pulvinar dapibus leo.
                        </p>

                        <div className={styles.info}>
                            <p>📧 ex@domain.com</p>
                            <p>📞 (+1) 234 56 789</p>
                            <p>📍 633, Northwest, Apartment 11, Ecuador</p>
                        </div>

                        <form className={styles.form} onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={formData.name}
                                onChange={handleChange}
                                disabled={loading}
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                disabled={loading}
                            />
                            <textarea
                                name="message"
                                placeholder="Message"
                                rows="4"
                                value={formData.message}
                                onChange={handleChange}
                                disabled={loading}
                            ></textarea>
                            <button type="submit" className={styles.btn} disabled={loading}>
                                {loading ? "Sending..." : "Send"}
                            </button>
                        </form>
                    </div>
                </div>

                <div className={styles.wrapper}>
                    <div className={styles.box}>
                        <h1>View Frequently Asked Questions</h1>

                        <p>
                            I am text block. Click edit button to change this text. Lorem ipsum
                            dolor sit amet, consectetur adipiscing elit. Ut <br></br>elit
                            tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
                        </p>

                        <a href="/faq">
                            <button className={styles.btnn}>View FAQ</button>
                        </a>
                    </div>
                </div>
                <Footer />
            </PageWrapper>
        </>
    );
}

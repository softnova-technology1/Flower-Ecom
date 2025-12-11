"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BsClock } from "react-icons/bs";
import { SlCalender } from "react-icons/sl";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import PageWrapper from "@/components/PageWrapper";
import styles from "@/styles/Blog.module.css";

export default function BlogPage() {
    const router = useRouter();
    const [offsetY, setOffsetY] = useState(0);

    const handleScroll = () => {
        setOffsetY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const blogData = [
        {
            title: "A Vase of Dry Grass Showcases Natural Texture Against",
            img: "/images/cont1.png",
            date: "November 23, 2024",
            time: "12:07 am",
            desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmodtempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,quis",
        },
        {
            title: "A Vibrant Bouquet of White and Pink Carnations",
            img: "/images/cont2.png",
            date: "November 22, 2024",
            time: "10:42 pm",
            desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmodtempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,quis",
        },
        {
            title: "A Rustic Vase Filled With Dried Flowers and Grass",
            img: "/images/cont3.png",
            date: "November 22, 2024",
            time: "10:33 pm",
            desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmodtempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,quis",
        },
        {
            title: "A Table Showcases a Vibrant Vase of Flowers",
            img: "/images/cont4.png",
            date: "November 21, 2024",
            time: "12:07 am",
            desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmodtempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,quis",
        },
        {
            title: "A Vase of Pink Roses Glistening With Water Droplets",
            img: "/images/cont5.png",
            date: "November 20, 2024",
            time: "10:42 pm",
            desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmodtempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,quis",
        },
        {
            title: "A Delightful Mix of White and Pink Carnations",
            img: "/images/cont6.png",
            date: "November 24, 2024",
            time: "10:33 pm",
            desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmodtempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,quis",
        },
    ];

    return (
        <>
            <ScrollToTop />
            <Navbar />
            <PageWrapper>
                <div className={styles.main}>
                    <div className={styles.main1}>
                        <h1>Our Blog</h1>
                    </div>

                    <div className={styles.main2}>
                        <img
                            src="/images/flr1.png"
                            alt=""
                            className={styles.pImage}
                            style={{ transform: `translateY(${offsetY * -0.25}px)` }}
                        />

                        <img
                            src="/images/flr2.png"
                            alt=""
                            className={`${styles.pImage} ${styles.centerImg}`}
                            style={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: `translate(-50%, -50%) translateY(${offsetY * 0.35}px)`,
                                zIndex: 1,
                            }}
                        />

                        <img
                            src="/images/flr3.png"
                            alt=""
                            className={styles.pImage}
                            style={{ transform: `translateY(${offsetY * -0.2}px)` }}
                        />
                    </div>
                </div>

                <div className={styles.blogwrapper}>
                    <div className={styles.blogcontainer}>
                        {blogData.map((item, index) => (
                            <div
                                className={styles.blogcard}
                                key={index}
                                onClick={() => router.push(`/blog/${index}`)}
                            >
                                <h2 className={styles.blogtitle}>{item.title}</h2>

                                <img src={item.img} alt="" className={styles.blogimg} />

                                <div className={styles.blogmeta}>
                                    <span>
                                        <SlCalender /> {item.date}
                                    </span>
                                    <span>
                                        <BsClock /> {item.time}
                                    </span>
                                </div>

                                <p className={styles.blogdesc}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <Footer />
            </PageWrapper>
        </>
    );
}

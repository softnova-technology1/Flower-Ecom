"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Category from "@/components/Category";
import FlashSale from "@/components/FlashSale";
import New from "@/components/New";
import ProductSection from "@/components/ProductSection";
import LatestProducts from "@/components/LatestProducts";
import BestSelling from "@/components/BestSelling";
import Customer from "@/components/Customer";
import Faq from "@/components/Faq";
import Service from "@/components/Service";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import PageWrapper from "@/components/PageWrapper";
import styles from "@/styles/Home.module.css";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <PageWrapper>
        <section className={styles.hero}>
          <div className={styles.heroLeft}>
            <div className={styles.heroGrid}>
              <img src="/images/dimg5.png" alt="" className={`${styles.circle} ${styles.i1}`} />
              <img src="/images/dimg1.png" alt="" className={`${styles.oval} ${styles.i2}`} />
              <img src="/images/dimg3.png" alt="" className={`${styles.circle} ${styles.i3}`} />
              <img src="/images/dimg4.png" alt="" className={`${styles.circle} ${styles.i4}`} />
              <img src="/images/dimg2.png" alt="" className={`${styles.circle} ${styles.i5}`} />
            </div>
          </div>

          <div className={styles.heroRight}>
            <h1>
              Best Place to Shop for <br /> Flowers Online
            </h1>

            <p>
              I am text block. Click edit button to change this text. Lorem ipsum
              dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus
              nec ullamcorper mattis, pulvinar dapibus leo.
            </p>

            <button
              className={styles.shopBtn}
              onClick={() => router.push("/products")}
            >
              Shop Now
            </button>

            <div className={styles.stats}>
              <div className={styles.stat}>
                <h2>5K</h2>
                <span>Active Users</span>
              </div>
              <div className={styles.stat}>
                <h2>4.5K</h2>
                <span>Client Satisfaction</span>
              </div>
              <div className={styles.stat}>
                <h2>1.2K</h2>
                <span>Partners Join Us</span>
              </div>
            </div>
          </div>
        </section>

        <Category />
        <FlashSale />
        <New />
        <ProductSection />
        <LatestProducts />
        <BestSelling />
        <Customer />
        <Faq />
        <Service />
        <Footer />
      </PageWrapper>
    </>
  );
}

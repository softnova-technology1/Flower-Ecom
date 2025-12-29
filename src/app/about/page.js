"use client";

import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Navbar from "@/components/Navbar";
// import AboutFaq from "@/components/AboutFaq";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import styles from "@/styles/about.module.css";
import FinalNav from "@/components/FinalNav";

export default function AboutPage() {
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
      {/* <Navbar /> */}
      <FinalNav/>
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
      <div className={styles.main}>
        <div className={styles.section}>
          <Container>
            <h2 className={styles.mainTitle}>
              Why Should You Choose Us to Beautify Your Home?
            </h2>

            <div className={styles.intro}>
              <p>
                Because our fresh, handcrafted bouquets add instant beauty,
                warmth, and elegance to any space, making your home feel more
                alive and welcoming.
              </p>
              <p>
                We bring premium, long-lasting flowers and artistic bouquet
                designs that transform your home into a stylish, vibrant, and
                refreshing space.
              </p>
              <p>
                Our thoughtfully curated floral arrangements elevate your
                interior with natural charm, luxury blooms, and timeless beauty
                crafted by skilled floral artists.
              </p>
            </div>

            <div className={styles.grid}>
              {[
                {
                  title: "Product Archive",
                  desc: "Explore our complete collection of handcrafted flower bouquets, designed for every mood, moment, and occasion.",
                },
                {
                  title: "Our Blog",
                  desc: "Explore fresh floral ideas, gifting tips, bouquet inspiration, trends, and expert flower guides curated just for you.",
                },
              ].map((item, index) => (
                <div key={index} className={styles.card}>
                  <span className={styles.bar}></span>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          </Container>
        </div>

        <div className={styles.thirdContainer}>
          <div className="container pt-5">
            <div className={`${styles.fourReasons} d-flex`}>
              <div className="" data-aos="fade-right" data-aos-duration="700">
                <div className={styles.reasons1}>
                  <div className={styles.svg}>
                    <svg
                      aria-hidden="true"
                      className="e-font-icon-svg e-fas-box"
                      viewBox="0 0 512 512"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M509.5 184.6L458.9 32.8C452.4 13.2 434.1 0 413.4 0H272v192h238.7c-.4-2.5-.4-5-1.2-7.4zM240 0H98.6c-20.7 0-39 13.2-45.5 32.8L2.5 184.6c-.8 2.4-.8 4.9-1.2 7.4H240V0zM0 224v240c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V224H0z"></path>
                    </svg>
                  </div>
                  <div className={styles.choose}>
                    <h5>Safety Packing</h5>
                    <p>
                      Every bouquet is safely packed to protect freshness
                      <br /> and deliver your flowers in perfect condition.
                    </p>
                  </div>
                </div>
                <div className={styles.reasons3}>
                  <div className={styles.svg}>
                    <svg
                      aria-hidden="true"
                      className="e-font-icon-svg e-fas-award"
                      viewBox="0 0 384 512"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M97.12 362.63c-8.69-8.69-4.16-6.24-25.12-11.85-9.51-2.55-17.87-7.45-25.43-13.32L1.2 448.7c-4.39 10.77 3.81 22.47 15.43 22.03l52.69-2.01L105.56 507c8 8.44 22.04 5.81 26.43-4.96l52.05-127.62c-10.84 6.04-22.87 9.58-35.31 9.58-19.5 0-37.82-7.59-51.61-21.37zM382.8 448.7l-45.37-111.24c-7.56 5.88-15.92 10.77-25.43 13.32-21.07 5.64-16.45 3.18-25.12 11.85-13.79 13.78-32.12 21.37-51.62 21.37-12.44 0-24.47-3.55-35.31-9.58L252 502.04c4.39 10.77 18.44 13.4 26.43 4.96l36.25-38.28 52.69 2.01c11.62.44 19.82-11.27 15.43-22.03zM263 340c15.28-15.55 17.03-14.21 38.79-20.14 13.89-3.79 24.75-14.84 28.47-28.98 7.48-28.4 5.54-24.97 25.95-45.75 10.17-10.35 14.14-25.44 10.42-39.58-7.47-28.38-7.48-24.42 0-52.83 3.72-14.14-.25-29.23-10.42-39.58-20.41-20.78-18.47-17.36-25.95-45.75-3.72-14.14-14.58-25.19-28.47-28.98-27.88-7.61-24.52-5.62-44.95-26.41-10.17-10.35-25-14.4-38.89-10.61-27.87 7.6-23.98 7.61-51.9 0-13.89-3.79-28.72.25-38.89 10.61-20.41 20.78-17.05 18.8-44.94 26.41-13.89 3.79-24.75 14.84-28.47 28.98-7.47 28.39-5.54 24.97-25.95 45.75-10.17 10.35-14.15 25.44-10.42 39.58 7.47 28.36 7.48 24.4 0 52.82-3.72 14.14.25 29.23 10.42 39.59 20.41 20.78 18.47 17.35 25.95 45.75 3.72 14.14 14.58 25.19 28.47 28.98C104.6 325.96 106.27 325 121 340c13.23 13.47 33.84 15.88 49.74 5.82a39.676 39.676 0 0 1 42.53 0c15.89 10.06 36.5 7.65 49.73-5.82zM97.66 175.96c0-53.03 42.24-96.02 94.34-96.02s94.34 42.99 94.34 96.02-42.24 96.02-94.34 96.02-94.34-42.99-94.34-96.02z"></path>
                    </svg>
                  </div>
                  <div className={styles.choose}>
                    <h5>Free Shipping</h5>
                    <p>
                      Enjoy free shipping on all fresh flower bouquets,
                      delivered with care.
                    </p>
                  </div>
                </div>
              </div>
              <div className="" data-aos="fade-left" data-aos-duration="700">
                <div className={styles.reasons2}>
                  <div className={styles.svg}>
                    <svg
                      aria-hidden="true"
                      className="e-font-icon-svg e-fas-shipping-fast"
                      viewBox="0 0 640 512"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M624 352h-16V243.9c0-12.7-5.1-24.9-14.1-33.9L494 110.1c-9-9-21.2-14.1-33.9-14.1H416V48c0-26.5-21.5-48-48-48H112C85.5 0 64 21.5 64 48v48H8c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h272c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H40c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h208c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H8c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h208c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H64v128c0 53 43 96 96 96s96-43 96-96h128c0 53 43 96 96 96s96-43 96-96h48c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zM160 464c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm320 0c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm80-208H416V144h44.1l99.9 99.9V256z"></path>
                    </svg>
                  </div>
                  <div className={styles.choose}>
                    <h5>Original Product</h5>
                    <p>
                      Original floral creations crafted with fresh blooms and
                      pure artistry.
                    </p>
                  </div>
                </div>
                <div className={styles.reasons4}>
                  <div className={styles.svg}>
                    <svg
                      aria-hidden="true"
                      className="e-font-icon-svg e-fas-headset"
                      viewBox="0 0 512 512"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M192 208c0-17.67-14.33-32-32-32h-16c-35.35 0-64 28.65-64 64v48c0 35.35 28.65 64 64 64h16c17.67 0 32-14.33 32-32V208zm176 144c35.35 0 64-28.65 64-64v-48c0-35.35-28.65-64-64-64h-16c-17.67 0-32 14.33-32 32v112c0 17.67 14.33 32 32 32h16zM256 0C113.18 0 4.58 118.83 0 256v16c0 8.84 7.16 16 16 16h16c8.84 0 16-7.16 16-16v-16c0-114.69 93.31-208 208-208s208 93.31 208 208h-.12c.08 2.43.12 165.72.12 165.72 0 23.35-18.93 42.28-42.28 42.28H320c0-26.51-21.49-48-48-48h-32c-26.51 0-48 21.49-48 48s21.49 48 48 48h181.72c49.86 0 90.28-40.42 90.28-90.28V256C507.42 118.83 398.82 0 256 0z"></path>
                    </svg>
                  </div>
                  <div className={styles.choose}>
                    <h5>Support 24/7</h5>
                    <p>
                      Enjoy 100% original products backed by friendly 24/7
                      customer support.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.ctaSection}>
          <div className={styles.ctaContent}>
            <h2>Don’t Hesitate to Contact Us</h2>

            <p>
              Don’t hesitate to contact us—we’re here to help. Send us your
              message, and our team will get back to you shortly.
            </p>

            <button className={styles.ctaButton}>Contact Us</button>
          </div>
        </div>
      </div>

      {/* <AboutFaq /> */}
      <Footer />
    </>
  );
}

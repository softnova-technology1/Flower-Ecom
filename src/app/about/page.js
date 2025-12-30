"use client";

import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Navbar from "@/components/Navbar";
// import AboutFaq from "@/components/AboutFaq";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import styles from "@/styles/about.module.css";
import FinalNav from "@/components/FinalNav";
import Link from "next/link";
import {
  FiBox,
  FiShield,
  FiTruck,
  FiHeadphones,
  FiFeather,
  FiGift,
  FiStar,
} from "react-icons/fi";

export default function AboutPage() {
  return (
    <>
      <ScrollToTop />
      <FinalNav />
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
      <section className={styles.section}>
        {/* TOP CONTENT */}
        <Container>
          <div className={styles.top}>
            <h2>Our Story & Philosophy</h2>
            <p>
              At Dazzling Sky, we believe in the power of nature to transform
              spaces and uplift spirits. Our philosophy centers on bringing the
              freshest, most vibrant flowers from garden to home, ensuring every
              bouquet tells a unique story of beauty and craftsmanship.
            </p>
            <p className={styles.lastText}>
              We are dedicated to sustainable practices, ethical sourcing, and
              creating timeless floral arrangements that not only adorn your space
              but also reflect your personal style and create lasting memories.
            </p>
          </div>
        </Container>
        {/* TITLE */}
        <h3 className={styles.subTitle}>Explore Our Floral World</h3>

        {/* CARDS */}
        <div className={styles.cards}>
          {/* CARD 1 */}
          <div className={styles.card}>
            <img src="/images/aboutbl1.jpg" alt="Flower Collection" />
            <div className={styles.cardBody}>
              <h4>Flower Collections</h4>
              <p>
                Discover our exquisite range of handcrafted bouquets, designed
                for every mood, moment, and occasion.
              </p>
              <Link href="/products" className={styles.button}>
                View Collections
              </Link>
            </div>
          </div>

          {/* CARD 2 */}
          <div className={styles.card}>
            <img src="/images/aboutbl.jpg" alt="Floral Inspiration" />
            <div className={styles.cardBody}>
              <h4>Floral Inspirations</h4>
              <p>
                Dive into our blog for fresh floral ideas, styling tips, bouquet
                inspiration, trends, and expert flower care guidance.
              </p>
              <Link href="/blog" className={styles.button}>
                Read Our Blog
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.sectionRs}>
        <div className={styles.containerRs}>
          <h2 className={styles.titleRs}>Why Choose Dazzling Sky?</h2>

          <div className={styles.featuresRs}>
            <div className={styles.featureCardRs}>
              <FiBox className={styles.iconRs} />
              <h4>Safety Packing</h4>
              <p className={styles.textRs}>
                Every bouquet is safely packed to protect freshness and deliver
                your flowers in perfect condition, ensuring they arrive just as
                vibrant as they left.
              </p>
            </div>

            <div className={styles.featureCardRs}>
              <FiShield className={styles.iconRs} />
              <h4>Original Product</h4>
              <p className={styles.textRs}>
                Original floral creations crafted with fresh blooms and pure
                artistry. We guarantee the authenticity and unique design of
                every single arrangement.
              </p>
            </div>

            <div className={styles.featureCardRs}>
              <FiTruck className={styles.iconRs} />
              <h4>Free Shipping</h4>
              <p className={styles.textRs}>
                Enjoy free shipping on all fresh flower bouquets, delivered with
                care directly to your doorstep, making your experience
                effortless
              </p>
            </div>

            <div className={styles.featureCardRs}>
              <FiHeadphones className={styles.iconRs} />
              <h4>Support 24/7</h4>
              <p className={styles.textRs}>
                Enjoy 100% original products backed by friendly 24/7 customer
                support. Our dedicated team is always ready to assist you with
                any query.
              </p>
            </div>
          </div>

          <h3 className={styles.subTitleRs}>Our Core Values</h3>

          <div className={styles.valuesRs}>
            <div className={styles.valueCardRs}>
              <FiFeather className={styles.iconPinkRs} />
              <h4>Sustainable Sourcing</h4>
              <p className={styles.textRs}>
                Committed to ethically sourcing the freshest flowers from
                trusted growers, ensuring beauty and environmental
                responsibility.
              </p>
            </div>

            <div className={styles.valueCardRs}>
              <FiGift className={styles.iconPinkRs} />
              <h4>Artisanal Craftsmanship</h4>
              <p className={styles.textRs}>
                Each bouquet is meticulously hand-crafted by skilled florists,
                blending creativity with timeless elegance for unique designs
              </p>
            </div>

            <div className={styles.valueCardRs}>
              <FiStar className={styles.iconPinkRs} />
              <h4>Customer Delight</h4>
              <p className={styles.textRs}>
                We prioritize your satisfaction, offering personalized service
                and ensuring every floral experience is exceptional and
                memorable.
              </p>
            </div>

            <div className={styles.valueCardRs}>
              <FiShield className={styles.iconPinkRs} />
              <h4>Guaranteed Freshness</h4>
              <p className={styles.textRs}>
                Our strict quality control ensures that every bloom arrives
                vibrant, fresh, and ready to bring joy to your space
              </p>
            </div>

            <div className={styles.valueCardRs}>
              <FiTruck className={styles.iconPinkRs} />
              <h4>Seamless Delivery</h4>
              <p className={styles.textRs}>
                Enjoy prompt and careful delivery, ensuring your beautiful
                arrangements arrive in perfect condition, every time
              </p>
            </div>

            <div className={styles.valueCardRs}>
              <FiHeadphones className={styles.iconPinkRs} />
              <h4>Dedicated Support</h4>
              <p className={styles.textRs}>
                Our friendly team is always ready to assist you, providing
                expert advice and support for all your floral needs.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.sectionRs1}>
        <Container>
          <div className={styles.containerRs1}>
            <h2 className={styles.titleRs1}>Don't Hesitate to Contact Us</h2>
            <p className={styles.textRs1}>
              Don't hesitate to contact us—we're here to help. Send us your
              message, and our team will get back to you shortly.
            </p>
            <Link href="/contact" className={styles.buttonRs1}>
              Contact Us
            </Link>
          </div>
        </Container>
      </section>
      <Footer />
    </>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// import Category from "@/components/Category";
// import FlashSale from "@/components/FlashSale";
// import New from "@/components/New";
// import ProductSection from "@/components/ProductSection";
// import Customer from "@/components/Customer";
// import Faq from "@/components/Faq";
// import Service from "@/components/Service";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import styles from "@/styles/Home.module.css";
// import { Container } from "react-bootstrap";
import { Container, Offcanvas, Button } from "react-bootstrap";
import { HiShoppingBag } from "react-icons/hi2";
import Link from "next/link";
import Image from "next/image";

const rightData = [
  { title: "Whispering Meadows", price: 45, img: "/images/h-3.png" },
  { title: "Serene Bliss", price: 60, img: "/images/h-4.png" },
  { title: "Floral Harmony", price: 80, img: "/images/h-5.png" },
  { title: "Springtime Serenade", price: 65, img: "/images/h-6.png" },
];

export default function Home() {
  const router = useRouter();
  const Goproducts = () => {
    router.push("/products");
  };
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <ScrollToTop />
      {/* <Navbar /> */}
      <section>
        <div className={styles.hero}>
          <div className={styles.header}>
            <div className={styles.logo}>
              <div>
                <Button variant="primary" onClick={handleShow}>
                  <img src="/images/logo-main.png" alt="" width={"100%"} className={styles.logos}/>
                </Button>
                <div className={styles.Offlink1}>
                  <Offcanvas
                    show={show}
                    onHide={handleClose}                 
                  >
                    <Offcanvas.Header>
                      <Offcanvas.Title>
                        <img
                          src="/images/logo-main.png"
                          alt=""
                          width={"100%"}
                        />
                      </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                      <div className={styles.Offlinks}>
                        <Link href="/about">About</Link>
                        <Link href="/products">Shop</Link>
                        <Link href="/blog">Blog</Link>
                        <Link href="/faq">FAQ</Link>
                        <Link href="/contact">Contact</Link>
                      </div>
                    </Offcanvas.Body>
                  </Offcanvas>
                </div>
              </div>
            </div>
            <div className={styles.cartIcon}>
              <HiShoppingBag fill="white" size={40} />
            </div>
          </div>
          <Container>
            <div className={styles.contents}>
              <h1>
                Providing joy, one flower at a time - <br /> transforming petals
                into perfect moments
              </h1>
              <p>
                Experience a refined online destination for fresh, artistically
                handcrafted flower bouquets. <br />
                Each arrangement is thoughtfully created with love, creativity,
                and the finest premium blooms. <br />
                Share happiness, express heartfelt emotions, and mark life’s
                special moments with flowers that truly speak for you.
              </p>
              <button onClick={Goproducts}>Shop Now</button>
            </div>
          </Container>
        </div>
      </section>
      <section className={styles.section}>
        <Container>         
        <div className={styles.container}>
          <div className={styles.wrapper}>
            {/* LEFT BIG CARD */}
            <div className={styles.leftCard}>
              <img
                src="/images/home-1.png"
                alt="Whispering Blooms"
                className={styles.mainImg}
              />
              <div className={styles.leftContent}>
                <div className={styles.we}>
                  <h4 className={styles.cardTitle}>Whispering Blooms</h4>
                  <span className={styles.price}>from 50 SGD</span>
                </div>

                <p className={styles.desc}>
                  At Our Store, we take pride in offering a stunning selection
                  of the most popular flowers that capture hearts and inspire
                  joy.
                </p>

                <div className={styles.btnWrap}>
                  <button
                    className={styles.btn}
                    onClick={() => router.push("/products")}
                  >
                    See Catalog →
                  </button>
                </div>
              </div>
            </div>
            {/* RIGHT SECTION */}
            <div className={styles.rightSection}>
              <h2 className={styles.headingmain}>
                Unveiling Our Popular <br /> Bouquet Collection
              </h2>

              <div className={styles.cards}>
                <div className={styles.smallCard}>
                  <img src="/images/home-2.png" alt="Enchanted Petals" />
                  <div className={styles.we}>
                    <h5>Enchanted Petals</h5>
                    <span>from 70 SGD</span>
                  </div>
                </div>

                <div className={styles.smallCard}>
                  <img src="/images/home-3.png" alt="Harmony Bouquet" />
                  <div className={styles.we}>
                    <h5>Harmony Bouquet</h5>
                    <span>from 40 SGD</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </Container>
      </section>

      <section className={styles.section1}>
        <Container>
        <div className={styles.wrapper1}>
          {/* LEFT SIDE */}
          <div className={styles.left1}>
            <h2 className={styles.heading1}>
              A Fragrant Tale: Weaving
             
              Memories with Flowers
            </h2>

            <div className={styles.leftImage1}>
              <img src="/images/home-4.png" alt="Flower Making" />
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className={styles.right1}>
            <div className={styles.rightImage1}>
              <img src="/images/home-5.png" alt="Flower Shop" />
            </div>

            <div className={styles.content1}>
              <p className={styles.text1}>
                Blossomia Flower Store sprouted from a passion for nature’s
                exquisite blooms, cultivating a haven where the beauty of
                flowers could inspire and uplift. Each flower that graces our
                store is carefully selected, ensuring that only the freshest and
                most vibrant petals find their way into our arrangements.
              </p>

              <p className={styles.text1}>
                With meticulous attention to detail, our skilled florists
                handpick the freshest blossoms, crafting enchanting arrangements
                that become symbols of love, joy, and beauty in life’s precious
                moments. Whether you want to surprise a loved one or decorate an
                event, Blossomia Flower Store is the perfect choice.
              </p>
              <div className={styles.btnWrap}>
                <button
                  className={styles.button1}
                  onClick={() => router.push("/blog")}
                >
                  Read More →
                </button>
              </div>
            </div>
          </div>
        </div>
        </Container>
      </section>

      <section className={styles.catalogSection}>
        <Container>
        <div className={styles.container}>
          <div className={styles.catalogWrapper}>
            {/* LEFT COLUMN */}
            <div className={styles.leftColumn}>
              <div className={styles.card}>
                <img src="/images/h-1.png" alt="Enchanted Petals" />
                <div className={styles.cardInfo}>
                  <h5>Enchanted Petals</h5>
                  <div className={styles.a2}>
                    <p className={styles.price}>70 SGD</p>
                    <div className={styles.icons}>♡ 🛒</div>
                  </div>
                </div>
              </div>

              <div className={styles.card}>
                <img src="/images/h2.png" alt="Floral Harmony" />
                <div className={styles.cardInfo}>
                  <h5>Floral Harmony</h5>
                  <div className={styles.a2}>
                    <p className={styles.price}>80 SGD</p>
                    <div className={styles.icons}>♡ 🛒</div>
                  </div>
                </div>
              </div>
              <div className={styles.btnWrap}>
                <button
                  className={styles.openMoreBtn}
                  onClick={() => router.push("/products")}
                >
                  Open More →
                </button>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className={styles.rightColumn}>
              <h2 className={styles.heading}>
                Catalog of Floral Delights <br /> for Every Occasion
              </h2>

              <div className={styles.rightGrid}>
                {rightData.map((item, i) => (
                  <div className={styles.card} key={i}>
                    <img src={item.img} alt={item.title} />
                    <div className={styles.cardInfo}>
                      <h5>{item.title}</h5>
                      <div className={styles.a2}>
                        <p className={styles.price}>{item.price} SGD</p>
                        <div className={styles.icons}>♡ 🛒</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        </Container>
      </section>

      <section className={styles.wrappercon}>
        <Container>
        <div className={styles.containercon}>
          {/* LEFT SIDE */}
          <div className={styles.leftImgcon}>
            <img
              src="/images/con-3.png"
              alt="Bouquet"
              className={styles.bigImage}
            />

            <p className={styles.desccon}>
              Be the first to know about our exciting events, exclusive offers,
              and new arrivals. Join our floral community and let us fill your
              feed with beauty and botanical wonders. Follow us today and embark
              on a blooming journey that will ignite your passion for all things
              floral.
            </p>
            <div className={styles.btnWrap}>
              <button
                className={styles.btncon}
                onClick={() => router.push("/contact")}
              >
                Contact Us <span>→</span>
              </button>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className={styles.rightcon}>
            <h2 className={styles.headingf}>
              Stay Connected: Follow <br /> Our Floral Journey
            </h2>

            <div className={styles.imageRowcon}>
              <img src="/images/con-2.png" alt="Flowers" />
              <img src="/images/con-1.png" alt="Flowers" />
            </div>
          </div>
        </div>
        </Container>
      </section>

      <section className={styles.contactSection}>
        <Container>
        {/* HEADER */}
        <div className={styles.headers1}>
          <h1>
            Get in <span>touch</span>
          </h1>
          <p>
            Reach out, and let's create a universe of possibilities together!
          </p>
        </div>

        {/* CARD */}
        <div className={styles.cardcon}>
          {/* LEFT FORM */}
          <div className={styles.formBox}>
            <h2>Let’s connect constellations</h2>
            <p>
              Let's align our constellations! Reach out and let the magic of
              collaboration illuminate our skies.
            </p>

            <div className={styles.row}>
              <input placeholder="Last Name" />
              <input placeholder="First Name" />
            </div>

            <input placeholder="Email" />
            <input placeholder="Phone Number" />
            <textarea placeholder="Message" rows={4}></textarea>

            <button>Send it to the Floor</button>
          </div>

          {/* RIGHT IMAGE */}
          <div className={styles.imageBox}>
            <Image
              src="/images/contact1.jpg" // change path if needed
              alt="Flowers"
              fill
              className={styles.image}
            />
            <p className={styles.quote}>
              “Two lunar months revealed Earth’s fragile beauty against vast
              silence, transforming my view of our place in the universe.”
              <br />
              <span>— Irinel Traista</span>
            </p>
          </div>
        </div>
        </Container>
      </section>
      {/* <Category />
      <FlashSale />
      <New />
      <ProductSection />
      <Customer />
      <Faq />
      <Service /> */}
      <Footer />
    </>
  );
}

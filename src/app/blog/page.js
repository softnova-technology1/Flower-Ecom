"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import styles from "@/styles/Blog.module.css";
import { Container } from "react-bootstrap";
import FinalNav from "@/components/FinalNav";

export default function BlogPage() {
  const router = useRouter();
  const [offsetY, setOffsetY] = useState(0);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleScroll = () => {
    setOffsetY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch('/api/blogs');
        const data = await res.json();
        if (data.success) {
          setBlogs(data.blogs);
        }
      } catch (error) {
        console.error("Failed to fetch blogs", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <>
        <FinalNav />
        <div style={{ textAlign: "center", padding: "100px 20px" }}>
          <h2>Loading blogs...</h2>
        </div>
        <Footer />
      </>
    );
  }

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
      <div className={styles.blogwrapper}>
        <div className={styles.blogcontainer}>
          {blogs.length === 0 ? (
            <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "40px" }}>
              <p>No blog posts found. Check back later!</p>
            </div>
          ) : (
            blogs.map((item) => (
              <div
                className={styles.blogcard}
                key={item._id}
                onClick={() => router.push(`/blog/${item.slug}`)}
              >
                <h2 className={styles.blogtitle}>{item.title}</h2>

                <img src={item.image} alt={item.title} className={styles.blogimg} />

                <p className={styles.blogdesc}>{item.excerpt || (item.content ? item.content.substring(0, 100).replace(/<[^>]*>?/gm, '') + "..." : "")}</p>
                <button className={styles.readMoreBtn}>Read More</button>
              </div>
            )))}
        </div>
      </div>

      <Footer />
    </>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { blogData } from "@/data/BlogData";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import styles from "@/styles/BlogSingle.module.css";
import { Container } from "react-bootstrap";
import FinalNav from "@/components/FinalNav";

export default function BlogSinglePage() {
  const [offsetY, setOffsetY] = useState(0);
  const router = useRouter();
  const params = useParams();

  const handleScroll = () => {
    setOffsetY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [formData, setFormData] = useState({
    comment: "",
    name: "",
    email: "",
    website: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const id = parseInt(params.id);
  const post = blogData[id];

  if (!post) {
    return (
      <>
        <FinalNav />
        <div
          style={{ textAlign: "center", padding: "100px 20px", color: "white" }}
        >
          <h2>Post not found</h2>
          <button
            onClick={() => router.push("/blog")}
            style={{
              marginTop: "20px",
              padding: "12px 30px",
              background: "#c78a3a",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Back to Blog
          </button>
        </div>
        <Footer />
      </>
    );
  }

  const validateForm = () => {
    let newErrors = {};
    if (!formData.comment.trim())
      newErrors.comment = "Please fill this required field !";
    if (!formData.name.trim())
      newErrors.name = "Please fill this required field !";
    if (!formData.email.trim())
      newErrors.email = "Please fill this required field!";
    if (!formData.website.trim())
      newErrors.website = "Please fill this required field!";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      alert("Comment submitted!");
      setFormData({
        comment: "",
        name: "",
        email: "",
        website: "",
      });
      setErrors({});
    }
  };

  return (
    <>
      <ScrollToTop />
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
      <div className={styles.Mainblogsingle}>
        <div className={styles.blogDetailsWrapper}>
          {/* <div className={styles.blogLeft}>
            <img src={post.img} alt="" className={styles.blogmainimg} />

            <h1 className={styles.blogtitle}>{post.title}</h1>

            <p className={styles.blogpara}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmodtempor incididunt ut labore et dolore magna aliqua. Ut enim
              ad minim veniam,quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodoconsequat. Duis aute irure dolor in
              reprehenderit in voluptate velit essecillum dolore eu fugiat nulla
              pariatur. Excepteur sint occaecat cupidatat nonproident, sunt in
              culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum
              dolor sit amet, consectetur adipisicing elit, sed do eiusmodtempor
              incididunt ut labore et dolore magna aliqua.
            </p>

            <p className={styles.blogpara}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmodtempor incididunt ut labore et dolore magna aliqua. Ut enim
              ad minim veniam,quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodoconsequat. Duis aute irure dolor in
              reprehenderit in voluptate velit essecillum dolore eu fugiat nulla
              pariatur. Excepteur sint occaecat cupidatat nonproident, sunt in
              culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum
              dolor sit amet, consectetur adipisicing elit, sed do eiusmodtempor
              incididunt ut labore et dolore magna aliqua.
            </p>

            <p className={styles.blogquote}>
              "Ut enim ad minim veniam,quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodoconsequat. Duis aute irure dolor in
              reprehenderit in voluptate velit essecillum dolore eu fugiat nulla
              pariatur."
            </p>

            <p className={styles.blogpara}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmodtempor incididunt ut labore et dolore magna aliqua. Ut enim
              ad minim veniam,quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodoconsequat. Duis aute irure dolor in
              reprehenderit in voluptate velit essecillum dolore eu fugiat nulla
              pariatur. Excepteur sint occaecat cupidatat nonproident, sunt in
              culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum
              dolor sit amet, consectetur adipisicing elit, sed do eiusmodtempor
              incididunt ut labore et dolore magna aliqua.
            </p>

            <h5 className={styles.replytitle}>Leave a Reply</h5>
            <p className={styles.replynote}>
              Your email address will not be published. Required fields are
              marked *
            </p>

            <form className={styles.replyform} onSubmit={handleSubmit}>
              <label>Comment *</label>
              <textarea
                rows="6"
                name="comment"
                value={formData.comment}
                onChange={handleChange}
              ></textarea>
              {errors.comment && (
                <p className={styles.error}>{errors.comment}</p>
              )}

              <label>Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <p className={styles.error}>{errors.name}</p>}

              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className={styles.error}>{errors.email}</p>}

              <label>Website</label>
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
              />
              {errors.website && (
                <p className={styles.error}>{errors.website}</p>
              )}

              <div className={styles.checkboxrow}>
                <input type="checkbox" id="saveInfo" className={styles.check} />
                <p className={styles.p1}>
                  Save my name, email, and website in this browser for the next
                  time I comment.
                </p>
              </div>

              <button className={styles.commentbtn}>Post Comment</button>
            </form>
          </div> */}

          <div className={styles.blogLeft}>
            <img src={post.img} alt="" className={styles.blogmainimg} />

            <h1 className={styles.blogtitle}>{post.title}</h1>

            <p className={styles.blogpara}>{post.desc}</p>

            <div className={styles.packageSection}>
              <ul>
                {post.maintain.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            <p className={styles.blogquote}>{post.note}</p>

            <div className={styles.originPara}>
              <p>{post.origin}</p>
            </div>

            <div className={styles.packageSection}>
              <ul>
                {post.symbolic.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className={styles.blogright}>
            <h4 className={styles.recenttitle}>Recent Post</h4>
            <div className={styles.scrollContainer}>
              <div className={styles.scrollContent}>
                {[...blogData, ...blogData].map((item, i) => (
                  <div
                    className={styles.recentpost}
                    key={i}
                    onClick={() => router.push(`/blog/${i % blogData.length}`)}
                  >
                    <img src={item.img} alt="" />
                    <div>
                      <h6>{item.title}</h6>
                      <p>{item.date} - No Comments</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

"use client";

import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Link from "next/link";
import styles from "../styles/FinalNav.module.css";
import LoginPop from "@/components/LoginPop";
import SignupPop from "@/components/SignupPop";
import ResetPop from "@/components/ResetPop";
export default function FinalNav() {
  const [popup, setPopup] = useState(null);
  return (
    <>
      {/* ===== TOP NAVBAR ===== */}
      <nav className={`navbar navbar-dark bg-dark p-5 ${styles.navbar}`}>
        <Container className="d-flex align-items-center">

          <div className="d-none d-lg-flex  gap-5">
            {/* TOGGLE → HOME */}
            <Link
              href="/"
              className={styles.homeToggle}
              aria-label="Go to Home"
            >
              <span></span>
              <span></span>
              <span></span>
            </Link>
            <Link href="/about" className={styles.navLink}>
              About Us
            </Link>
            <Link href="/products" className={styles.navLink}>
             Shop
            </Link>
            <Link href="/contact" className={styles.navLink}>
              Contacts
            </Link>
            <Link href="/blog" className={styles.navLink}>
              Blog
            </Link>
            <Link href="/faq" className={styles.navLink}>
              Faq
            </Link>
          </div>

          <div className={styles.iconWrap}>
            <div className="d-flex gap-4">
              <div className={styles.NavIcons}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  className={styles.icon}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </div>

              <div className={styles.NavIcons}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  className={styles.icon}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
              </div>

              <div
                className={styles.NavIcons}
                onClick={() => setPopup("welcome")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={styles.icon}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
              </div>

              {popup === "welcome" && (
                <LoginPop
                  close={() => setPopup(null)}
                  openSignup={() => setPopup("signup")}
                />
              )}

              {popup === "signup" && (
                <SignupPop
                  close={() => setPopup(null)}
                  openReset={() => setPopup("reset")}
                />
              )}

              {popup === "reset" && <ResetPop close={() => setPopup(null)} />}
              <div className={styles.NavIcons}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={styles.icon}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </Container>
      </nav>

      {/* ===== OFFCANVAS (MOBILE & TABLET) ===== */}
      <div className="offcanvas offcanvas-start" tabIndex="-1" id="mobileMenu">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">Menu</h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
          ></button>
        </div>

        <div className="offcanvas-body">
          <ul className="navbar-nav gap-3">
            <Link
              href="/about"
              className="nav-link"
              data-bs-dismiss="offcanvas"
            >
              About Us
            </Link>
            <Link
              href="/catalog"
              className="nav-link"
              data-bs-dismiss="offcanvas"
            >
              Shop
            </Link>
            <Link
              href="/contacts"
              className="nav-link"
              data-bs-dismiss="offcanvas"
            >
              Contacts
            </Link>
            <Link href="/blog" className="nav-link" data-bs-dismiss="offcanvas">
              Blog
            </Link>
            <Link href="/faq" className="nav-link" data-bs-dismiss="offcanvas">
              Faq
            </Link>
          </ul>
        </div>
      </div>
    </>
  );
}

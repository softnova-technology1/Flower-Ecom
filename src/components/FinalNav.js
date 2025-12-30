"use client";

import React, { useState } from "react";
import Link from "next/link";
import styles from "../styles/FinalNav.module.css";
import LoginPop from "@/components/LoginPop";
import SignupPop from "@/components/SignupPop";
import ResetPop from "@/components/ResetPop";
export default function FinalNav() {
  const [popup, setPopup] = useState(null);

  
  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.navInner}>
          {/* LEFT MENU */}
          <div className={styles.leftMenu}>
            <Link href="/about">About Us</Link>
            <Link href="/products">Shop</Link>
            <Link href="/contact">Contacts</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/faq">Faq</Link>
          </div>

          {/* CENTER LOGO */}
          <div className={styles.logoCenter}>
            <Link href="/">
              <img src="/images/logo-black.png" alt="Logo" />
            </Link>
          </div>

          {/* RIGHT ICONS (UNCHANGED SVGs) */}
          <div className={styles.rightIcons}>
            {/* WISHLIST */}
            <div className={styles.NavIcons}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5
                  -1.935 0-3.597 1.126-4.312 2.733
                  -.715-1.607-2.377-2.733-4.313-2.733
                  C5.1 3.75 3 5.765 3 8.25
                  c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            </div>

            {/* USER */}
            <div
              className={styles.NavIcons}
              onClick={() => setPopup("welcome")}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0
                  3.75 3.75 0 0 1 7.5 0ZM4.501 20.118
                  a7.5 7.5 0 0 1 14.998 0
                  A17.933 17.933 0 0 1 12 21.75
                  c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            </div>

            {/* CART */}
            <div className={styles.NavIcons}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343
                  1.087.835l.383 1.437M7.5 14.25
                  a3 3 0 0 0-3 3h15.75
                  m-12.75-3h11.218
                  c1.121-2.3 2.1-4.684
                  2.924-7.138a60.114
                  60.114 0 0 0-16.536-1.84
                  M7.5 14.25 5.106 5.272
                  M6 20.25a.75.75 0 1 1-1.5 0
                  .75.75 0 0 1 1.5 0Zm12.75 0
                  a.75.75 0 1 1-1.5 0
                  .75.75 0 0 1 1.5 0Z"
                />
              </svg>
            </div>
          </div>
        </div>
      </nav>

      {/* POPUPS */}
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

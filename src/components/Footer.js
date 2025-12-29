import styles from "../styles/Footer.module.css";
import {
  FaInstagram,
  FaFacebookF,
  FaEnvelope,
  FaWhatsapp,
} from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Left */}
        <div className={styles.brand}>
          <img src="/images/logo-main.png" alt="" width={"100%"} />

          <div className={styles.socials}>
            <FaInstagram />
            <FaFacebookF />
            <FaEnvelope />
            <FaWhatsapp />
          </div>
        </div>
        <div className={styles.column}>
          <h4>Categories</h4>
          <ul className={styles.listRs}>
            <li>
              <Link href="/about">About Us</Link>
            </li>
            <li>
              <Link href="/products">Shop</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
            <li>
              <Link href="/blog">Blog</Link>
            </li>
            <li>
              <Link href="/faq">FAQ</Link>
            </li>
          </ul>
        </div>
        {/* Support */}
        <div className={styles.column}>
          <h4>Support</h4>
          <ul>
            <li>
              <Link href="/terms">Terms & Condition</Link>
            </li>
            <li>
              <Link href="/privacy-policy">Privacy Policy</Link>
            </li>

            <li>24/7 Chart</li>
            <li>Wishlist</li>
          </ul>
        </div>
        {/* Contact */}
        <div className={styles.column}>
          <h4>Contact</h4>
          <ul className={styles.contact}>
            <li>+65 8814 4043</li>
            <li>info@dazzlingsky.com</li>
            <li>
              01-019, Jalan besar <br />
              singapore 208786
            </li>
            <li>9:00 - 7:00</li>
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>
          Dazzling Sky © Copyright 2026. All rights reserved.
          <a
            href="https://softnovatech.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.softnova}
          >
            {" "}
            Designed by Softnova Tech
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;

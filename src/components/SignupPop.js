"use client";

import { FiEdit2 } from "react-icons/fi";
import { HiCheck } from "react-icons/hi";
import styles from "@/styles/Popups.module.css";

export default function SignupPop({ close, openReset }) {
  return (
    <div className={styles.overlay} onClick={close}>
      <div
        className={`${styles.modal} ${styles.signup}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button className={styles.close} onClick={close}>
          ×
        </button>

        <h2 className={styles.title}>Sign up</h2>

        <p className={styles.subtitle}>
          Become a member and enjoy personalized gift recommendations, fast
          checkout, and more.
        </p>

        {/* Verified phone row */}
        <div className={styles.phoneRow}>
          <span className={styles.check}>
            <HiCheck size={30} stroke={3} />
            <span className={styles.phone}>+650980275095</span>

          </span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.svg}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
          </svg>

        </div>

        <div className={styles.line} />

        <label className={styles.label}>Enter code from sms</label>

        <input
          className={styles.otpInput}
          placeholder="XX XX XX"
        />

        <p className={styles.helper}>
          Please check your phone for a message containing a code to enter
        </p>

        <button className={styles.primary}>JOIN US</button>

        <p className={styles.resend}>
          Didn&apos;t receive a code? <span>Resend code</span>
        </p>

        <footer className={styles.footer}>
          <span>Privacy Policy</span>
          <span>|</span>
          <span>Terms and Conditions</span>
        </footer>
        <div className="pt-2 text-center" >
          <span onClick={openReset} style={{fontSize:"13px"}}><u> Forgot password?</u></span>

        </div>
      </div>
    </div>
  );
}

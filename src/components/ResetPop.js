import styles from "@/styles/Popups.module.css";

export default function ResetPop({ close }) {
  return (
    <div className={styles.overlay} onClick={close} >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()} id={styles.resets}>
        <button className={styles.close} onClick={close}>✕</button>
        <h2>Reset your password</h2>
        <p>Please provide your phone number below to receive a code for restoring access to your account</p>

        <label htmlFor="" className="pb-3">Enter your mobile number</label>
        <input placeholder="+65 XX XXX XX XX" />
        <button className={styles.primary}>CONTINUE</button>


         <footer className={styles.footer}>
          <span>Privacy Policy</span>
          <span>|</span>
          <span>Terms and Conditions</span>
        </footer>
      </div>
      
    </div>
  );
}

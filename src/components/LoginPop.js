import styles from "@/styles/Popups.module.css";

export default function LoginPop({ close, openSignup }) {
  return (
    <div className={styles.overlay} onClick={close}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={close}>✕</button>

        <h2>Greetings! Welcome to Floral gift shop.</h2>
        <p className={styles.num}>Use your mobile number to sign up or log in</p>

        <input placeholder="+65 XX XXX XX XX" />
        <button className={styles.primary}>CONTINUE</button>
        {/* <p className={styles.ors}><span></span>or <span></span></p> */}
        <fieldset className={styles.orFieldset}>
          <legend>or</legend>
        </fieldset>

        <span className={styles.divider}>
          Instantly login or sign up via Google
        </span>

        <button className={styles.outline}><img src='/images/google.png' width={'20px'}/>CONTINUE WITH GOOGLE</button>


        <div className={styles.privacy}>
          Privacy Policy | Terms and Conditions
        </div>
        <footer className={styles.footer}>
          <span onClick={openSignup}>Sign up</span>
        </footer>
      </div>
    </div>
  );
}

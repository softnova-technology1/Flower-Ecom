import FinalNav from "@/components/FinalNav";
import Footer from "@/components/Footer";
import styles from "@/styles/terms-policy.module.css";

export const metadata = {
  title: "Privacy Policy | Sky Eagle",
  description:
    "Privacy Policy of Sky Eagle garden maintenance and landscaping services",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <FinalNav />

      <section className={styles.page}>
        <div className={styles.container}>
          <div className={styles.wrapper}>
            <h1 className={styles.title}>Privacy Policy – Sky Eagle</h1>
            <p>
              {" "}
              Sky Eagle (“we,” “our,” or “us”) respects your privacy and is
              committed to protecting the personal information you share with
              us. This Privacy Policy explains how we collect, use, and
              safeguard your information when you visit our website.{" "}
            </p>{" "}
            <h3>1. Information We Collect</h3> <h3>Personal Information</h3>{" "}
            <p>When you contact us through forms or email, we may collect:</p>{" "}
            <ul>
              {" "}
              <li>Name</li> <li>Phone number</li> <li>Email address</li>{" "}
              <li>Service-related enquiry details</li>{" "}
            </ul>{" "}
            <h3>Non-Personal Information</h3>{" "}
            <p>We may collect basic technical data such as:</p>{" "}
            <ul>
              {" "}
              <li>Browser type</li> <li>Device information</li>{" "}
              <li>IP address</li> <li>Pages visited</li>{" "}
            </ul>{" "}
            <p>
              {" "}
              This data is used only for website performance and security
              purposes.{" "}
            </p>{" "}
            <h3>2. How We Use Your Information</h3>{" "}
            <ul>
              {" "}
              <li>Respond to enquiries and service requests</li>{" "}
              <li>Provide garden maintenance and landscaping consultations</li>{" "}
              <li>Improve our services and website experience</li>{" "}
              <li>Communicate important updates related to our services</li>{" "}
            </ul>{" "}
            <p>We do not sell, rent, or trade your personal information.</p>{" "}
            <h3>3. Cookies</h3>{" "}
            <p>
              {" "}
              Our website may use basic cookies to enhance user experience and
              monitor website traffic. You can disable cookies in your browser
              settings at any time.{" "}
            </p>{" "}
            <h3>4. Data Security</h3>{" "}
            <p>
              {" "}
              We implement reasonable security measures to protect your
              information from unauthorized access, misuse, or disclosure.
              However, no online platform can guarantee 100% security.{" "}
            </p>{" "}
            <h3>5. Third-Party Links</h3>{" "}
            <p>
              {" "}
              Our website may contain links to third-party websites. Sky Eagle
              is not responsible for the privacy practices or content of those
              external sites.{" "}
            </p>{" "}
            <h3>6. Children’s Privacy</h3>{" "}
            <p>
              {" "}
              Our services are not directed toward children under the age of 13.
              We do not knowingly collect personal information from children.{" "}
            </p>{" "}
            <h3>7. Changes to This Privacy Policy</h3>{" "}
            <p>
              {" "}
              Sky Eagle reserves the right to update this Privacy Policy at any
              time. Any changes will be posted on this page with an updated
              effective date.{" "}
            </p>{" "}
            <h3>8. Contact Us</h3>{" "}
            <p>
              {" "}
              If you have any questions about this Privacy Policy or how we
              handle your information, please contact us:{" "}
              <strong>Sky Eagle</strong>{" "}
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

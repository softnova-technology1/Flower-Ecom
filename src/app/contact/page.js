// "use client";

// import React, { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import { contactAPI } from "@/lib/api";
// import Footer from "@/components/Footer";
// import ScrollToTop from "@/components/ScrollToTop";
// import styles from "@/styles/Contact.module.css";
// import FinalNav from "@/components/FinalNav";
// import { Container } from "react-bootstrap";
// import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
// import {
//   FaTwitter,
//   FaFacebookF,
//   FaYoutube,
//   FaVimeoV,
//   FaInstagram,
// } from "react-icons/fa";
// export default function ContactPage() {
//   const [offsetY, setOffsetY] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });

//   const handleScroll = () => {
//     setOffsetY(window.scrollY);
//   };

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validation
//     if (
//       !formData.name.trim() ||
//       !formData.email.trim() ||
//       !formData.message.trim()
//     ) {
//       toast.error("Please fill all fields", {
//         position: "top-center",
//       });
//       return;
//     }

//     if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       toast.error("Please enter a valid email", {
//         position: "top-center",
//       });
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await contactAPI.submit(formData);

//       if (response.success) {
//         toast.success(
//           "Message sent successfully! We'll get back to you soon.",
//           {
//             position: "top-center",
//           }
//         );
//         // Clear form
//         setFormData({ name: "", email: "", message: "" });
//       }
//     } catch (error) {
//       toast.error(
//         error.message || "Failed to send message. Please try again.",
//         {
//           position: "top-center",
//         }
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <ScrollToTop />
//       <FinalNav />
//       <section>
//         <div className={styles.hero}>
//           <Container>
//             <div className={styles.contents}>
//               <h1>Make Your Home as Comfortable as Possible</h1>
//               <p>
//                 Make your home as comfortable as possible with the natural charm
//                 of fresh flowers.
//                 <br />
//                 Add comfort and elegance to your home with beautifully crafted
//                 fresh flower bouquets
//               </p>
//             </div>
//           </Container>
//         </div>
//       </section>
//       <section className={styles.heroSection}>
//         <div className={styles.hero}>
//           <div className={styles.card}>
//             <h3>CONTACT US</h3>

//             <div className={styles.info}>
//               <p>
//                 <FiMail /> info@example.com
//               </p>
//               <p>
//                 <FiPhone /> 001985512-854
//               </p>
//               <p>
//                 <FiMapPin />
//                 John Smith 123 Main Street Amsterdam,
//                 <br />
//                 NH 1000 Netherlands
//               </p>
//             </div>

//             <div className={styles.social}>
//               <h4>Social</h4>

//               <p>
//                 <FaTwitter /> @exampleAccount
//               </p>
//               <p>
//                 <FaFacebookF /> @exampleAccount
//               </p>
//               <p>
//                 <FaYoutube /> @exampleAccount
//               </p>
//               <p>
//                 <FaVimeoV /> @exampleAccount
//               </p>
//               <p>
//                 <FaInstagram /> @exampleAccount
//               </p>
//             </div>

//             <div className={styles.hours}>
//               <h4>Hours</h4>
//               <p>08:00 – 12:00 Uhr</p>
//               <p>13:00 – 17:00 Uhr</p>
//             </div>
//           </div>

//           {/* RIGHT CONTENT */}
//           <div className={styles.rightContent}>
//             <h2>Keep in Touch</h2>

//             <p className={styles.description}>
//               We’d love to be part of your special moments. Whether you’re
//               looking for a handcrafted bouquet, a graceful floral decor, or
//               something unique—feel free to reach out to us. Our team is always
//               happy to assist you with care and creativity.
//             </p>

//             <form className={styles.form}>
//               <div className={styles.row}>
//                 <input placeholder="First Name" />
//                 <input placeholder="Last Name" />
//               </div>

//               <input placeholder="Email" />
//               <input placeholder="Phone Number" />
//               <textarea placeholder="Message" rows="4" />

//               <button>Send Message</button>
//             </form>
//           </div>
//         </div>
//       </section>

//       {/* MAP */}
//       <section className={styles.map}>
//         <iframe
//           src="https://www.google.com/maps?q=Grand%20Central%20Terminal&output=embed"
//           loading="lazy"
//         />
//       </section>
//       <Footer />
//     </>
//   );
// }

"use client";

import React from "react";
import styles from "@/styles/Contact.module.css";
import ScrollToTop from "@/components/ScrollToTop";
import FinalNav from "@/components/FinalNav";
import Footer from "@/components/Footer";
import { Container } from "react-bootstrap";

import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import {
  FaTwitter,
  FaFacebookF,
  FaYoutube,
  FaVimeoV,
  FaInstagram,
} from "react-icons/fa";

export default function ContactPage() {
  return (
    <>
      <ScrollToTop />
      <FinalNav />

      {/* TOP HERO */}
      <section className={styles.topHero}>
        <Container>
          <div className={styles.contents}>
            <h1>Make Your Home as Comfortable as Possible</h1>
            <p>
              Make your home as comfortable as possible with the natural charm
              of fresh flowers.
              <br />
              Add comfort and elegance with beautifully crafted bouquets.
            </p>
          </div>
        </Container>
      </section>

      {/* CONTACT SECTION */}
      <section className={styles.heroSection}>
        <Container>
        <div className={styles.contactHero}>
          {/* LEFT CARD */}
          <div className={styles.card}>
            <h3>CONTACT US</h3>

            <div className={styles.info}>
              <p>
                <FiMail /> info@example.com
              </p>
              <p>
                <FiPhone /> 001985512-854
              </p>
              <p>
                <FiMapPin />
                John Smith 123 Main Street Amsterdam,
                <br /> NH 1000 Netherlands
              </p>
            </div>

            <div className={styles.social}>
              <h4>Social</h4>
              <p>
                <FaTwitter /> @exampleAccount
              </p>
              <p>
                <FaFacebookF /> @exampleAccount
              </p>
              <p>
                <FaYoutube /> @exampleAccount
              </p>
              <p>
                <FaVimeoV /> @exampleAccount
              </p>
              <p>
                <FaInstagram /> @exampleAccount
              </p>
            </div>

            <div className={styles.hours}>
              <h4>Hours</h4>
              <p>08:00 – 12:00 Uhr</p>
              <p>13:00 – 17:00 Uhr</p>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className={styles.rightContent}>
            <h2>Keep in Touch</h2>

            <p className={styles.description}>
              We’d love to be part of your special moments. Whether you’re
              looking for a handcrafted bouquet, a graceful garland, or details
              about our bouquet training classes, Dazzling Sky is just a message
              away. Let flowers speak your emotions—reach out to us for orders,
              custom designs, collaborations, or inquiries. Our team is always
              happy to assist you with care and creativity.
            </p>

            <form className={styles.form}>
              <div className={styles.row}>
                <input placeholder="First Name" />
                <input placeholder="Last Name" />
              </div>

              <input placeholder="Email" />
              <input placeholder="Phone Number" />
              <textarea placeholder="Message" rows="4" />

              <button>Send Message</button>
            </form>
          </div>
        </div>
        </Container>
      </section>

      {/* MAP */}
      <section className={styles.map}>
        <iframe
          src="https://www.google.com/maps?q=Grand%20Central%20Terminal&output=embed"
          loading="lazy"
        />
      </section>

      <Footer />
    </>
  );
}

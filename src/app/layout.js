import Providers from "@/components/Providers";
import { BsWhatsapp } from "react-icons/bs";
import Script from "next/script";

import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

export const metadata = {
  title: "Dazzling Sky - Flower E-Commerce",
  description:
    "Best Place to Shop for Flowers Online. Premium quality flowers and plants delivered to your doorstep.",
  keywords: "flowers, plants, bouquet, online flower shop, flower delivery",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* AOS CSS */}
        <link
          href="https://unpkg.com/aos@2.3.4/dist/aos.css"
          rel="stylesheet"
        />
      </head>

      <body>
        <Providers>
          {children}
        </Providers>

        {/* AOS JS */}
        <Script
          src="https://unpkg.com/aos@2.3.4/dist/aos.js"
          strategy="afterInteractive"
        />

        {/* AOS Init */}
        <Script
          id="aos-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof AOS !== "undefined") {
                AOS.init({ once: true, duration: 800 });
              }
            `,
          }}
        />

        {/* WhatsApp Floating Button */}
        <a
          href="https://wa.me/6588144043?text=Hi%20%0AThank%20you%20for%20contacting%20Dazzling%20Sky%20Flower%20Shop.%0APlease%20share%20your%20requirement%20and%20delivery%20date.%0AWe%E2%80%99ll%20be%20happy%20to%20help%20you.%20"
          target="_blank"
          rel="noopener noreferrer"
          className="wa-float"
        >
          <span className="wa-glow"></span>

          <span className="wa-ring"></span>
          <span className="wa-ring delay1"></span>
          <span className="wa-ring delay2"></span>

          <BsWhatsapp className="wa-icon" />
        </a>
      </body>
    </html>
  );
}

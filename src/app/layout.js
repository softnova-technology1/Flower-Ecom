import { CartProvider } from "@/context/CartContext";
import AuthProvider from "@/components/AuthProvider";
import { ToastContainer } from "react-toastify";
import {BsWhatsapp} from "react-icons/bs"
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
        <link
          href="https://unpkg.com/aos@2.3.4/dist/aos.css"
          rel="stylesheet"
        />
      </head>
      <body>
        <AuthProvider>
          <CartProvider>
            <ToastContainer position="top-center" autoClose={4000} />
            {children}
          </CartProvider>
        </AuthProvider>
        <script src="https://unpkg.com/aos@2.3.4/dist/aos.js"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof AOS !== 'undefined') {
                AOS.init();
              }
            `,
          }}
        />
        <a
          href="https://wa.me/6588144043?text=Hi%20%0AThank%20you%20for%20contacting%20Dazzling%20Sky%20Flower%20Shop.%0APlease%20share%20your%20requirement%20and%20delivery%20date.%0AWe%E2%80%99ll%20be%20happy%20to%20help%20you.%20"
          target="_blank"
          rel="noopener noreferrer"
        className="wa-float">
          {/* <img src="/images/whats.avif" alt="WhatsApp" className="whats" /> */}

          <span class="wa-glow"></span>

          <span class="wa-ring"></span>
          <span class="wa-ring delay1"></span>
          <span class="wa-ring delay2"></span>
          {/* <svg
            class="wa-icon"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="currentColor"
              d="M19.11 17.92c-.27-.14-1.58-.78-1.83-.87-.25-.09-.43-.14-.61.14-.18.27-.7.87-.86 1.05-.16.18-.32.2-.59.07-.27-.14-1.15-.42-2.18-1.34-.8-.71-1.34-1.59-1.5-1.86-.16-.27-.02-.42.12-.56.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.02-.22-.53-.45-.46-.61-.47h-.52c-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.3 0 1.36.99 2.68 1.13 2.86.14.18 1.95 2.98 4.72 4.18.66.28 1.18.45 1.58.57.66.21 1.26.18 1.73.11.53-.08 1.58-.64 1.8-1.26.22-.62.22-1.15.16-1.26-.06-.11-.24-.18-.51-.32zM16 3C8.83 3 3 8.83 3 16c0 2.82.74 5.46 2.03 7.76L3 29l5.41-1.97A12.93 12.93 0 0 0 16 29c7.17 0 13-5.83 13-13S23.17 3 16 3z"
            />
          </svg> */}

          <BsWhatsapp className="wa-icon"/>
        </a>
      </body>
    </html>
  );
}

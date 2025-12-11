import { CartProvider } from "@/context/CartContext";
import AuthProvider from "@/components/AuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

export const metadata = {
  title: "Dazzling Sky - Flower E-Commerce",
  description: "Best Place to Shop for Flowers Online. Premium quality flowers and plants delivered to your doorstep.",
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
      </body>
    </html>
  );
}

"use client";

import { CartProvider } from "@/context/CartContext";
import AuthProvider from "@/components/AuthProvider";
import { ToastContainer } from "react-toastify";

export default function Providers({ children }) {
    return (
        <AuthProvider>
            <CartProvider>
                <ToastContainer position="top-center" autoClose={4000} />
                {children}
            </CartProvider>
        </AuthProvider>
    );
}


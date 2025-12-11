"use client";

import React, { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load cart from localStorage on mount (client-side only)
    useEffect(() => {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart));
            } catch (error) {
                console.error("Error loading cart:", error);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    }, [cart, isLoaded]);

    const addToCart = (product) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.name === product.name);
            if (existing) {
                return prev.map((item) =>
                    item.name === product.name
                        ? { ...item, quantity: item.quantity + product.quantity }
                        : item
                );
            } else {
                return [...prev, product];
            }
        });
    };

    const updateQty = (name, qty) => {
        setCart((prev) =>
            prev.map((item) =>
                item.name === name ? { ...item, quantity: qty } : item
            )
        );
    };

    const removeFromCart = (name) => {
        setCart((prev) => prev.filter((item) => item.name !== name));
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider
            value={{ cart, addToCart, updateQty, removeFromCart, clearCart }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);

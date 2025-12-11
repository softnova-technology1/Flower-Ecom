"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import styles from "@/styles/AdminProductForm.module.css";

export default function NewProductPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        oldPrice: "",
        category: "roses",
        stock: "",
        image: "",
        featured: false,
        bestSelling: false,
        newArrival: false,
    });

    const categories = ["roses", "tulips", "orchids", "lilies", "sunflowers", "mixed"];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch("/api/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    price: parseFloat(formData.price),
                    oldPrice: formData.oldPrice ? parseFloat(formData.oldPrice) : undefined,
                    stock: parseInt(formData.stock),
                }),
            });

            const data = await response.json();

            if (data.success) {
                toast.success("Product created successfully!");
                router.push("/admin/products");
            } else {
                toast.error(data.error || "Failed to create product");
            }
        } catch (error) {
            console.error("Error creating product:", error);
            toast.error("Failed to create product");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Add New Product</h1>

            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGrid}>
                    <div className={styles.inputGroup}>
                        <label>Product Name *</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={styles.input}
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Category *</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className={styles.input}
                            required
                        >
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Price *</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className={styles.input}
                            step="0.01"
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Old Price</label>
                        <input
                            type="number"
                            name="oldPrice"
                            value={formData.oldPrice}
                            onChange={handleChange}
                            className={styles.input}
                            step="0.01"
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Stock *</label>
                        <input
                            type="number"
                            name="stock"
                            value={formData.stock}
                            onChange={handleChange}
                            className={styles.input}
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Image URL *</label>
                        <input
                            type="url"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            className={styles.input}
                            required
                        />
                    </div>
                </div>

                <div className={styles.inputGroup}>
                    <label>Description *</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className={styles.textarea}
                        rows="4"
                        required
                    />
                </div>

                <div className={styles.checkboxGroup}>
                    <label className={styles.checkbox}>
                        <input
                            type="checkbox"
                            name="featured"
                            checked={formData.featured}
                            onChange={handleChange}
                        />
                        <span>Featured Product</span>
                    </label>

                    <label className={styles.checkbox}>
                        <input
                            type="checkbox"
                            name="bestSelling"
                            checked={formData.bestSelling}
                            onChange={handleChange}
                        />
                        <span>Best Selling</span>
                    </label>

                    <label className={styles.checkbox}>
                        <input
                            type="checkbox"
                            name="newArrival"
                            checked={formData.newArrival}
                            onChange={handleChange}
                        />
                        <span>New Arrival</span>
                    </label>
                </div>

                <div className={styles.actions}>
                    <button type="submit" className={styles.submitBtn} disabled={loading}>
                        {loading ? "Creating..." : "Create Product"}
                    </button>
                    <button
                        type="button"
                        onClick={() => router.push("/admin/products")}
                        className={styles.cancelBtn}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

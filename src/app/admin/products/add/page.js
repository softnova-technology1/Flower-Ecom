"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { uploadToCloudinary } from "@/lib/cloudinary";
import styles from "@/styles/AdminProductForm.module.css";

export default function AddProductPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        oldPrice: "",
        category: "Focal Flowers",
        image: "",
        stock: "",
        featured: false,
        bestSelling: false,
        newArrival: false,
    });

    const categories = [
        "Focal Flowers",
        "Filler Flowers",
        "Line Flowers",
        "Greenery",
        "Other",
    ];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file size (5MB max)
        if (file.size > 5 * 1024 * 1024) {
            toast.error("Image size should be less than 5MB");
            return;
        }

        // Show preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);

        // Upload to Cloudinary
        setUploading(true);
        try {
            const result = await uploadToCloudinary(file);
            
            if (result.success) {
                setFormData((prev) => ({ ...prev, image: result.url }));
                toast.success("Image uploaded successfully!");
            } else {
                toast.error(result.error || "Failed to upload image");
                setImagePreview(null);
            }
        } catch (error) {
            console.error("Upload error:", error);
            toast.error("Failed to upload image");
            setImagePreview(null);
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!formData.name.trim()) {
            toast.error("Product name is required");
            return;
        }
        if (!formData.description.trim()) {
            toast.error("Description is required");
            return;
        }
        if (!formData.price || formData.price <= 0) {
            toast.error("Valid price is required");
            return;
        }
        if (!formData.image) {
            toast.error("Product image is required");
            return;
        }
        if (!formData.stock || formData.stock < 0) {
            toast.error("Valid stock quantity is required");
            return;
        }

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
                toast.success("Product added successfully!");
                setTimeout(() => {
                    router.push("/admin/products");
                }, 1500);
            } else {
                toast.error(data.error || "Failed to add product");
            }
        } catch (error) {
            console.error("Error adding product:", error);
            toast.error("Failed to add product");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Add New Product</h1>
                <button onClick={() => router.push("/admin/products")} className={styles.backBtn}>
                    ← Back to Products
                </button>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.grid}>
                    {/* Left Column */}
                    <div className={styles.leftColumn}>
                        <div className={styles.formGroup}>
                            <label>Product Name *</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="e.g., Red Roses Bouquet"
                                className={styles.input}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Description *</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Detailed product description..."
                                className={styles.textarea}
                                rows={5}
                            />
                        </div>

                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label>Price (SGD) *</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    placeholder="50"
                                    step="0.01"
                                    min="0"
                                    className={styles.input}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label>Old Price (SGD)</label>
                                <input
                                    type="number"
                                    name="oldPrice"
                                    value={formData.oldPrice}
                                    onChange={handleChange}
                                    placeholder="70"
                                    step="0.01"
                                    min="0"
                                    className={styles.input}
                                />
                            </div>
                        </div>

                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label>Category *</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className={styles.select}
                                >
                                    {categories.map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className={styles.formGroup}>
                                <label>Stock Quantity *</label>
                                <input
                                    type="number"
                                    name="stock"
                                    value={formData.stock}
                                    onChange={handleChange}
                                    placeholder="50"
                                    min="0"
                                    className={styles.input}
                                />
                            </div>
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
                    </div>

                    {/* Right Column - Image Upload */}
                    <div className={styles.rightColumn}>
                        <div className={styles.formGroup}>
                            <label>Product Image *</label>
                            <div className={styles.imageUpload}>
                                {imagePreview ? (
                                    <div className={styles.imagePreview}>
                                        <img src={imagePreview} alt="Preview" />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setImagePreview(null);
                                                setFormData((prev) => ({ ...prev, image: "" }));
                                            }}
                                            className={styles.removeImageBtn}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ) : (
                                    <label className={styles.uploadLabel}>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className={styles.fileInput}
                                            disabled={uploading}
                                        />
                                        <div className={styles.uploadPlaceholder}>
                                            {uploading ? (
                                                <>
                                                    <div className={styles.spinner} />
                                                    <p>Uploading...</p>
                                                </>
                                            ) : (
                                                <>
                                                    <span className={styles.uploadIcon}>📷</span>
                                                    <p>Click to upload image</p>
                                                    <span className={styles.uploadHint}>
                                                        PNG, JPG up to 5MB
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                    </label>
                                )}
                            </div>
                        </div>

                        <div className={styles.infoBox}>
                            <h3>💡 Tips</h3>
                            <ul>
                                <li>Use high-quality images (min 500x500px)</li>
                                <li>White or light background works best</li>
                                <li>Show the product clearly</li>
                                <li>Compress large images before upload</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className={styles.actions}>
                    <button
                        type="button"
                        onClick={() => router.push("/admin/products")}
                        className={styles.cancelBtn}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading || uploading}
                        className={styles.submitBtn}
                    >
                        {loading ? "Adding Product..." : "Add Product"}
                    </button>
                </div>
            </form>
        </div>
    );
}


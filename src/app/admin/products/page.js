"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import styles from "@/styles/AdminProducts.module.css";

export default function AdminProductsPage() {
    const router = useRouter();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch("/api/products?limit=100");
            const data = await response.json();

            if (data.success) {
                setProducts(data.products);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id, name) => {
        if (!confirm(`Delete "${name}"?`)) return;

        try {
            const response = await fetch(`/api/products/${id}`, {
                method: "DELETE",
            });

            const data = await response.json();

            if (data.success) {
                toast.success("Product deleted!");
                fetchProducts();
            } else {
                toast.error(data.error || "Failed to delete");
            }
        } catch (error) {
            console.error("Error deleting product:", error);
            toast.error("Failed to delete product");
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Products Management</h1>
                <Link href="/admin/products/new" className={styles.addBtn}>
                    + Add Product
                </Link>
            </div>

            {loading ? (
                <div className={styles.loading}>Loading products...</div>
            ) : (
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Featured</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product._id}>
                                    <td>
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className={styles.productImage}
                                        />
                                    </td>
                                    <td>{product.name}</td>
                                    <td>{product.category}</td>
                                    <td>${product.price}</td>
                                    <td>{product.stock}</td>
                                    <td>
                                        {product.featured ? (
                                            <span className={styles.badgeYes}>Yes</span>
                                        ) : (
                                            <span className={styles.badgeNo}>No</span>
                                        )}
                                    </td>
                                    <td>
                                        <div className={styles.actions}>
                                            <button
                                                onClick={() =>
                                                    router.push(`/admin/products/${product._id}`)
                                                }
                                                className={styles.editBtn}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDelete(product._id, product.name)
                                                }
                                                className={styles.deleteBtn}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

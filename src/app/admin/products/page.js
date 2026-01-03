"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import { 
    MdInventory, 
    MdAdd, 
    MdEdit, 
    MdDelete,
    MdImage,
    MdCheckCircle,
    MdCancel
} from "react-icons/md";
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
                <div className={styles.titleGroup}>
                    <MdInventory className={styles.titleIcon} />
                    <h1 className={styles.title}>Products Management</h1>
                </div>
                <Link href="/admin/products/add" className={styles.addBtn}>
                    <MdAdd /> Add Product
                </Link>
            </div>

            <div className={styles.statsBar}>
                <div className={styles.statCard}>
                    <span className={styles.statValue}>{products.length}</span>
                    <span className={styles.statLabel}>Total Products</span>
                </div>
                <div className={styles.statCard}>
                    <span className={styles.statValue}>
                        {products.filter(p => p.stock > 0).length}
                    </span>
                    <span className={styles.statLabel}>In Stock</span>
                </div>
                <div className={styles.statCard}>
                    <span className={styles.statValue}>
                        {products.filter(p => p.featured).length}
                    </span>
                    <span className={styles.statLabel}>Featured</span>
                </div>
            </div>

            {loading ? (
                <div className={styles.loading}>
                    <div className={styles.spinner}></div>
                    <p>Loading products...</p>
                </div>
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
                                        {product.image ? (
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className={styles.productImage}
                                            />
                                        ) : (
                                            <div className={styles.noImage}>
                                                <MdImage />
                                            </div>
                                        )}
                                    </td>
                                    <td className={styles.nameCell}>{product.name}</td>
                                    <td>
                                        <span className={styles.categoryBadge}>{product.category}</span>
                                    </td>
                                    <td className={styles.priceCell}>${product.price}</td>
                                    <td>
                                        <span className={`${styles.stockBadge} ${
                                            product.stock === 0 ? styles.outOfStock : 
                                            product.stock <= 5 ? styles.lowStock : 
                                            styles.inStock
                                        }`}>
                                            {product.stock}
                                        </span>
                                    </td>
                                    <td>
                                        {product.featured ? (
                                            <span className={styles.badgeYes}>
                                                <MdCheckCircle /> Yes
                                            </span>
                                        ) : (
                                            <span className={styles.badgeNo}>
                                                <MdCancel /> No
                                            </span>
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
                                                <MdEdit /> Edit
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDelete(product._id, product.name)
                                                }
                                                className={styles.deleteBtn}
                                            >
                                                <MdDelete /> Delete
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

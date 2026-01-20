"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import {
    MdDescription,
    MdAdd,
    MdEdit,
    MdDelete,
    MdSearch
} from "react-icons/md";
import styles from "@/styles/AdminProducts.module.css"; // Reusing product list styles

export default function AdminBlogsPage() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchBlogs = async () => {
        try {
            const response = await fetch("/api/blogs");
            const data = await response.json();
            if (data.success) {
                setBlogs(data.blogs);
            }
        } catch (error) {
            console.error("Error fetching blogs:", error);
            toast.error("Failed to fetch blogs");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const handleDelete = async (slug) => {
        if (!confirm("Are you sure you want to delete this blog post?")) return;

        try {
            const response = await fetch(`/api/blogs/${slug}`, {
                method: "DELETE",
            });
            const data = await response.json();

            if (data.success) {
                toast.success("Blog post deleted");
                fetchBlogs(); // Refresh list
            } else {
                toast.error(data.error || "Failed to delete blog");
            }
        } catch (error) {
            console.error("Error deleting blog:", error);
            toast.error("Failed to delete blog");
        }
    };

    const filteredBlogs = blogs.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className={styles.loading}>
                <div className={styles.spinner}></div>
                <p>Loading blogs...</p>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.titleGroup}>
                    <MdDescription className={styles.titleIcon} />
                    <h1 className={styles.title}>Blog Posts</h1>
                </div>

                <Link href="/admin/blogs/add" className={styles.addBtn}>
                    <MdAdd size={20} />
                    <span>Add New Post</span>
                </Link>
            </div>

            {/* Search or Filters could go here similar to products, keeping it simple for now */}

            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Author</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBlogs.length === 0 ? (
                            <tr>
                                <td colSpan="6" style={{ textAlign: "center", padding: "30px" }}>
                                    No blog posts found.
                                </td>
                            </tr>
                        ) : (
                            filteredBlogs.map((blog) => (
                                <tr key={blog._id}>
                                    <td>
                                        <img
                                            src={blog.image}
                                            alt={blog.title}
                                            className={styles.productImage}
                                            style={{ objectFit: "cover" }}
                                        />
                                    </td>
                                    <td className={styles.nameCell}>
                                        {blog.title}
                                    </td>
                                    <td>
                                        <span className={styles.categoryBadge}>
                                            {blog.category}
                                        </span>
                                    </td>
                                    <td>{blog.author || "Admin"}</td>
                                    <td>
                                        {new Date(blog.createdAt).toLocaleDateString()}
                                    </td>
                                    <td>
                                        <div className={styles.actions}>
                                            <button
                                                className={styles.deleteBtn}
                                                onClick={() => handleDelete(blog.slug)}
                                                title="Delete"
                                            >
                                                <MdDelete size={16} />
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { uploadToCloudinary } from "@/lib/cloudinary";
import styles from "@/styles/AdminProductForm.module.css";
// import ReactQuill from "react-quill"; // Dynamic import needed
import "react-quill-new/dist/quill.snow.css";
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

export default function AddBlogPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    const [formData, setFormData] = useState({
        title: "",
        content: "",
        excerpt: "",
        category: "Florist Tips",
        tags: "",
        image: "",
        metaTitle: "",
        metaDescription: "",
        keywords: "",
    });

    const categories = [
        "Florist Tips",
        "Flower Care",
        "Design Trends",
        "Events",
        "News",
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleContentChange = (value) => {
        setFormData((prev) => ({ ...prev, content: value }));
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            toast.error("Image size should be less than 5MB");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);

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

        if (!formData.title.trim()) {
            toast.error("Title is required");
            return;
        }
        if (!formData.content.trim()) {
            toast.error("Content is required");
            return;
        }
        if (!formData.image) {
            toast.error("Featured image is required");
            return;
        }

        setLoading(true);

        try {
            const payload = {
                ...formData,
                tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
                keywords: formData.keywords.split(',').map(k => k.trim()).filter(Boolean),
            };

            const response = await fetch("/api/blogs", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (data.success) {
                toast.success("Blog post added successfully!");
                setTimeout(() => {
                    router.push("/admin/blogs"); // We should probably create this listing page too, but user asked for "Add" logic mostly.
                }, 1500);
            } else {
                toast.error(data.error || "Failed to add blog post");
            }
        } catch (error) {
            console.error("Error adding blog:", error);
            toast.error("Failed to add blog post");
        } finally {
            setLoading(false);
        }
    };

    const modules = useMemo(() => ({
        toolbar: [
            [{ 'header': [1, 2, 3, 4, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image'],
            ['clean']
        ],
    }), []);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Add New Blog Post</h1>
                <button onClick={() => router.back()} className={styles.backBtn}>
                    ← Back
                </button>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.grid}>
                    {/* Left Column */}
                    <div className={styles.leftColumn}>
                        <div className={styles.formGroup}>
                            <label>Title *</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Enter blog title"
                                className={styles.input}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Content *</label>
                            <div style={{ background: 'white' }}> {/* Wrapper for Quill */}
                                <ReactQuill
                                    theme="snow"
                                    value={formData.content}
                                    onChange={handleContentChange}
                                    modules={modules}
                                    style={{ height: '300px', marginBottom: '50px' }}
                                />
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label>Excerpt (Short Description)</label>
                            <textarea
                                name="excerpt"
                                value={formData.excerpt}
                                onChange={handleChange}
                                placeholder="Short summary for preview cards..."
                                className={styles.textarea}
                                rows={3}
                            />
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
                                <label>Tags (comma separated)</label>
                                <input
                                    type="text"
                                    name="tags"
                                    value={formData.tags}
                                    onChange={handleChange}
                                    placeholder="e.g. flowers, care, summer"
                                    className={styles.input}
                                />
                            </div>
                        </div>

                        <hr style={{ margin: '20px 0', borderTop: '1px solid #eee' }} />
                        <h3>SEO Settings</h3>

                        <div className={styles.formGroup}>
                            <label>Meta Title</label>
                            <input
                                type="text"
                                name="metaTitle"
                                value={formData.metaTitle}
                                onChange={handleChange}
                                placeholder="SEO Title"
                                className={styles.input}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Meta Description</label>
                            <textarea
                                name="metaDescription"
                                value={formData.metaDescription}
                                onChange={handleChange}
                                placeholder="SEO Description..."
                                className={styles.textarea}
                                rows={2}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Keywords (comma separated)</label>
                            <input
                                type="text"
                                name="keywords"
                                value={formData.keywords}
                                onChange={handleChange}
                                placeholder="e.g. best florist, singapore flowers"
                                className={styles.input}
                            />
                        </div>

                    </div>

                    {/* Right Column - Image Upload */}
                    <div className={styles.rightColumn}>
                        <div className={styles.formGroup}>
                            <label>Featured Image *</label>
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
                                                    <p>Click to upload cover image</p>
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
                            <h3>💡 Blog Tips</h3>
                            <ul>
                                <li>Use catchy titles</li>
                                <li>Write high-quality content</li>
                                <li>Use relevant tags for search</li>
                                <li>Optimize meta title and description for Google</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className={styles.actions}>
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className={styles.cancelBtn}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading || uploading}
                        className={styles.submitBtn}
                    >
                        {loading ? "Publishing..." : "Publish Post"}
                    </button>
                </div>
            </form>
        </div>
    );
}

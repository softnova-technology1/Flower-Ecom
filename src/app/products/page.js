"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { productsAPI } from "@/lib/api";
import Navbar from "@/components/Navbar";
import Service from "@/components/Service";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import PageWrapper from "@/components/PageWrapper";
import styles from "@/styles/Productmain.module.css";

export default function ProductsPage() {
    const router = useRouter();
    const [offsetY, setOffsetY] = useState(0);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    const categories = ["all", "roses", "tulips", "orchids", "sunflowers", "mixed"];
    const productsPerPage = 12;

    const handleScroll = () => {
        setOffsetY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [currentPage, selectedCategory, searchQuery]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const params = {
                page: currentPage,
                limit: productsPerPage,
            };

            if (selectedCategory !== "all") {
                params.category = selectedCategory;
            }

            if (searchQuery) {
                params.search = searchQuery;
            }

            const data = await productsAPI.getAll(params);
            setProducts(data.products || []);
            setTotalPages(data.totalPages || 1);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setCurrentPage(1);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setCurrentPage(1);
        fetchProducts();
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 400, behavior: "smooth" });
    };

    return (
        <>
            <ScrollToTop />
            <Navbar />
            <PageWrapper>
                <div className={styles.main}>
                    <div className={styles.main1}>
                        <h1>Product Archive</h1>
                    </div>

                    <div className={styles.main2}>
                        <img
                            src="/images/flr1.jpg"
                            alt=""
                            className={styles.pImage}
                            style={{ transform: `translateY(${offsetY * -0.25}px)` }}
                        />

                        <img
                            src="/images/flr2.jpg"
                            alt=""
                            className={`${styles.pImage} ${styles.centerImg}`}
                            style={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: `translate(-50%, -50%) translateY(${offsetY * 0.35}px)`,
                                zIndex: 1,
                            }}
                        />

                        <img
                            src="/images/flr3.jpg"
                            alt=""
                            className={styles.pImage}
                            style={{ transform: ` translateY(${offsetY * -0.2}px) ` }}
                        />
                    </div>
                </div>

                {/* Filters Section */}
                <div style={{ padding: "40px 20px", maxWidth: "1200px", margin: "0 auto" }}>
                    {/* Search Bar */}
                    <form onSubmit={handleSearch} style={{ marginBottom: "30px", textAlign: "center" }}>
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                padding: "12px 20px",
                                width: "100%",
                                maxWidth: "500px",
                                border: "2px solid #ddd",
                                borderRadius: "8px",
                                fontSize: "16px",
                            }}
                        />
                        <button
                            type="submit"
                            style={{
                                marginLeft: "10px",
                                padding: "12px 30px",
                                background: "#c78a3a",
                                color: "white",
                                border: "none",
                                borderRadius: "8px",
                                cursor: "pointer",
                                fontSize: "16px",
                            }}
                        >
                            Search
                        </button>
                    </form>

                    {/* Category Filter */}
                    <div style={{ marginBottom: "30px", textAlign: "center" }}>
                        <h3 style={{ marginBottom: "15px", color: "#333" }}>Filter by Category</h3>
                        <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => handleCategoryChange(cat)}
                                    style={{
                                        padding: "10px 20px",
                                        background: selectedCategory === cat ? "#c78a3a" : "#f5f5f5",
                                        color: selectedCategory === cat ? "white" : "#333",
                                        border: "none",
                                        borderRadius: "6px",
                                        cursor: "pointer",
                                        textTransform: "capitalize",
                                        fontSize: "14px",
                                        transition: "all 0.3s",
                                    }}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Products Grid */}
                    {loading ? (
                        <div style={{ textAlign: "center", padding: "60px 20px" }}>
                            <h3>Loading products...</h3>
                        </div>
                    ) : products.length === 0 ? (
                        <div style={{ textAlign: "center", padding: "60px 20px" }}>
                            <h3>No products found</h3>
                            <p>Try adjusting your filters or search query</p>
                        </div>
                    ) : (
                        <>
                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                                    gap: "30px",
                                    marginBottom: "40px",
                                }}
                            >
                                {products.map((product) => (
                                    <div
                                        key={product._id}
                                        onClick={() => router.push(`/product/${product._id}`)}
                                        style={{
                                            border: "1px solid #eee",
                                            borderRadius: "12px",
                                            padding: "20px",
                                            cursor: "pointer",
                                            transition: "all 0.3s",
                                            background: "white",
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = "translateY(-5px)";
                                            e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.1)";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = "translateY(0)";
                                            e.currentTarget.style.boxShadow = "none";
                                        }}
                                    >
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            style={{
                                                width: "100%",
                                                height: "200px",
                                                objectFit: "cover",
                                                borderRadius: "8px",
                                                marginBottom: "15px",
                                            }}
                                        />
                                        <h3 style={{ fontSize: "18px", marginBottom: "10px", color: "#333" }}>
                                            {product.name}
                                        </h3>
                                        <p style={{ fontSize: "14px", color: "#666", marginBottom: "10px" }}>
                                            {product.category}
                                        </p>
                                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                            {product.oldPrice && (
                                                <span
                                                    style={{
                                                        textDecoration: "line-through",
                                                        color: "#999",
                                                        fontSize: "14px",
                                                    }}
                                                >
                                                    ${product.oldPrice}
                                                </span>
                                            )}
                                            <span style={{ fontSize: "20px", fontWeight: "bold", color: "#c78a3a" }}>
                                                ${product.price}
                                            </span>
                                        </div>
                                        {product.stock === 0 && (
                                            <p style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
                                                Out of Stock
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "40px" }}>
                                    <button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        style={{
                                            padding: "10px 20px",
                                            background: currentPage === 1 ? "#ddd" : "#c78a3a",
                                            color: currentPage === 1 ? "#999" : "white",
                                            border: "none",
                                            borderRadius: "6px",
                                            cursor: currentPage === 1 ? "not-allowed" : "pointer",
                                        }}
                                    >
                                        Previous
                                    </button>

                                    {[...Array(totalPages)].map((_, i) => (
                                        <button
                                            key={i + 1}
                                            onClick={() => handlePageChange(i + 1)}
                                            style={{
                                                padding: "10px 15px",
                                                background: currentPage === i + 1 ? "#c78a3a" : "#f5f5f5",
                                                color: currentPage === i + 1 ? "white" : "#333",
                                                border: "none",
                                                borderRadius: "6px",
                                                cursor: "pointer",
                                                minWidth: "40px",
                                            }}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}

                                    <button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        style={{
                                            padding: "10px 20px",
                                            background: currentPage === totalPages ? "#ddd" : "#c78a3a",
                                            color: currentPage === totalPages ? "#999" : "white",
                                            border: "none",
                                            borderRadius: "6px",
                                            cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                                        }}
                                    >
                                        Next
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>

                <Service />
                <Footer />
            </PageWrapper>
        </>
    );
}

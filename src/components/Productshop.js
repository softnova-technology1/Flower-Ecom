"use client";

import { useState, useEffect } from "react";
import styles from "@/styles/Productshop.module.css";
import { Container } from "react-bootstrap";
import { FaAngleRight, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import { toast } from "react-toastify";

const ITEMS_PER_PAGE = 9;

export default function CatalogPage() {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/products?page=${page}&limit=${ITEMS_PER_PAGE}`);
        const data = await response.json();
        
        if (data.success) {
          setProducts(data.products);
          setTotalPages(data.pagination.pages);
        } else {
          toast.error("Failed to load products");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  if (loading) {
    return (
      <div className={styles.Cat}>
        <Container>
          <div className={styles.catalogPage}>
            <nav className={styles.catalogNav}>
              <Link href="/">Home</Link> <FaAngleRight /> <span>Catalog</span>
            </nav>
            <h1 className={styles.catalogTitle}>Catalog</h1>
            <div style={{ textAlign: "center", padding: "60px 20px" }}>
              <h3>Loading products...</h3>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className={styles.Cat}>
      <Container>
        <div className={styles.catalogPage}>
          <nav className={styles.catalogNav}>
            <Link href="/">Home</Link> <FaAngleRight /> <span>Catalog</span>
          </nav>

          <h1 className={styles.catalogTitle}>Catalog</h1>

          {products.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 20px" }}>
              <h3>No products found</h3>
              <p>Check back later for new products!</p>
            </div>
          ) : (
            <div className={styles.catalogGrid}>
              {products.map((product, index) => {
                const isBig =
                  (page % 2 === 1 && index === 4) ||
                  (page % 2 === 0 && index === 3);

                return (
                  <Link
                    href={`/product/${product._id}`}
                    key={product._id}
                    className={`${styles.catalogCard} ${
                      isBig
                        ? page % 2 === 0
                          ? styles.bigCardLeft
                          : styles.bigCardRight
                        : ""
                    }`}
                  >
                    <div className={styles.imageParent}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className={styles.catalogImage}
                      />
                      {product.stock === 0 && (
                        <div style={{
                          position: "absolute",
                          top: "10px",
                          right: "10px",
                          background: "#dc3545",
                          color: "white",
                          padding: "5px 10px",
                          borderRadius: "4px",
                          fontSize: "12px",
                          fontWeight: "bold"
                        }}>
                          OUT OF STOCK
                        </div>
                      )}
                      {product.stock > 0 && product.stock < 5 && (
                        <div style={{
                          position: "absolute",
                          top: "10px",
                          right: "10px",
                          background: "#ff9800",
                          color: "white",
                          padding: "5px 10px",
                          borderRadius: "4px",
                          fontSize: "12px",
                          fontWeight: "bold"
                        }}>
                          LOW STOCK
                        </div>
                      )}
                      {product.featured && (
                        <div style={{
                          position: "absolute",
                          top: "10px",
                          left: "10px",
                          background: "#c78a3a",
                          color: "white",
                          padding: "5px 10px",
                          borderRadius: "4px",
                          fontSize: "12px",
                          fontWeight: "bold"
                        }}>
                          ⭐ FEATURED
                        </div>
                      )}
                    </div>

                    <div className={styles.catalogFooter}>
                      <span>{product.name}</span>
                      <span className={styles.catafoot}>
                        {product.oldPrice && (
                          <span style={{ 
                            textDecoration: "line-through", 
                            marginRight: "8px", 
                            color: "#999",
                            fontSize: "14px"
                          }}>
                            ${product.oldPrice}
                          </span>
                        )}
                        ${product.price} SGD
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          <div className={styles.catalogPagination}>
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className={styles.pageArrow}
            >
              <FaArrowLeft />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
              <button
                key={num}
                onClick={() => setPage(num)}
                className={`${styles.pageNumber} ${
                  page === num ? styles.activePage : ""
                }`}
              >
                {num}
              </button>
            ))}

            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className={styles.pageArrow}
            >
              <FaArrowRight />
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
}

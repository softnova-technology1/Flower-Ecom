"use client";

import { useState, useMemo, useEffect } from "react";
import PRODUCTS from "@/data/product.json";
import styles from "@/styles/Productshop.module.css";
import { Container } from "react-bootstrap";
import { FaAngleRight, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Link from "next/link";

const ITEMS_PER_PAGE = 9;

export default function CatalogPage() {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(PRODUCTS.length / ITEMS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return PRODUCTS.slice(start, start + ITEMS_PER_PAGE);
  }, [page]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  return (
    <div className={styles.Cat}>
      <Container>
        <div className={styles.catalogPage}>
          <nav className={styles.catalogNav}>
            <Link href="/">Home</Link> <FaAngleRight /> <span>Catalog</span>
          </nav>

          <h1 className={styles.catalogTitle}>Catalog</h1>

          <div className={styles.catalogGrid}>
            {paginatedProducts.map((product, index) => {
              const isBig =
                (page % 2 === 1 && index === 4) ||
                (page % 2 === 0 && index === 3);

              return (
                <Link
                  href={`/product/${product.id}`}
                  key={product.id}
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
                      alt={product.title}
                      className={styles.catalogImage}
                    />
                  </div>

                  <div className={styles.catalogFooter}>
                    <span>{product.title}</span>
                    <span className={styles.catafoot}>{product.price} SGD</span>
                  </div>
                </Link>
              );
            })}
          </div>

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

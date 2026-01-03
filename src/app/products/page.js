"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { productsAPI } from "@/lib/api";
import Service from "@/components/Service";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import styles from "@/styles/Productmain.module.css";
import { Container } from "react-bootstrap";
import CatalogPage from "@/components/Productshop";
import FinalNav from "@/components/FinalNav";

export default function ProductsPage() {
  const router = useRouter();
  const [offsetY, setOffsetY] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "all",
    "roses",
    "tulips",
    "orchids",
    "sunflowers",
    "mixed",
  ];
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
      <FinalNav />
      <section>
        <div className={styles.hero}>
          <Container>
            <div className={styles.contents}>
              <h1>Make Your Home as Comfortable as Possible</h1>
              <p>
                Make your home as comfortable as possible with the natural charm
                of fresh flowers.
                <br />
                Add comfort and elegance to your home with beautifully crafted
                fresh flower bouquets
              </p>
            </div>
          </Container>
        </div>
      </section>

    
      <CatalogPage />
      <Service />
      <Footer />
    </>
  );
}

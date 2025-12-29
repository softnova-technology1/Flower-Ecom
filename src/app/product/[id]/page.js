// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { useCart } from "@/context/CartContext";
// import { productsAPI } from "@/lib/api";
// import { toast } from "react-toastify";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import ScrollToTop from "@/components/ScrollToTop";
// import styles from "@/styles/ProductDetails.module.css";

// export default function ProductDetailsPage() {
//   const [buttonState, setButtonState] = useState({});
//   const [rating, setRating] = useState(0);
//   const [hover, setHover] = useState(null);
//   const [qty, setQty] = useState(1);
//   const [offsetY, setOffsetY] = useState(0);
//   const [product, setProduct] = useState(null);
//   const [relatedProducts, setRelatedProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const imageRef = useRef(null);
//   const router = useRouter();
//   const { addToCart } = useCart();
//   const params = useParams();

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const data = await productsAPI.getById(params.id);
//         if (data.success) {
//           setProduct(data.product);

//           // Fetch related products (same category)
//           const relatedData = await productsAPI.getByCategory(
//             data.product.category
//           );
//           setRelatedProducts(
//             relatedData.products
//               ?.filter((p) => p._id !== params.id)
//               .slice(0, 4) || []
//           );
//         }
//       } catch (error) {
//         console.error("Error fetching product:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (params.id) {
//       fetchProduct();
//     }
//   }, [params.id]);

//   useEffect(() => {
//     const handleScroll = () => setOffsetY(window.scrollY);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   if (loading) {
//     return (
//       <>
//         <Navbar />
//         <div style={{ textAlign: "center", padding: "100px 20px" }}>
//           <h2>Loading product...</h2>
//         </div>
//         <Footer />
//       </>
//     );
//   }

//   if (!product) {
//     return (
//       <>
//         <Navbar />
//         <div style={{ textAlign: "center", padding: "100px 20px" }}>
//           <h2>Product Not Found</h2>
//           <button
//             onClick={() => router.push("/products")}
//             style={{
//               marginTop: "20px",
//               padding: "12px 30px",
//               background: "#c78a3a",
//               color: "white",
//               border: "none",
//               borderRadius: "6px",
//               cursor: "pointer",
//             }}
//           >
//             Back to Products
//           </button>
//         </div>
//         <Footer />
//       </>
//     );
//   }

//   const handleAddMainProduct = () => {
//     addToCart({
//       _id: product._id,
//       name: product.name,
//       price: Number(product.price),
//       quantity: Number(qty),
//       image: product.image,
//     });

//     toast.success("Your product is added to the basket!", {
//       position: "top-center",
//       autoClose: 2000,
//     });

//     setTimeout(() => {
//       router.push("/cart");
//     }, 2500);
//   };

//   const handleMove = (e) => {
//     const img = imageRef.current;
//     if (!img) return;
//     const rect = img.getBoundingClientRect();
//     const x = (e.clientX - rect.left - rect.width / 2) * 0.03;
//     const y = (e.clientY - rect.top - rect.height / 2) * 0.03;
//     img.style.transform = `translate(${x}px, ${y}px) scale(1.1)`;
//   };

//   const handleLeave = () => {
//     if (imageRef.current) {
//       imageRef.current.style.transform = "translate(0,0) scale(1)";
//     }
//   };

//   const handleAddRelated = (item) => {
//     setButtonState((prev) => ({ ...prev, [item._id]: "loading" }));

//     setTimeout(() => {
//       addToCart({
//         _id: item._id,
//         name: item.name,
//         price: Number(item.price),
//         quantity: 1,
//         image: item.image,
//       });

//       setButtonState((prev) => ({ ...prev, [item._id]: "added" }));

//       toast.success(`${item.name} added to basket!`, {
//         position: "top-center",
//         autoClose: 1200,
//       });
//     }, 800);
//   };

//   return (
//     <>
//       <ScrollToTop />
//       <Navbar />

//       <div className={styles.page}>
//         <div
//           className={styles.leftBox}
//           onMouseMove={handleMove}
//           onMouseLeave={handleLeave}
//         >
//           <img
//             ref={imageRef}
//             src={product.image}
//             alt={product.name}
//             className={styles.mainImage}
//           />
//         </div>

//         <div className={styles.rightBox}>
//           <p className={styles.breadcrumb}>
//             Home / {product.category} / <span>{product.name}</span>
//           </p>

//           <h1 className={styles.title}>{product.name}</h1>

//           <p className={styles.price}>
//             {product.oldPrice && (
//               <span className={styles.oldPrice}>
//                 ${Number(product.oldPrice).toFixed(2)}
//               </span>
//             )}
//             <span className={styles.newPrice}>
//               ${Number(product.price).toFixed(2)}
//             </span>
//           </p>

//           <div className={styles.line}></div>

//           <div className={styles.actionRow}>
//             <input
//               className={styles.act}
//               type="number"
//               min="1"
//               max={product.stock}
//               value={qty}
//               onChange={(e) =>
//                 setQty(
//                   Math.max(1, Math.min(product.stock, Number(e.target.value)))
//                 )
//               }
//             />
//             <button
//               className={styles.addBtn}
//               onClick={handleAddMainProduct}
//               disabled={product.stock === 0}
//             >
//               {product.stock === 0 ? "Out of Stock" : "Add to cart"}
//             </button>
//           </div>

//           <p className={styles.description}>
//             {product.description ||
//               "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus luctus nec ullamcorper mattis, pulvinar dapibus leo."}
//           </p>

//           <div style={{ marginTop: "20px", fontSize: "14px", color: "#666" }}>
//             <p>
//               <strong>Stock:</strong> {product.stock} available
//             </p>
//             <p>
//               <strong>Category:</strong> {product.category}
//             </p>
//             {product.rating > 0 && (
//               <p>
//                 <strong>Rating:</strong> {product.rating.toFixed(1)} ⭐ (
//                 {product.numReviews} reviews)
//               </p>
//             )}
//           </div>
//         </div>
//       </div>

//       <div className={styles.reviewBox}>
//         <div className={styles.reviewTabContainer}>
//           <div className={styles.reviewTab}>
//             Reviews ({product.numReviews || 0})
//           </div>
//         </div>

//         <h2>Reviews</h2>
//         <p>There are no reviews yet.</p>

//         <label className={styles.label}>Your rating *</label>

//         <div className={styles.stars}>
//           {[...Array(5)].map((_, i) => {
//             const index = i + 1;
//             return (
//               <span
//                 key={index}
//                 className={
//                   index <= (hover || rating) ? styles.starActive : styles.star
//                 }
//                 onClick={() => setRating(index)}
//                 onMouseEnter={() => setHover(index)}
//                 onMouseLeave={() => setHover(null)}
//               >
//                 ★
//               </span>
//             );
//           })}
//         </div>

//         <label className={styles.label}>Your review *</label>
//         <textarea className={styles.textarea}></textarea>

//         <label className={styles.label}>Name *</label>
//         <input type="text" className={styles.input} />

//         <label className={styles.label}>Email *</label>
//         <input type="email" className={styles.input} />

//         <button className={styles.submitBtn}>Submit</button>
//       </div>

//       <div className={styles.scontainer}>
//         <h2 className={styles.stitle}>Related products</h2>

//         <div className={styles.sproductGrid}>
//           {relatedProducts.map((item) => (
//             <div className={styles.scard} key={item._id}>
//               <img src={item.image} alt={item.name} className={styles.simage} />

//               <h3 className={styles.sname}>{item.name}</h3>
//               <p className={styles.sprice}>${item.price}</p>

//               <div className={styles.btnContainer}>
//                 <button
//                   className={`${styles.cartBtn} ${
//                     buttonState[item._id] === "added" ? styles.success : ""
//                   }`}
//                   onClick={() => handleAddRelated(item)}
//                   disabled={buttonState[item._id] === "loading"}
//                 >
//                   {!buttonState[item._id] && "Add to cart"}
//                   {buttonState[item._id] === "loading" && (
//                     <>
//                       Adding... <span className={styles.spinner}></span>
//                     </>
//                   )}
//                   {buttonState[item._id] === "added" && "Added ✓"}
//                 </button>

//                 {buttonState[item._id] === "added" && (
//                   <p
//                     className={styles.viewCart}
//                     onClick={() => {
//                       toast.success("Redirecting to cart...", {
//                         position: "top-center",
//                         autoClose: 1500,
//                       });

//                       setTimeout(() => {
//                         router.push("/cart");
//                       }, 2000);
//                     }}
//                   >
//                     View cart
//                   </p>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <Footer />
//     </>
//   );
// }

"use client";

import { useParams, useRouter } from "next/navigation";
import PRODUCTS from "@/data/product.json";
import styles from "@/styles/ProductDetails.module.css";
import { useState } from "react";
import Link from "next/link";
import { addToCart } from "@/utils/cart";
import Footer from "@/components/Footer";
import FinalNav from "@/components/FinalNav";

export default function ProductDetails() {
  const { id } = useParams();
  const router = useRouter();
  const product = PRODUCTS.find((p) => p.id.toString() === id);
  const [qty, setQty] = useState(1);

  if (!product) {
    return <p style={{ padding: "40px" }}>Product not found</p>;
  }

  const handleAddToBag = () => {
    addToCart(product, qty);
    router.push("/basket");
  };

  return (
    <>
      <FinalNav />

      <div className={styles.productPage}>
        <p className={styles.breadcrumb}>
          <Link href="/">Home</Link> / <Link href="/catalog">Catalog</Link> /{" "}
          <span>{product.title}</span>
        </p>

        <div className={styles.productGrid}>
          <div className={styles.imageBox}>
            <img src={product.image} alt={product.title} />
          </div>

          <div className={styles.details}>
            <h1>{product.title}</h1>
            <p className={styles.price}>{product.price} SGD</p>

            <h4>Description</h4>
            <p>{product.description}</p>

            <h4>Composition Of The Bouquet</h4>
            <p>{product.composition}</p>

            <h4>Delivery</h4>
            <p>{product.delivery}</p>

            <h4>Quantity</h4>
            <div className={styles.qtyRow}>
              <button
                className={styles.qtyRow1}
                onClick={() => qty > 1 && setQty(qty - 1)}
              >
                -
              </button>

              <span>{qty}</span>

              <button
                className={styles.qtyRow1}
                onClick={() => setQty(qty + 1)}
              >
                +
              </button>
              <div className={styles.btnWrap}>
                {" "}
                <button className={styles.seeMore}>See More</button>{" "}
              </div>
              <div className={styles.btnWrap}>
                <button className={styles.addToBag} onClick={handleAddToBag}>
                  Add to Bag
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

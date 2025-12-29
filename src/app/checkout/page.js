// "use client";

// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useCart } from "@/context/CartContext";
// import { ordersAPI } from "@/lib/api";
// import { toast } from "react-toastify";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import ScrollToTop from "@/components/ScrollToTop";
// import PageWrapper from "@/components/PageWrapper";
// import styles from "@/styles/Checkout.module.css";

// export default function CheckoutPage() {
//     const router = useRouter();
//     const { cart, clearCart } = useCart();
//     const [loading, setLoading] = useState(false);

//     const [formData, setFormData] = useState({
//         firstName: "",
//         lastName: "",
//         email: "",
//         phone: "",
//         street: "",
//         apartment: "",
//         city: "",
//         state: "",
//         zipCode: "",
//         country: "India",
//     });

//     const [errors, setErrors] = useState({});

//     const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
//     const tax = total * 0.1; // 10% tax
//     const shipping = total > 100 ? 0 : 10; // Free shipping over $100
//     const grandTotal = total + tax + shipping;

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({ ...prev, [name]: value }));
//         // Clear error when user types
//         if (errors[name]) {
//             setErrors((prev) => ({ ...prev, [name]: "" }));
//         }
//     };

//     const validateForm = () => {
//         const newErrors = {};

//         if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
//         if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
//         if (!formData.email.trim()) {
//             newErrors.email = "Email is required";
//         } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//             newErrors.email = "Email is invalid";
//         }
//         if (!formData.phone.trim()) newErrors.phone = "Phone is required";
//         if (!formData.street.trim()) newErrors.street = "Street address is required";
//         if (!formData.city.trim()) newErrors.city = "City is required";
//         if (!formData.state.trim()) newErrors.state = "State is required";
//         if (!formData.zipCode.trim()) newErrors.zipCode = "Zip code is required";

//         return newErrors;
//     };

//     const handleOrder = async (e) => {
//         e.preventDefault();

//         // Validate form
//         const validationErrors = validateForm();
//         if (Object.keys(validationErrors).length > 0) {
//             setErrors(validationErrors);
//             toast.error("Please fill all required fields", {
//                 position: "top-center",
//             });
//             return;
//         }

//         // Check if cart is empty
//         if (cart.length === 0) {
//             toast.error("Your cart is empty!", {
//                 position: "top-center",
//             });
//             return;
//         }

//         setLoading(true);

//         try {
//             // Prepare order data
//             const orderData = {
//                 guestEmail: formData.email, // Store guest email
//                 items: cart.map((item) => ({
//                     product: item._id || item.id || null,
//                     name: item.name,
//                     quantity: item.quantity,
//                     price: item.price,
//                     image: item.image,
//                 })),
//                 shippingAddress: {
//                     name: `${formData.firstName} ${formData.lastName}`,
//                     street: formData.street,
//                     city: formData.city,
//                     state: formData.state,
//                     zipCode: formData.zipCode,
//                     country: formData.country,
//                     phone: formData.phone,
//                 },
//                 billingAddress: {
//                     name: `${formData.firstName} ${formData.lastName}`,
//                     street: formData.street,
//                     city: formData.city,
//                     state: formData.state,
//                     zipCode: formData.zipCode,
//                     country: formData.country,
//                 },
//                 paymentMethod: "cash",
//             };

//             // Create order via API
//             const response = await ordersAPI.create(orderData);

//             if (response.success) {
//                 // Clear cart
//                 clearCart();

//                 // Show success message
//                 toast.success("Order placed successfully!", {
//                     position: "top-center",
//                     autoClose: 2000,
//                 });

//                 // Redirect to success page with order ID
//                 setTimeout(() => {
//                     router.push(`/order-success?orderId=${response.orderId}`);
//                 }, 2000);
//             }
//         } catch (error) {
//             console.error("Order error:", error);
//             toast.error(error.message || "Failed to place order. Please try again.", {
//                 position: "top-center",
//             });
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <>
//             <ScrollToTop />
//             <Navbar />
//             <PageWrapper>
//                 <div className={styles.checkoutPage}>
//                     <div className={styles.wrapper}>
//                         <form onSubmit={handleOrder}>
//                             <div className={styles.billingBox}>
//                                 <h2>Billing Details</h2>

//                                 <div className={styles.formGrid}>
//                                     <div>
//                                         <input
//                                             name="firstName"
//                                             placeholder="First Name *"
//                                             value={formData.firstName}
//                                             onChange={handleChange}
//                                             className={errors.firstName ? styles.error : ""}
//                                         />
//                                         {errors.firstName && (
//                                             <span className={styles.errorText}>{errors.firstName}</span>
//                                         )}
//                                     </div>

//                                     <div>
//                                         <input
//                                             name="lastName"
//                                             placeholder="Last Name *"
//                                             value={formData.lastName}
//                                             onChange={handleChange}
//                                             className={errors.lastName ? styles.error : ""}
//                                         />
//                                         {errors.lastName && (
//                                             <span className={styles.errorText}>{errors.lastName}</span>
//                                         )}
//                                     </div>

//                                     <div>
//                                         <input
//                                             name="email"
//                                             type="email"
//                                             placeholder="Email Address *"
//                                             value={formData.email}
//                                             onChange={handleChange}
//                                             className={errors.email ? styles.error : ""}
//                                         />
//                                         {errors.email && (
//                                             <span className={styles.errorText}>{errors.email}</span>
//                                         )}
//                                     </div>

//                                     <div>
//                                         <input
//                                             name="phone"
//                                             placeholder="Phone *"
//                                             value={formData.phone}
//                                             onChange={handleChange}
//                                             className={errors.phone ? styles.error : ""}
//                                         />
//                                         {errors.phone && (
//                                             <span className={styles.errorText}>{errors.phone}</span>
//                                         )}
//                                     </div>

//                                     <div style={{ gridColumn: "1 / -1" }}>
//                                         <input
//                                             name="street"
//                                             placeholder="Street Address *"
//                                             value={formData.street}
//                                             onChange={handleChange}
//                                             className={errors.street ? styles.error : ""}
//                                         />
//                                         {errors.street && (
//                                             <span className={styles.errorText}>{errors.street}</span>
//                                         )}
//                                     </div>

//                                     <div style={{ gridColumn: "1 / -1" }}>
//                                         <input
//                                             name="apartment"
//                                             placeholder="Apartment, suite, unit (optional)"
//                                             value={formData.apartment}
//                                             onChange={handleChange}
//                                         />
//                                     </div>

//                                     <div>
//                                         <input
//                                             name="city"
//                                             placeholder="Town / City *"
//                                             value={formData.city}
//                                             onChange={handleChange}
//                                             className={errors.city ? styles.error : ""}
//                                         />
//                                         {errors.city && (
//                                             <span className={styles.errorText}>{errors.city}</span>
//                                         )}
//                                     </div>

//                                     <div>
//                                         <input
//                                             name="state"
//                                             placeholder="State *"
//                                             value={formData.state}
//                                             onChange={handleChange}
//                                             className={errors.state ? styles.error : ""}
//                                         />
//                                         {errors.state && (
//                                             <span className={styles.errorText}>{errors.state}</span>
//                                         )}
//                                     </div>

//                                     <div>
//                                         <input
//                                             name="zipCode"
//                                             placeholder="Postcode / ZIP *"
//                                             value={formData.zipCode}
//                                             onChange={handleChange}
//                                             className={errors.zipCode ? styles.error : ""}
//                                         />
//                                         {errors.zipCode && (
//                                             <span className={styles.errorText}>{errors.zipCode}</span>
//                                         )}
//                                     </div>

//                                     <div>
//                                         <select
//                                             name="country"
//                                             value={formData.country}
//                                             onChange={handleChange}
//                                         >
//                                             <option value="India">India</option>
//                                             <option value="USA">USA</option>
//                                             <option value="UK">UK</option>
//                                             <option value="Canada">Canada</option>
//                                         </select>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className={styles.orderBox}>
//                                 <h2>Your Order</h2>

//                                 <table className={styles.orderTable}>
//                                     <thead>
//                                         <tr>
//                                             <th>Product</th>
//                                             <th>Subtotal</th>
//                                         </tr>
//                                     </thead>

//                                     <tbody>
//                                         {cart.map((item, index) => (
//                                             <tr key={index}>
//                                                 <td>
//                                                     {item.name} × {item.quantity}
//                                                 </td>
//                                                 <td>${(item.price * item.quantity).toFixed(2)}</td>
//                                             </tr>
//                                         ))}
//                                     </tbody>
//                                 </table>

//                                 <div className={styles.priceBreakdown}>
//                                     <div className={styles.priceRow}>
//                                         <span>Subtotal</span>
//                                         <span>${total.toFixed(2)}</span>
//                                     </div>
//                                     <div className={styles.priceRow}>
//                                         <span>Tax (10%)</span>
//                                         <span>${tax.toFixed(2)}</span>
//                                     </div>
//                                     <div className={styles.priceRow}>
//                                         <span>Shipping</span>
//                                         <span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
//                                     </div>
//                                     <div className={styles.totalRow}>
//                                         <span>Total</span>
//                                         <span>${grandTotal.toFixed(2)}</span>
//                                     </div>
//                                 </div>

//                                 <button
//                                     type="submit"
//                                     className={styles.placeOrderBtn}
//                                     disabled={loading || cart.length === 0}
//                                 >
//                                     {loading ? "Processing..." : "Place Order"}
//                                 </button>

//                                 {cart.length === 0 && (
//                                     <p style={{ textAlign: "center", color: "#999", marginTop: "10px" }}>
//                                         Your cart is empty
//                                     </p>
//                                 )}
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//                 <Footer />
//             </PageWrapper>
//         </>
//     );
// }

"use client";

import { useEffect, useState } from "react";
import styles from "@/styles/Checkout.module.css";
import { getCart } from "@/utils/cart";
import { FiEdit2 } from "react-icons/fi";
import { FaCheck } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Footer from "@/components/Footer";
import FinalNav from "@/components/FinalNav";

export default function Checkout() {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [cartItems, setCartItems] = useState([]);

  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [shipping, setShipping] = useState({
    name: "",
    phone: "",
    street: "",
    apt: "",
    date: "",
    time: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setCartItems(getCart());
  }, []);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  /* STEP 1 VALIDATION */
  const validateStep1 = () => {
    let err = {};
    if (!contact.name) err.name = "Enter your name";
    if (!contact.email) err.email = "Enter your email";
    if (!contact.phone) err.phone = "Enter your phone";

    setErrors(err);
    if (Object.keys(err).length === 0) setStep(2);
  };

  /* STEP 2 VALIDATION */
  const validateStep2 = () => {
    let err = {};
    if (!shipping.name) err.sname = "Enter recipient name";
    if (!shipping.phone) err.sphone = "Enter recipient phone";
    if (!shipping.street) err.street = "Enter street";
    if (!shipping.date) err.date = "Select date";
    if (!shipping.time) err.time = "Select time";

    setErrors(err);
    if (Object.keys(err).length === 0) setStep(3);
  };

  return (
    <>
      <FinalNav/>
      <div className={styles.wrapper}>
        {/* LEFT SIDE */}
        <div className={styles.left}>
          {/* BREADCRUMB */}
          <div className={styles.breadcrumb}>
            <span className={step >= 1 ? styles.active : ""}>INFORMATION</span>{" "}
            〉<span className={step >= 2 ? styles.active : ""}>SHIPPING</span>{" "}
            〉<span className={step === 3 ? styles.active : ""}>PAYMENT</span>
          </div>

          {/* STEP 1 TITLE */}
          <p className={step === 1 ? styles.title : styles.stepDisabled}>
            1 Contact information
          </p>

          {step === 1 && (
            <>
              <div className={styles.inputBox}>
                <input
                  className={`${styles.input} ${
                    errors.name ? styles.inputError : ""
                  }`}
                  placeholder="Your Name"
                  value={contact.name}
                  onChange={(e) =>
                    setContact({ ...contact, name: e.target.value })
                  }
                />
                {errors.name && (
                  <span className={styles.error}>{errors.name}</span>
                )}
              </div>

              <div className={styles.inputBox}>
                <input
                  className={`${styles.input} ${
                    errors.email ? styles.inputError : ""
                  }`}
                  placeholder="Your Email"
                  value={contact.email}
                  onChange={(e) =>
                    setContact({ ...contact, email: e.target.value })
                  }
                />
                {errors.email && (
                  <span className={styles.error}>{errors.email}</span>
                )}
              </div>

              <div className={styles.inputBox}>
                <input
                  className={`${styles.input} ${
                    errors.phone ? styles.inputError : ""
                  }`}
                  placeholder="Your Phone"
                  value={contact.phone}
                  onChange={(e) =>
                    setContact({ ...contact, phone: e.target.value })
                  }
                />
                {errors.phone && (
                  <span className={styles.error}>{errors.phone}</span>
                )}
              </div>

              <button className={styles.button} onClick={validateStep1}>
                CONTINUE TO SHIPPING
              </button>
            </>
          )}

          {step > 1 && (
            <>
              <div className={styles.doneBox}>
                <p className={styles.titleDone}>
                  <FaCheck /> Contact information
                </p>
                <FiEdit2 className={styles.edit} onClick={() => setStep(1)} />
              </div>
              <hr className={styles.line} />
            </>
          )}

          {/* STEP 2 TITLE */}
          <p className={step === 2 ? styles.title : styles.stepDisabled}>
            2 Shipping details
          </p>

          {step === 2 && (
            <>
              <div className={styles.inputBox}>
                <input
                  className={`${styles.input} ${
                    errors.sname ? styles.inputError : ""
                  }`}
                  placeholder="Recipient Name"
                  value={shipping.name}
                  onChange={(e) =>
                    setShipping({ ...shipping, name: e.target.value })
                  }
                />
                {errors.sname && (
                  <span className={styles.error}>{errors.sname}</span>
                )}
              </div>

              <div className={styles.inputBox}>
                <input
                  className={`${styles.input} ${
                    errors.sphone ? styles.inputError : ""
                  }`}
                  placeholder="Recipient Phone"
                  value={shipping.phone}
                  onChange={(e) =>
                    setShipping({ ...shipping, phone: e.target.value })
                  }
                />
                {errors.sphone && (
                  <span className={styles.error}>{errors.sphone}</span>
                )}
              </div>

              <div className={styles.twoInputs}>
                <input
                  type="date"
                  value={shipping.date}
                  onChange={(e) =>
                    setShipping({ ...shipping, date: e.target.value })
                  }
                />
                <input
                  type="time"
                  value={shipping.time}
                  onChange={(e) =>
                    setShipping({ ...shipping, time: e.target.value })
                  }
                />
              </div>

              <div className={styles.inputBox}>
                <input
                  className={`${styles.input} ${
                    errors.street ? styles.inputError : ""
                  }`}
                  placeholder="Street"
                  value={shipping.street}
                  onChange={(e) =>
                    setShipping({ ...shipping, street: e.target.value })
                  }
                />
                {errors.street && (
                  <span className={styles.error}>{errors.street}</span>
                )}
              </div>

              <input
                className={styles.input}
                placeholder="Apartment"
                value={shipping.apt}
                onChange={(e) =>
                  setShipping({ ...shipping, apt: e.target.value })
                }
              />

              <button className={styles.button} onClick={validateStep2}>
                CONTINUE TO PAYMENT
              </button>
            </>
          )}

          {step > 2 && (
            <>
              <div className={styles.doneBox}>
                <p className={styles.titleDone}>
                  <FaCheck /> Shipping details
                </p>
                <FiEdit2 className={styles.edit} onClick={() => setStep(2)} />
              </div>
              <hr className={styles.line} />
            </>
          )}

          {/* STEP 3 */}
          <p className={step === 3 ? styles.title : styles.stepDisabled}>
            3 Payment
          </p>

          {step === 3 && (
            <div className={styles.paymentSection}>
              <button className={styles.payButton1}>
                <Image
                  src="/images/Google.png"
                  alt="Google Pay"
                  width={22}
                  height={22}
                />
                <span>PAY NOW</span>
              </button>

              <button
                className={styles.purchaseButton}
                onClick={() => router.push("/order-success")}
              >
                MAKE A PURCHASE
              </button>
            </div>
          )}
        </div>

        {/* RIGHT SUMMARY */}
        <div className={styles.rightBox}>
          <p className={styles.summaryTitle}>ORDER SUMMARY</p>

          {cartItems.map((item) => (
            <div className={styles.productBox} key={item.id}>
              <img src={item.image} alt={item.title} />
              <div>
                <p className={styles.productName}>{item.title}</p>
                <p>Quantity ({item.qty})</p>
              </div>
              <p className={styles.price}>{item.price * item.qty} SGD</p>
            </div>
          ))}

          <hr className={styles.line} />

          {/* ✅ GIFT CARD SECTION */}
          <p className={styles.giftText}>
            If you have our gift card, enter the code to get discounts
          </p>

          <div className={styles.giftContainer}>
            <input className={styles.giftInput} placeholder="Gift card" />
            <button className={styles.giftButton}>APPLY</button>
          </div>

          <hr className={styles.line} />

          <div className={styles.rows}>
            <p>Subtotal</p>
            <span>{subtotal} SGD</span>
          </div>

          <div className={styles.rows}>
            <p>Shipping</p>
            <span>{step < 3 ? "Calculated at next step" : "0.00 SGD"}</span>
          </div>

          <div className={styles.totalRow}>
            <p>Total</p>
            <span>{subtotal} SGD</span>
          </div>

          <p className={styles.secure}>Secure Checkout 🔒</p>
        </div>
      </div>
      <Footer />
    </>
  );
}

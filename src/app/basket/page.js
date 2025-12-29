"use client";

import { useEffect, useState } from "react";
import styles from "@/styles/Basket.module.css";
import { getCart, updateQty, removeFromCart } from "@/utils/cart";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import FinalNav from "@/components/FinalNav";

export default function BasketPage() {
  const router = useRouter();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCart(getCart());
  }, []);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <>
      <FinalNav/> 
      <div className={styles.page}>
        <div className={styles.basket}>
          <h2>Basket</h2>

          {cart.map((item) => (
            <div key={item.id} className={styles.item}>
              <img src={item.image} alt={item.title} />

              <div className={styles.info}>
                <h4>{item.title}</h4>
                <p className={styles.desc}>{item.description}</p>
                <p>{item.price} SGD</p>

                <div className={styles.qty}>
                  <button
                    onClick={() => {
                      updateQty(item.id, item.qty - 1);
                      setCart(getCart());
                    }}
                    disabled={item.qty === 1}
                  >
                    -
                  </button>

                  <span>{item.qty}</span>

                  <button
                    onClick={() => {
                      updateQty(item.id, item.qty + 1);
                      setCart(getCart());
                    }}
                  >
                    +
                  </button>
                </div>

                <button
                  className={styles.remove}
                  onClick={() => {
                    removeFromCart(item.id);
                    setCart(getCart());
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.total}>
          <h3>Total</h3>

          {cart.map((item) => (
            <p key={item.id}>
              {item.title}
              <span>{item.price * item.qty} SGD</span>
            </p>
          ))}

          <hr />

          <p>
            Delivery : <span>Free</span>
          </p>
          <p>
            Sale : <span>0</span>
          </p>

          <h4>
            Total : <span>{subtotal} SGD</span>
          </h4>
          <div className={styles.btnWrap}>
            <button
              className={styles.pay}
              onClick={() => router.push("/checkout")}
            >
              Pay
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

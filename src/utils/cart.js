const CART_KEY = "dazzling_cart";

export const getCart = () => {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
};

export const addToCart = (product, qty = 1) => {
  const cart = getCart();

  const existing = cart.find(item => item.id === product.id);

  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      description: product.composition, // ✅ FIX HERE
      qty
    });
  }

  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const updateQty = (id, qty) => {
  const cart = getCart().map(item =>
    item.id === id ? { ...item, qty } : item
  );
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const removeFromCart = (id) => {
  const cart = getCart().filter(item => item.id !== id);
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

// utils/wishlist.js

export const getWishlist = () => {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem("wishlist")) || [];
};

export const addToWishlist = (product) => {
  const wishlist = getWishlist();
  const exists = wishlist.find((item) => item.id === product.id);
  if (exists) return wishlist;

  const updated = [...wishlist, product];
  localStorage.setItem("wishlist", JSON.stringify(updated));
  return updated;
};

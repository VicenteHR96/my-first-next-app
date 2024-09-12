"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useAuthContext } from "./AuthContext";
import { db } from "../firebase/config";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuthContext();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const loadCart = async () => {
      if (user?.uid) {
        const cartRef = doc(db, "carts", user.uid);
        const cartSnap = await getDoc(cartRef);
        if (cartSnap.exists()) {
          setCart(cartSnap.data().items || []);
        }
      } else {
        setCart([]); // Clear cart if no user is logged in
      }
    };

    loadCart();
  }, [user]);

  const addToCart = async (item, quantity = 1) => {
    const existingItemIndex = cart.findIndex(
      (cartItem) => cartItem.id === item.id
    );

    if (existingItemIndex > -1) {
      // If item already exists in cart, update its quantity
      const existingItem = cart[existingItemIndex];
      // quantity = existingItem.quantity == existingItem.inStock ? 0 : 1;
      // const newQuantity = existingItem.quantity + quantity;

      const newQuantity = Math.min(
        (existingItem.quantity ?? 0) + (quantity ?? 0),
        item.inStock ?? 0
      );

      const updatedCart = [...cart];
      updatedCart[existingItemIndex] = {
        ...existingItem,
        quantity: newQuantity,
      };
      setCart(updatedCart);

      if (user?.uid) {
        const cartRef = doc(db, "carts", user.uid);
        await setDoc(cartRef, { items: updatedCart });
      }
    } else {
      // Add new item to cart with the specified quantity
      const newItem = {
        ...item,
        quantity: quantity,
        // Math.max((quantity = 1), item.instock), // Use quantity passed or default
      };
      const updatedCart = [...cart, newItem];
      setCart(updatedCart);

      if (user?.uid) {
        const cartRef = doc(db, "carts", user.uid);
        await setDoc(cartRef, { items: updatedCart });
      }
    }
    console.log("Q: " + quantity);
  };

  const removeFromCart = async (itemId) => {
    const updatedCart = cart.filter((item) => item.id !== itemId);
    setCart(updatedCart);

    if (user?.uid) {
      const cartRef = doc(db, "carts", user.uid);
      await updateDoc(cartRef, {
        items: updatedCart,
      });
    }
  };

  const clearCart = async () => {
    setCart([]);
    if (user?.uid) {
      const cartRef = doc(db, "carts", user.uid);
      await setDoc(cartRef, { items: [] });
    }
  };

  // Maneja el incremento de cantidad
  const handleIncrease = (product) => {
    if (product.quantity < product.inStock) {
      addToCart(product, 1);
    }
  };

  // Maneja la reducción de cantidad
  const handleDecrease = (product) => {
    if (product.quantity > 1) {
      addToCart(product, -1);
    } else {
      removeFromCart(product.id);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        handleDecrease,
        handleIncrease,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);

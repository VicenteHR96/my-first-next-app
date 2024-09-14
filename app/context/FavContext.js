"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useAuthContext } from "./AuthContext";
import { db } from "../firebase/config";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

export const FavContext = createContext();

export const FavProvider = ({ children }) => {
  const { user } = useAuthContext();
  const [fav, setFav] = useState([]);

  useEffect(() => {
    loadFav();
  }, [user]);

  const loadFav = async () => {
    if (user?.uid) {
      const favRef = doc(db, "favs", user.uid);
      const favSnap = await getDoc(favRef);
      if (favSnap.exists()) {
        setFav(favSnap.data().items || []);
      }
    } else {
      setFav([]); // Clear cart if no user is logged in
    }
  };
  console.log(fav);

  const addToFav = async (item) => {
    const existingItemIndex = fav.findIndex(
      (favItem) => favItem.id === item.id
    );

    if (existingItemIndex > -1) {
      // If item already exists in cart, update its quantity
      const existingItem = fav[existingItemIndex];

      const updatedFav = [...fav];
      updatedFav[existingItemIndex] = {
        ...existingItem,
      };
      setFav(updatedFav);

      if (user?.uid) {
        const favRef = doc(db, "favs", user.uid);
        await setDoc(favRef, { items: updatedFav });
      }
    } else {
      // Add new item to fav with the specified quantity
      const newItem = {
        ...item,
      };
      const updatedFav = [...fav, newItem];
      setFav(updatedFav);

      if (user?.uid) {
        const favRef = doc(db, "favs", user.uid);
        await setDoc(favRef, { items: updatedFav });
      }
    }
  };

  const removeFromFav = async (itemId) => {
    const updatedFav = fav.filter((item) => item.id !== itemId);
    setFav(updatedFav);

    if (user?.uid) {
      const favRef = doc(db, "favs", user.uid);
      await updateDoc(favRef, {
        items: updatedFav,
      });
    }
  };

  const clearFav = async () => {
    setFav([]);
    if (user?.uid) {
      const favRef = doc(db, "favs", user.uid);
      await setDoc(favRef, { items: [] });
    }
  };

  return (
    <FavContext.Provider
      value={{
        fav,
        loadFav,
        addToFav,
        removeFromFav,
        clearFav,
      }}
    >
      {children}
    </FavContext.Provider>
  );
};

export const useFavContext = () => useContext(FavContext);

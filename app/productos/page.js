import { collection, getDocs, query } from "firebase/firestore";
import ProductList from "../components/ProductList";
import { URLBASE } from "../config/constants";
import { db } from "../firebase/config";
import { Suspense } from "react";

// const getProducts = async () => {
//   try {
//     const productRef = collection(db, "productos");
//     let q;
//     q = query(productRef);
//     const querySnapshots = await getDocs(q);
//     const docs = querySnapshots.docs.map((doc) => doc.data());
//     return docs;
//   } catch (error) {}
// };

const getProducts = async () => {
  const data = await fetch(`https://${process.env.VERCEL_URL}/api/productos`, {
    cache: "no-store",
  });
  const products = await data.json();
  return products;
};

export default async function Productos() {
  const productos = await getProducts();
  return (
    <>
      <ProductList category={"all"} data={productos} />
    </>
  );
}

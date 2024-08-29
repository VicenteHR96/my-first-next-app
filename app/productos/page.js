import { collection, getDocs, query } from "firebase/firestore";
import ProductList from "../components/ProductList";
import { URLBASE } from "../config/constants";
import { db } from "../firebase/config";
import { Suspense } from "react";

const getProducts = async () => {
  try {
    const productRef = collection(db, "productos");
    let q;
    q = query(productRef);
    const querySnapshots = await getDocs(q);
    const docs = querySnapshots.docs.map((doc) => doc.data());
    return docs;
  } catch (error) {}
};

export default async function Productos() {
  const productos = await getProducts();
  return (
    <>
      <Suspense
        fallback={
          <div className="min-h-screen bg-white flex justify-center items-center ">
            <h1 className="text-gray-500 text-4xl animate-pulse">
              Cargando...
            </h1>
          </div>
        }
      >
        <ProductList category={"all"} data={productos} />
      </Suspense>
    </>
  );
}

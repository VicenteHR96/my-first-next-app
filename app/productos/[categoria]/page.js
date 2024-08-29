import ProductList from "@/app/components/ProductList";
import { db } from "@/app/firebase/config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Suspense } from "react";

export async function generateMetadata({ params, searchParams }, parent) {
  return {
    title: `${params.categoria.charAt(0).toUpperCase()}${params.categoria
      .slice(1)
      .toLowerCase()} - Capellari Tienda Oficial`,
  };
}

export function generateStaticParams() {
  return [
    { categoria: "all" },
    { categoria: "cocina" },
    { categoria: "hogar" },
    { categoria: "belleza" },
  ];
}

export const revalidate = 3600;

const getFilteredProducts = async (categoria) => {
  try {
    const productRef = collection(db, "productos");
    let q;
    if (categoria === "all") {
      q = query(productRef);
    } else {
      q = query(productRef, where("category", "==", categoria));
    }
    const querySnapshots = await getDocs(q);
    const docs = querySnapshots.docs.map((doc) => doc.data());
    return docs;
  } catch (error) {}
};

const Categoria = async ({ params }) => {
  const { categoria } = params;
  const filteredProducts = await getFilteredProducts(categoria);

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
        <ProductList category={"all"} data={filteredProducts} />
      </Suspense>
    </>
  );
};

export default Categoria;

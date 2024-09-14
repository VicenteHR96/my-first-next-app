import ProductoDetalle from "@/app/components/ProductoDetalle";
import { db } from "@/app/firebase/config";
import { collection, getDocs, query, where } from "firebase/firestore";

const getProduct = async (id) => {
  try {
    const productRef = collection(db, "productos");
    const q = query(productRef, where("id", "==", id));
    const querySnapshots = await getDocs(q);
    if (!querySnapshots.empty) {
      return querySnapshots.docs[0].data();
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const generateMetadata = async ({ params }) => {
  const { id } = params;
  const product = await getProduct(id);
  return {
    title:
      `${product?.title} - Capellari Tienda Oficial` ||
      "Producto no encontrado",
    description: product?.description || "Descripción no disponible",
    openGraph: {
      title: `${product?.title} - Capellari Tienda Oficial`,
      description: product?.description,
    },
  };
};

const ProductoPage = async ({ params }) => {
  const { id } = params;
  const product = await getProduct(id);

  if (!product) {
    return <p>Producto no encontrado.</p>;
  }

  return <ProductoDetalle product={product} />;
};

export default ProductoPage;

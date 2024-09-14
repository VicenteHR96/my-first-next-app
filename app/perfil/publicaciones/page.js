import PublicationsList from "@/app/components/admin/PublicationsList";
import { URLBASE } from "@/app/config/constants";
import React from "react";

const getProducts = async () => {
  const data = await fetch(`https://${process.env.VERCEL_URL}/api/productos`, {
    cache: "no-store",
  });
  const products = await data.json();
  return products;
};

const Publicaciones = async () => {
  const products = await getProducts();
  return (
    <>
      <PublicationsList products={products} />
    </>
  );
};

export default Publicaciones;

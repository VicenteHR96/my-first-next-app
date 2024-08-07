"use client";
import MenuCategoria from "@/app/components/MenuCategoria";
import ProductList from "@/app/components/ProductList";
import mockData from "@/app/data/mockData";
import { useParams } from "next/navigation";
import React from "react";

const Categoria = () => {
  const { categoria } = useParams();
  const filterData =
    categoria === "all"
      ? mockData
      : mockData.filter(
          (item) =>
            item.category.toLocaleLowerCase() === categoria.toLocaleLowerCase()
        );

  return (
    <>
      <ProductList category={"all"} data={filterData} />
    </>
  );
};

export default Categoria;

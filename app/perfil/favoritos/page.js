"use client";
import FavList from "@/app/components/admin/FavList";
import PublicationsList from "@/app/components/admin/PublicationsList";
import Construccion from "@/app/components/Construccion";
import { useFavContext } from "@/app/context/FavContext";
import React from "react";

const Favoritos = () => {
  const { fav } = useFavContext();
  return (
    <>
      <FavList products={fav} />
    </>
  );
};

export default Favoritos;

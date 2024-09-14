"use client";

import { useCartContext } from "@/app/context/CartContext";
import { useFavContext } from "@/app/context/FavContext";
import {
  ArrowLeftIcon,
  ShoppingCartIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import Link from "next/link";

const ProductoDetalle = ({ product }) => {
  const router = useRouter();
  const { addToCart, cart } = useCartContext();
  const { addToFav, removeFromFav, fav } = useFavContext();
  const { user } = useAuthContext();

  const [loading, setLoading] = useState(false);

  const isProductInCart = cart.find((item) => item.id === product.id);
  const validateStock = isProductInCart
    ? isProductInCart.quantity === isProductInCart.inStock
    : false;
  const isProductInFav = fav.find((item) => item.id === product.id);
  const validateFav = Boolean(isProductInFav);

  return (
    <>
      {loading ? (
        <div className="flex-grow bg-white flex justify-center items-center">
          <h1 className="text-gray-500 text-4xl animate-pulse">Cargando...</h1>
        </div>
      ) : (
        <div className="relative flex-grow flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl md:px-6 lg:p-8">
          <button
            type="button"
            onClick={() => router.back()}
            className="mb-4 absolute right-4 top-4 text-gray-400 hover:text-gray-500"
          >
            <ArrowLeftIcon aria-hidden="true" className="h-6 w-6" />
          </button>

          <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 md:grid-cols-12 lg:gap-x-8">
            <div className="flex justify-center aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 md:col-span-12 lg:col-span-5">
              <img
                alt={product.imageAlt}
                src={product.imageSrc}
                className="object-cover object-center"
              />
            </div>
            <div className="md:col-span-12 lg:col-span-7 flex flex-col gap-6">
              <section
                aria-labelledby="information-heading"
                className="mt-2 pb-8 border-b-2 flex gap-6 flex-col"
              >
                <div className="flex justify-between">
                  <div className="flex flex-col gap-4">
                    <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">
                      {product.title}
                    </h2>
                    <span className="w-fit inline-block rounded-full bg-gray-400 px-3 py-1 text-[0.75em] font-bold text-primary-700">
                      {product.category.charAt(0).toUpperCase() +
                        product.category.slice(1).toLowerCase()}
                    </span>
                  </div>
                  <p className="text-2xl text-gray-900">{`$${product.price.toLocaleString()}`}</p>
                </div>
                <div className="flex flex-col gap-y-4 md:gap-4 md:flex-row">
                  <button
                    onClick={() => addToCart(product, 1)}
                    disabled={validateStock}
                    className={`${
                      validateStock
                        ? "bg-gray-400"
                        : "bg-indigo-600 hover:bg-indigo-700"
                    } flex w-full items-center justify-center gap-2 rounded-md px-8 py-3 text-base font-medium text-white`}
                  >
                    <ShoppingCartIcon aria-hidden="true" className="h-6 w-6" />
                    Añadir al carrito
                  </button>
                  {user.logged ? (
                    <button
                      onClick={
                        validateFav
                          ? () => removeFromFav(product.id)
                          : () => addToFav(product)
                      }
                      className={`${
                        validateFav
                          ? "bg-amber-400 text-white"
                          : "bg-white text-gray-500 hover:bg-neutral-200"
                      } flex w-full items-center justify-center gap-2 rounded-md px-8 py-3 text-base font-medium`}
                    >
                      <StarIcon aria-hidden="true" className="h-6 w-6" />
                      {validateFav ? "Favorito" : "Añadir a favoritos"}
                    </button>
                  ) : (
                    <Link
                      href="/perfil"
                      className="bg-white text-gray-500 hover:bg-neutral-200 flex w-full items-center justify-center gap-2 rounded-md px-8 py-3 text-base font-medium"
                    >
                      <StarIcon aria-hidden="true" className="h-6 w-6" />
                      Añadir a favoritos
                    </Link>
                  )}
                </div>
              </section>
              <section>
                <p className="text-gray-900 text-justify text-xl">
                  {product.description}
                </p>
                <p className="mt-4 text-base text-gray-900 text-justify">
                  {product.detail}
                </p>
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductoDetalle;

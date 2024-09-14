"use client";
import { useCartContext } from "@/app/context/CartContext";
import { useFavContext } from "@/app/context/FavContext";
import { ShoppingCartIcon, StarIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";

const FavList = ({ products }) => {
  const { removeFromFav } = useFavContext();
  const { addToCart, cart } = useCartContext();

  return (
    <div>
      <h1 className="text-gray-500">Favoritos</h1>
      {products.length > 0 ? (
        <div className="mt-8">
          <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {products.map((product) => {
                // Verifica si el producto ya está en el carrito
                const isProductInCart = cart.find(
                  (item) => item.id === product.id
                );
                const validateStock = isProductInCart
                  ? isProductInCart.quantity == isProductInCart.inStock
                  : false;

                return (
                  <li key={product.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        alt={product.imageAlt}
                        src={product.imageSrc}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <Link href="#">{product.title}</Link>
                          </h3>
                          <p className="ml-4">
                            ${product.price.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="flex gap-1">
                          <p className="text-gray-500">Stock:</p>
                          <span className="text-gray-500">
                            {product.inStock}
                          </span>
                        </div>

                        <div className="flex gap-3">
                          <button
                            onClick={() => addToCart(product)}
                            className={`${
                              validateStock
                                ? "bg-gray-400 cursor"
                                : "bg-indigo-600 hover:bg-indigo-700"
                            } rounded-full text-white transition`}
                          >
                            <div className="h-8 w-8 flex justify-center items-center">
                              <ShoppingCartIcon
                                aria-hidden="true"
                                className="h-5 w-5"
                              />
                            </div>
                          </button>
                          <button
                            onClick={() => removeFromFav(product.id)}
                            className="bg-red-500 rounded-full text-white transition hover:bg-red-400"
                          >
                            <div className="h-8 w-8 flex justify-center items-center">
                              <StarIcon
                                aria-hidden="true"
                                className="h-5 w-5"
                              />
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      ) : (
        <div className="w-full flex justify-center pt-10">
          <h1 className="text-gray-400 text-3xl text-center">
            Aún no has añadido favoritos
          </h1>
        </div>
      )}
    </div>
  );
};

export default FavList;

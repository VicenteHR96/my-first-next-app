"use client";
import { useCartContext } from "@/app/context/CartContext";
import { useFavContext } from "@/app/context/FavContext";
import { db } from "@/app/firebase/config";
import {
  ArrowLeftIcon,
  ShoppingCartIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ProductoDetalle = () => {
  const router = useRouter();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [singleProduct, setSingleProduct] = useState(null);
  const { addToCart, cart } = useCartContext();
  const { addToFav, removeFromFav, fav } = useFavContext();
  // Verifica si el producto ya está en el carrito
  const isProductInCart = cart.find((item) => item.id === id);
  const validateStock = isProductInCart
    ? isProductInCart.quantity == isProductInCart.inStock
    : false;
  const isProductInFav = fav.find((item) => item.id === id);
  const validateFav = isProductInFav ? true : false;
  console.log(validateFav);

  const getProduct = async (id) => {
    try {
      const productRef = collection(db, "productos");
      const q = query(productRef, where("id", "==", id));
      const querySnapshots = await getDocs(q);
      if (!querySnapshots.empty) {
        return querySnapshots.docs[0].data();
      } else {
        return [];
      }
    } catch (error) {
      return console.log(error);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      // setLoading(true);
      const product = await getProduct(id);
      setSingleProduct(product);
      setLoading(false);
    };
    fetchProducts();
  }, [id]);

  return (
    <>
      {loading ? (
        <div className="flex-grow bg-white flex justify-center items-center ">
          <h1 className="text-gray-500 text-4xl animate-pulse">Cargando...</h1>
        </div>
      ) : (
        <div className="relative flex-grow flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl md:px-6 lg:p-8">
          <button
            type="button"
            onClick={() => router.back()}
            className=" mb-4 absolute right-4 top-4 text-gray-400 hover:text-gray-500 md:right-6 md:top-4 lg:right-8 lg:top-4"
          >
            <span className="sr-only">Volver</span>
            <ArrowLeftIcon aria-hidden="true" className="h-6 w-6" />
          </button>

          <div className="mt-4 grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 md:grid-cols-12 lg:gap-x-8">
            <div className="flex justify-center aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 md:col-span-12 lg:col-span-5">
              <img
                alt={singleProduct?.imageAlt}
                src={singleProduct?.imageSrc}
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
                      {singleProduct?.title}
                    </h2>
                    <h3 id="information-heading" className="sr-only">
                      Product information
                    </h3>
                    <span className="w-fit inline-block rounded-full bg-gray-400 px-3 py-1 text-center align-baseline text-[0.75em] font-bold leading-none text-primary-700 hover:bg-gray-400 group-hover:bg-gray-300 dark:text-primary-500">
                      {singleProduct?.category.charAt(0).toUpperCase() +
                        singleProduct?.category.slice(1).toLowerCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-2xl text-gray-900">{`$${singleProduct?.price.toLocaleString()}`}</p>
                  </div>
                </div>
                {/* Reviews */}
                {/* <div className="mt-6">
                  <h4 className="sr-only">Reviews</h4>
                  <div className="flex items-center">
                     <div className="flex items-center">
                          {[0, 1, 2, 3, 4].map((rating) => (
                            <StarIcon
                              key={rating}
                              aria-hidden="true"
                              className={classNames(
                                product.rating > rating
                                  ? "text-gray-900"
                                  : "text-gray-200",
                                "h-5 w-5 flex-shrink-0"
                              )}
                            />
                          ))}
                        </div>
                        <p className="sr-only">
                          {product.rating} out of 5 stars
                        </p>
                        <a
                          href="#"
                          className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          {product.reviewCount} reviews
                        </a> 
                  </div>
                </div> */}
                <div className="flex flex-col gap-y-4 md:gap-4 md:flex-row">
                  <button
                    onClick={() => addToCart(singleProduct, 1)}
                    disabled={validateStock ? true : false}
                    className={`${
                      validateStock
                        ? "bg-gray-400 cursor"
                        : "bg-indigo-600 hover:bg-indigo-700"
                    } gap-3 flex w-full items-center justify-center rounded-md border border-transparent px-8 py-3 text-base font-medium text-white`}
                  >
                    <ShoppingCartIcon aria-hidden="true" className="h-6 w-6" />
                    Añadir al carrito
                  </button>
                  <button
                    onClick={
                      validateFav
                        ? () => removeFromFav(singleProduct.id)
                        : () => addToFav(singleProduct)
                    }
                    className={`${
                      validateFav
                        ? "bg-amber-400 text-white hover:bg-amber-300 hover:text-white"
                        : "bg-white text-gray-500 border-1 border-gray-500 hover:bg-neutral-200 hover:border-0"
                    } gap-3 flex w-full items-center justify-center rounded-md px-8 py-3 text-base font-medium`}
                  >
                    <StarIcon aria-hidden="true" className="h-6 w-6" />
                    {validateFav ? "Favorito" : "Añadir a favoritos"}
                  </button>
                </div>
              </section>

              <section>
                <div className="flex flex-col gap-4">
                  <h3 className="sr-only">Description</h3>

                  <div className="space-y-6">
                    <p className="text-gray-900 text-justify text-xl">
                      {singleProduct?.description}
                    </p>
                  </div>
                  <div className="space-y-6">
                    <p className="text-base text-gray-900 text-justify">
                      {singleProduct?.detail}
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductoDetalle;

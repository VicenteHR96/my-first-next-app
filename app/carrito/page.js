"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import {
  ArrowLeftIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { useCartContext } from "../context/CartContext";

const Carrito = () => {
  const router = useRouter();
  const { cart } = useCartContext(); //Carrito Front (context)
  // Calcular el subtotal
  const subtotal = cart.reduce((total, product) => {
    const price = parseFloat(product.price);
    return total + price;
  }, 0);

  return (
    <>
      <div className="grid grid-cols-1 h-full gap-x-5 gap-y-5 bg-gray-100 shadow-xl lg:grid-cols-4 lg:p-8">
        <div className="flex-1 overflow-y-auto bg-white rounded-lg px-4 py-6 sm:px-6 lg:col-span-3">
          <div className="flex items-start justify-between">
            <div className="ml-3 flex h-7 items-center">
              <button
                type="button"
                onClick={() => router.back()}
                className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Close panel</span>
                <ArrowLeftIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>
          </div>

          {cart.length > 0 ? (
            <div className="mt-8">
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {cart.map((product) => (
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
                          <div className="flex gap-3">
                            <p className="text-gray-500">Cantidad:</p>
                            <button className="bg-neutral-300 rounded-full text-gray-500 transition hover:bg-neutral-400">
                              <MinusIcon
                                aria-hidden="true"
                                className="h-5 w-5"
                              ></MinusIcon>
                            </button>
                            <span className="text-gray-500">1</span>
                            <button className="bg-neutral-300 rounded-full text-gray-500 transition hover:bg-neutral-400">
                              <PlusIcon
                                aria-hidden="true"
                                className="h-5 w-5"
                              />
                            </button>
                          </div>

                          <div className="flex">
                            <button
                              type="button"
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                              Eliminar
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="w-full flex justify-center pt-10">
              <h1 className="text-gray-400 text-3xl text-center">
                Aún no has añadido productos al carrito
              </h1>
            </div>
          )}
        </div>

        <div className="border-t border-gray-200 h-fit rounded-lg bg-white px-4 py-6 sm:px-6 lg:col-span-1">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>${subtotal.toLocaleString()}</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">
            El costo de envío y los impuestos serán calculados al momento del
            pago..
          </p>
          <div className="mt-6">
            {cart.length > 0 ? (
              <button
                href="/carrito"
                className="w-full flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Ir a pagar
              </button>
            ) : (
              <button
                disabled
                href="/carrito"
                className="w-full flex items-center justify-center rounded-md border border-transparent bg-gray-400 px-6 py-3 text-base font-medium text-white shadow-sm"
              >
                Ir a pagar
              </button>
            )}
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              o{" "}
              <button
                type="button"
                onClick={() => router.back()}
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Continuar comprando
                <span aria-hidden="true"> &rarr;</span>
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Carrito;

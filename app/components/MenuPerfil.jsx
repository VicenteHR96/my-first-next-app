"use client";

import { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import {
  ArrowRightIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import Link from "next/link";

const subCategories = [
  { name: "Mis datos", href: "" },
  { name: "Mis favoritos", href: "/favoritos" },
  { name: "Mis publicaciones", href: "/publicaciones" },
  //   { name: "Hip Bags", href: "#" },
  //   { name: "Laptop Sleeves", href: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function MenuPerfil({ content }) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const path = usePathname();

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Dialog
          open={mobileFiltersOpen}
          onClose={setMobileFiltersOpen}
          className="relative z-40 lg:hidden"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 z-40 flex">
            <DialogPanel
              transition
              className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
            >
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">
                  Menú de perfil
                </h2>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4 border-t border-gray-200">
                <h3 className="sr-only">Categories</h3>
                <ul role="list" className="px-2 py-3 font-medium text-gray-900">
                  {subCategories.map((category) => (
                    <li
                      key={category.name}
                      className={`${
                        path === "/perfil" + category.href.toLowerCase()
                          ? "transition translate-x-1 text-indigo-500"
                          : "transition"
                      } mb-4`}
                    >
                      <Link
                        href={`/perfil${category.href}`}
                        className={`flex items-center gap-2`}
                      >
                        <ArrowRightIcon
                          aria-hidden="true"
                          className="h-4 w-4"
                        />
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-center">
                  <Link href={"/perfil/crear"}>
                    <button className="mt-4 rounded-md px-8 bg-green-500 px-3.5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                      Agregar producto
                    </button>
                  </Link>
                </div>
              </form>
            </DialogPanel>
          </div>
        </Dialog>

        <main className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-4 pt-4 items-center">
            <h1 className="text-3xl font-semi-bold tracking-tight text-gray-900">
              Perfil
            </h1>

            <div className="flex items-center">
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="flex items-center -m-2 ml-4 px-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              >
                <span className="sr-only">Menú de perfil</span>
                <Bars3Icon aria-hidden="true" className="h-8 w-8" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
              {/* Filters */}
              <form className="hidden lg:block lg:col-span-1">
                <h3 className="sr-only">Categories</h3>
                <ul
                  role="list"
                  className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900"
                >
                  {subCategories.map((category) => (
                    <li
                      key={category.name}
                      className={`${
                        path === "/perfil" + category.href.toLowerCase()
                          ? "transition translate-x-1 text-indigo-500"
                          : "transition"
                      }`}
                    >
                      <Link
                        href={`/perfil${category.href}`}
                        className={`flex items-center gap-2`}
                      >
                        <ArrowRightIcon
                          aria-hidden="true"
                          className="h-4 w-4"
                        />
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div>
                  <Link href={"/perfil/crear"}>
                    <button className="mt-4 rounded-md px-8 bg-green-500 px-3.5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                      Agregar producto
                    </button>
                  </Link>
                </div>
              </form>

              {/* Product grid */}
              <div className="lg:col-span-4">{content}</div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { ArrowRightIcon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import mockData from "../data/mockData";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sortOptions = [
  { name: "Más destacados", href: "#", current: true },
  { name: "Nombre: A-Z", href: "#", current: false },
  { name: "Nombre: Z-A", href: "#", current: false },
  { name: "Precio: Menor a Mayor", href: "#", current: false },
  { name: "Precio: Mayor a Menor", href: "#", current: false },
];

const filters = [
  {
    id: "categorias",
    name: "Categorías",
    options: [
      { href: "/productos/hogar", label: "Hogar", checked: false },
      { href: "/productos/cocina", label: "Cocina", checked: false },
      { href: "/productos/belleza", label: "Belleza", checked: true },
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function getUniqueCategories(data) {
  const categories = data.map((item) => item.category);
  return [...new Set(categories)];
}

export default function MenuCategoria({ content }) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const path = usePathname();
  const categories = getUniqueCategories(mockData);

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
                <h2 className="text-lg font-medium text-gray-900">Filtros</h2>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                >
                  <span className="sr-only">Cerrar menú</span>
                  <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4 border-t border-gray-200">
                <h3 className="sr-only">Categorías</h3>
                {/* <ul role="list" className="px-2 py-3 font-medium text-gray-900">
                  {subCategories.map((category) => (
                    <li key={category.name}>
                      <a href={category.href} className="block px-2 py-3">
                        {category.name}
                      </a>
                    </li>
                  ))}
                </ul> */}

                {filters.map((section) => (
                  <Disclosure
                    key={section.id}
                    as="div"
                    className="border-t border-gray-200 px-4 py-6"
                    defaultOpen={true}
                  >
                    <h3 className="-mx-2 -my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">
                          {section.name}
                        </span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon
                            aria-hidden="true"
                            className="h-5 w-5 group-data-[open]:hidden"
                          />
                          <MinusIcon
                            aria-hidden="true"
                            className="h-5 w-5 [.group:not([data-open])_&]:hidden"
                          />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-6">
                        {/* <ul
                  role="list"
                  className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900"
                >
                  {subCategories.map((category) => (
                    <li key={category.name}>
                      <a href={category.href}>{category.name}</a>
                    </li>
                  ))}
                </ul> */}
                        <ul
                          role="list"
                          className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900"
                        >
                          {categories.map((category, index) => (
                            <li
                              key={index}
                              className={`${
                                path === "/productos/" + category.toLowerCase()
                                  ? "ml-3 text-indigo-500"
                                  : ""
                              }`}
                            >
                              <Link
                                href={`/productos/${category.toLowerCase()}`}
                                className="flex items-center gap-2"
                              >
                                <ArrowRightIcon
                                  aria-hidden="true"
                                  className="h-4 w-4"
                                />
                                {category}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
                <div className="flex justify-center">
                  <Link
                    href={"/productos"}
                    type="submit"
                    className="flex items-center justify-center rounded-full border border-transparent bg-neutral-400 px-3 py-1 text-xs font-medium text-white hover:bg-neutral-500"
                  >
                    Mostrar todo
                  </Link>
                </div>
              </form>
            </DialogPanel>
          </div>
        </Dialog>

        <main className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-10">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Productos
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Ordenar...
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <MenuItem key={option.name}>
                        <a
                          href={option.href}
                          className={classNames(
                            option.current
                              ? "font-medium text-gray-900"
                              : "text-gray-500",
                            "block px-4 py-2 text-sm data-[focus]:bg-gray-100"
                          )}
                        >
                          {option.name}
                        </a>
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon aria-hidden="true" className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              >
                <span className="sr-only">Filtros</span>
                <FunnelIcon aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                <h3 className="sr-only">Categories</h3>
                {/* <ul
                  role="list"
                  className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900"
                >
                  {subCategories.map((category) => (
                    <li key={category.name}>
                      <a href={category.href}>{category.name}</a>
                    </li>
                  ))}
                </ul> */}

                {filters.map((section) => (
                  <Disclosure
                    key={section.id}
                    as="div"
                    className="py-6"
                    defaultOpen={true}
                  >
                    <h3 className="-my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">
                          {section.name}
                        </span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon
                            aria-hidden="true"
                            className="h-5 w-5 group-data-[open]:hidden"
                          />
                          <MinusIcon
                            aria-hidden="true"
                            className="h-5 w-5 [.group:not([data-open])_&]:hidden"
                          />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-4">
                        <ul
                          role="list"
                          className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900"
                        >
                          {categories.map((category, index) => (
                            <li
                              key={index}
                              className={`${
                                path === "/productos/" + category.toLowerCase()
                                  ? "transition translate-x-1 text-indigo-500"
                                  : "transition"
                              }`}
                            >
                              <Link
                                href={`/productos/${category.toLowerCase()}`}
                                className="flex items-center gap-2"
                              >
                                <ArrowRightIcon
                                  aria-hidden="true"
                                  className="h-4 w-4"
                                />
                                {category}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
                <div className="flex justify-center">
                  <Link
                    href={"/productos"}
                    type="submit"
                    className="flex items-center justify-center rounded-full border border-transparent bg-neutral-400 px-3 py-1 text-xs font-medium text-white hover:bg-neutral-500"
                  >
                    Mostrar todo
                  </Link>
                </div>
              </form>

              {/* Product grid */}
              <div className="lg:col-span-3">{content}</div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

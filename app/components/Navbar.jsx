"use client";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import {
  ArrowLeftStartOnRectangleIcon,
  Bars3Icon,
  BuildingStorefrontIcon,
  Cog6ToothIcon,
  ShoppingCartIcon,
  StarIcon,
  UserCircleIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useCartContext } from "../context/CartContext";
import { usePathname } from "next/navigation";
import LogoutButton from "./admin/LogoutButton";
import { useAuthContext } from "../context/AuthContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/config";
import { useEffect, useState } from "react";

const navigation = [
  { name: "Inicio", href: "/", current: false },
  { name: "Ofertas", href: "/ofertas", current: false },
  { name: "Productos", href: "/productos", current: false },
  // { name: "Favoritos", href: "/perfil/favoritos", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const getDocumentById = async (id) => {
  try {
    const profileRef = collection(db, "usuarios");
    const q = query(profileRef, where("uid", "==", id));
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

export default function Navbar() {
  const path = usePathname();
  const { cart } = useCartContext();
  const { user, logout, values, setValues } = useAuthContext();
  const [loading, setLoading] = useState(true);
  // Calcular la suma total de las cantidades en el carrito
  const qty = cart.reduce((acc, item) => acc + (item.quantity || 0), 0);
  const qtyTotal = qty < 100 ? qty : "+99";

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (user) {
          const userProfile = await getDocumentById(user.uid);
          if (userProfile && !values) {
            setValues({
              ...values,
              ...userProfile,
              id: user.uid,
              email: user.email,
            });
          }
        }
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener el perfil del usuario:", error);
      }
    };
    fetchUserProfile();
  }, [user]);

  return (
    <>
      <Disclosure as="nav" className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button*/}
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <Bars3Icon
                  aria-hidden="true"
                  className="block h-6 w-6 group-data-[open]:hidden"
                />
                <XMarkIcon
                  aria-hidden="true"
                  className="hidden h-6 w-6 group-data-[open]:block"
                />
              </DisclosureButton>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <Link href={"/"} className="flex flex-shrink-0 items-center">
                <Image
                  alt="Your Company"
                  src="/capellari-logo.png"
                  width={30}
                  height={30}
                  className="mx-2"
                />
                <h2>Capellari</h2>
              </Link>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      aria-current={item.current ? "page" : undefined}
                      className={`${
                        path === item.href
                          ? "text-white underline underline-offset-8 decoration-2"
                          : "text-gray-300"
                      } hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium transition`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <Link
                href={"/carrito"}
                type="button"
                className="mr-1 relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:text-white"
              >
                <span className="absolute -inset-1.5" />
                <span className="sr-only">View notifications</span>
                <ShoppingCartIcon aria-hidden="true" className="h-6 w-6" />
                {qty > 0 ? (
                  <span className="absolute w-[22px] h-[22px] bg-red-600 rounded-full flex items-center justify-center bottom-4 left-4">
                    <p className="text-white" style={{ fontSize: "10px" }}>
                      {qtyTotal}
                    </p>
                  </span>
                ) : null}
              </Link>
              {/* <Menu as="div" className="relative ml-3">
                <MenuButton
                  type="button"
                  className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:text-white"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon aria-hidden="true" className="h-6 w-6" />
                </MenuButton>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <MenuItem>
                    <Link
                      href=""
                      className="flex gap-2 px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                    >
                      No tienes notificaciones.
                    </Link>
                  </MenuItem>
                </MenuItems>
              </Menu> */}

              {/* Profile dropdown */}
              {!user.logged ? (
                <Link
                  href={"/perfil"}
                  type="button"
                  className="mr-1 relative rounded-full border-1 bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:text-white"
                >
                  Ingresar
                </Link>
              ) : (
                <Menu as="div" className="relative ml-3">
                  <div>
                    <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      {loading ? (
                        <UserCircleIcon
                          aria-hidden="true"
                          className="h-8 w-8 animate-pulse text-gray-300"
                        />
                      ) : values.avatar ? (
                        <img
                          alt=""
                          src={values.avatar}
                          className="h-8 w-8 rounded-full object-cover"
                        />
                      ) : (
                        <UserCircleIcon
                          aria-hidden="true"
                          className="h-8 w-8 text-gray-300"
                        />
                      )}
                    </MenuButton>
                  </div>
                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                  >
                    <MenuItem>
                      <Link
                        href="/perfil"
                        className="flex gap-2 px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                      >
                        <UserCircleIcon
                          aria-hidden="true"
                          className="h-5 w-5"
                        />
                        Perfil
                      </Link>
                    </MenuItem>
                    {values.rol === "admin" ? (
                      <MenuItem>
                        <Link
                          href="/perfil/publicaciones"
                          className="flex gap-2 px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                        >
                          <BuildingStorefrontIcon
                            aria-hidden="true"
                            className="h-5 w-5"
                          />
                          Publicaciones
                        </Link>
                      </MenuItem>
                    ) : null}
                    {user.logged ? (
                      <MenuItem>
                        <Link
                          href="/perfil/favoritos"
                          className="flex gap-2 px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                        >
                          <StarIcon aria-hidden="true" className="h-5 w-5" />
                          Favoritos
                        </Link>
                      </MenuItem>
                    ) : null}
                    <MenuItem>
                      <Link
                        href="#"
                        className="flex gap-2 px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                      >
                        <Cog6ToothIcon aria-hidden="true" className="h-5 w-5" />
                        Configuración
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <button
                        onClick={logout}
                        className="flex w-full gap-2 px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                      >
                        <ArrowLeftStartOnRectangleIcon
                          aria-hidden="true"
                          className="h-5 w-5"
                        />
                        Salir
                      </button>
                    </MenuItem>
                  </MenuItems>
                </Menu>
              )}
            </div>
          </div>
        </div>

        <DisclosurePanel className="sm:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navigation.map((item) => (
              <DisclosureButton
                key={item.name}
                as={Link}
                href={item.href}
                aria-current={item.current ? "page" : undefined}
                className={`${
                  path === item.href
                    ? "text-white underline underline-offset-8"
                    : "text-gray-300"
                } hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium`}
              >
                {item.name}
              </DisclosureButton>
            ))}
          </div>
        </DisclosurePanel>
      </Disclosure>
    </>
  );
}

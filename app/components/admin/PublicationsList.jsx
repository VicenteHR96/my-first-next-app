"use client";
import { db } from "@/app/firebase/config";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { deleteDoc, doc } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import Swal from "sweetalert2";

// const getProducts = async () => {
//   try {
//     const productRef = collection(db, "productos");
//     let q;
//     q = query(productRef);
//     const querySnapshots = await getDocs(q);
//     const docs = querySnapshots.docs.map((doc) => doc.data());
//     return docs;
//   } catch (error) {}
// };

const PublicationsList = ({ products }) => {
  const router = useRouter();
  const handleDelete = async (id) => {
    console.log("id:" + id);
    try {
      const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: "No podrás revertir esto",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Sí, eliminarlo",
      });

      if (result.isConfirmed) {
        const productDoc = doc(db, "productos", id);
        await deleteDoc(productDoc);
        Swal.fire(
          "Eliminado",
          "El producto ha sido eliminado.",
          "success"
        ).then(() => {
          router.push(`/perfil/publicaciones`);
        });
        // Actualizar tabla de productos
      }
    } catch (error) {
      console.error("Error al eliminar el documento:", error);
      Swal.fire("Error", "Hubo un problema al eliminar el producto.", "error");
    }
  };

  return (
    <div>
      <h1 className="text-gray-500">Publicaciones</h1>
      {products.length > 0 ? (
        <div className="mt-8">
          <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {products.map((product) => (
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
                        <span className="text-gray-500">{product.inStock}</span>
                      </div>

                      <div className="flex gap-3">
                        <Link
                          href={`/perfil/editar/${product.id}`}
                          className="bg-indigo-500 rounded-full text-white transition hover:bg-indigo-400"
                        >
                          <div className="h-8 w-8 flex justify-center items-center">
                            <PencilSquareIcon
                              aria-hidden="true"
                              className="h-5 w-5"
                            />
                          </div>
                        </Link>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="bg-red-500 rounded-full text-white transition hover:bg-red-400"
                        >
                          <div className="h-8 w-8 flex justify-center items-center">
                            <TrashIcon aria-hidden="true" className="h-5 w-5" />
                          </div>
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
            Aún no has añadido publicaciones
          </h1>
        </div>
      )}
    </div>
  );
};

export default PublicationsList;

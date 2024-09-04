"use client";

import { useState } from "react";
import { Field, Label, Switch } from "@headlessui/react";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "../firebase/config";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const editProduct = async (values, router) => {
  const price = parseInt(values.price);
  const imageAlt = values.title;
  const docRef = doc(db, "productos", values.id);
  return updateDoc(docRef, {
    ...values,
    price,
    imageAlt,
    imageSrc: values.imageSrc,
  }).then(() =>
    Swal.fire({
      title: "Producto actualizado exitosamente",
      icon: "success",
      showConfirmButton: false,
      timer: 1500,
      position: "center",
    }).then(() => {
      router.push(`/producto/${values.id}`);
    })
  );
};

export default function EditForm({
  productValues = {
    title: "",
    description: "",
    detail: "",
    imageAlt: "",
    imageSrc: null,
    inStock: 0,
    price: 0,
    category: "",
  },
}) {
  const [agreed, setAgreed] = useState(false);
  const [values, setValues] = useState(productValues);
  const router = useRouter();

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = async (e) => {
    const storageRef = ref(storage, uuidv4());
    const fileSnapshot = await uploadBytes(storageRef, e.target.files[0]);
    const fileURL = await getDownloadURL(fileSnapshot.ref);
    setValues({ ...values, imageSrc: fileURL });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(values);
    await editProduct(values, router);
  };

  return (
    <div className="isolate bg-white">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Publica un producto
        </h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Aute magna irure deserunt veniam aliqua magna enim voluptate.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="mx-auto mt-16">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="first-name"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Título de producto
            </label>
            <div className="mt-2.5">
              <input
                required
                value={values.title}
                onChange={handleChange}
                id="title"
                name="title"
                type="text"
                autoComplete="title"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus:outline-0 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Categoría
            </label>
            <div className="relative mt-2.5">
              <div className="mt-2">
                <select
                  required
                  value={values.category}
                  onChange={handleChange}
                  id="category"
                  name="category"
                  autoComplete="category"
                  className="block w-full h-10 rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus:outline-0 sm:text-sm sm:leading-6"
                >
                  <option value="" disabled>
                    Selecciona una categoría...
                  </option>
                  <option value="cocina">Cocina</option>
                  <option value="hogar">Hogar</option>
                  <option value="belleza">Belleza</option>
                </select>
              </div>
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="img"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Imagen
            </label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              {values.imageSrc ? (
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                >
                  <input
                    onChange={handleImageChange}
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                  />
                  <img src={values.imageSrc} width={150} height={150} />
                </label>
              ) : (
                <div className="text-center">
                  <PhotoIcon
                    aria-hidden="true"
                    className="mx-auto h-12 w-12 text-gray-300"
                  />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        onChange={handleImageChange}
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="description"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Descripción
            </label>
            <div className="mt-2.5">
              <input
                required
                value={values.description}
                onChange={handleChange}
                id="description"
                name="description"
                type="text"
                autoComplete="description"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus:outline-0 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="detail"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Detalles
            </label>
            <div className="mt-2.5">
              <textarea
                value={values.detail}
                onChange={handleChange}
                id="detail"
                name="detail"
                rows={4}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus:outline-0 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="price"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Precio
            </label>
            <div className="mt-2.5">
              <div className="flex rounded-md h-10 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 focus:outline-0">
                <span className="flex select-none items-center pl-3 text-gray-400 font-semibold sm:text-sm">
                  $
                </span>
                <input
                  required
                  value={values.price}
                  onChange={handleChange}
                  id="price"
                  name="price"
                  type="number"
                  placeholder=""
                  autoComplete="price"
                  className="block flex-1 border-0 bg-transparent py-1.5 px-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 focus:outline-0 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
          <div>
            <label
              htmlFor="inStock"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Stock
            </label>
            <div className="mt-2.5">
              <input
                required
                value={values.inStock}
                onChange={handleChange}
                id="inStock"
                name="inStock"
                type="number"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus:outline-0 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <Field className="flex gap-x-4 sm:col-span-2">
            <div className="flex h-6 items-center">
              <Switch
                checked={agreed}
                onChange={setAgreed}
                className="group flex w-8 flex-none cursor-pointer rounded-full bg-gray-200 p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 data-[checked]:bg-indigo-600"
              >
                <span className="sr-only">Agree to policies</span>
                <span
                  aria-hidden="true"
                  className="h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out group-data-[checked]:translate-x-3.5"
                />
              </Switch>
            </div>
            <Label className="text-sm leading-6 text-gray-600">
              By selecting this, you agree to our{" "}
              <a href="#" className="font-semibold text-indigo-600">
                privacy&nbsp;policy
              </a>
              .
            </Label>
          </Field>
        </div>
        <div className="mt-10 flex gap-4">
          <button
            onClick={() => router.back()}
            className="block w-full rounded-md bg-red-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Actualizar
          </button>
        </div>
      </form>
    </div>
  );
}

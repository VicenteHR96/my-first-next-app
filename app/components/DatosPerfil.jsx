"use client";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db, storage } from "../firebase/config";
import { useAuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

const getDocumentById = async (id) => {
  const profileRef = collection(db, "usuarios");
  const q = query(profileRef, where("uid", "==", id));
  const querySnapshots = await getDocs(q);
  return querySnapshots.docs[0].data();
};

const editProfile = async (values) => {
  const telefono = parseInt(values.telefono);
  // const imageAlt = values.title;
  const docRef = doc(db, "usuarios", values.id);
  console.log("UID:" + values.uid);
  return updateDoc(docRef, {
    ...values,
    telefono,
    // imageAlt,
    // imageSrc: values.imageSrc,
  }).then(
    () =>
      Swal.fire({
        title: "Perfil actualizado exitosamente",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
        position: "center",
      })
    // .then(() => {
    //   router.push(`/producto/${values.id}`);
    // })
  );
};

export default function DatosPerfil() {
  const [editMode, setEditMode] = useState(false);

  const { user, logout, values, setValues } = useAuthContext();

  console.dir(values);

  const editButton = () => {
    setEditMode(true);
  };

  const cancelEditButton = () => {
    setEditMode(false);
  };

  useEffect(() => {
    editMode;
    console.log(editMode);
  }, [editMode]);

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
    setValues({ ...values, avatar: fileURL });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(values);
    await editProfile(values);
    setEditMode(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center justify-end gap-x-6">
        {editMode ? (
          <>
            <button
              onClick={cancelEditButton}
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </button>
            <button
              //   onClick={editButton}
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Guardar
            </button>
          </>
        ) : (
          <button
            onClick={editButton}
            type="button"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Editar
          </button>
        )}
      </div>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-1">
              <label
                htmlFor="photo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Photo
              </label>
              <div className="flex items-center gap-x-3">
                {values.avatar ? (
                  <img
                    className="h-12 w-12 rounded-full object-cover"
                    src={values.avatar}
                  />
                ) : (
                  <UserCircleIcon
                    aria-hidden="true"
                    className="h-12 w-12 text-gray-300"
                  />
                )}
                {editMode ? (
                  <label className="cursor-pointer rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    <span>Cambiar</span>
                    <input
                      onChange={handleImageChange}
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                    />
                  </label>
                ) : null}
              </div>
            </div>
            <div className="sm:col-span-5">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-500 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                  <span className="flex select-none bg-neutral-100 items-center pl-3 text-gray-500 sm:text-sm">
                    capellari.com/
                  </span>
                  {editMode ? (
                    <input
                      id="username"
                      name="username"
                      type="text"
                      placeholder="janesmith"
                      autoComplete="username"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-500 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  ) : (
                    <input
                      id="username"
                      name="username"
                      type="text"
                      disabled
                      placeholder="janesmith"
                      autoComplete="username"
                      className="block flex-1 border-0 bg-neutral-100 py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="about"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                About
              </label>
              <div className="mt-2">
                <textarea
                  value={values.about}
                  onChange={handleChange}
                  id="about"
                  name="about"
                  rows={3}
                  className={`${
                    !editMode
                      ? "border-0 text-gray-500 bg-neutral-100"
                      : "ring-1 ring-gray-300 text-gray-900"
                  } block w-full pl-3 rounded-md py-1.5 shadow-sm ring-inset placeholder:text-gray-400
                  focus:ring-2 focus:ring-inset focus:ring-indigo-600 
                  focus:outline-0 sm:text-sm sm:leading-6`}
                  placeholder="Escribe algo sobre ti..."
                  disabled={!editMode}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Información Personal
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Asegúrate de que tu Información sea la correcta.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Nombre
              </label>
              <div className="mt-2">
                <input
                  value={values.nombre}
                  onChange={handleChange}
                  id="nombre"
                  name="nombre"
                  type="text"
                  autoComplete="given-name"
                  disabled={!editMode}
                  className={`${
                    !editMode
                      ? "border-0 text-gray-500 bg-neutral-100"
                      : "ring-1 ring-gray-300 text-gray-900"
                  } block w-full pl-3 rounded-md py-1.5 shadow-sm ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-0 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Apellido
              </label>
              <div className="mt-2">
                <input
                  value={values.apellido}
                  onChange={handleChange}
                  id="apellido"
                  name="apellido"
                  type="text"
                  autoComplete="family-name"
                  disabled={!editMode}
                  className={`${
                    !editMode
                      ? "border-0 text-gray-500 bg-neutral-100"
                      : "ring-1 ring-gray-300 text-gray-900"
                  } block pl-3 w-full rounded-md border-0 py-1.5 shadow-sm ring-inset placeholder:text-gray-400 focus:outline-0 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Correo electrónico
              </label>
              <div className="mt-2">
                <input
                  value={values.email}
                  onChange={handleChange}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  disabled
                  className={`border-0 text-gray-500 bg-neutral-100 block pl-3 w-full rounded-md border-0 py-1.5 shadow-sm ring-inset placeholder:text-gray-400 focus:outline-0 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="telefono"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Teléfono
              </label>
              <div className="mt-2">
                <input
                  value={values.telefono}
                  onChange={handleChange}
                  id="telefono"
                  name="telefono"
                  autoComplete="telefono"
                  type="number"
                  disabled={!editMode}
                  className={`${
                    !editMode
                      ? "border-0 text-gray-500 bg-neutral-100"
                      : "ring-1 ring-gray-300 text-gray-900"
                  } block pl-3 w-full rounded-md border-0 py-1.5 shadow-sm ring-inset placeholder:text-gray-400 focus:outline-0 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="country"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                País
              </label>
              <div className="mt-2">
                <select
                  id="country"
                  name="country"
                  autoComplete="country-name"
                  disabled={!editMode}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-0 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Mexico</option>
                </select>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="street-address"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Dirección
              </label>
              <div className="mt-2">
                <input
                  id="street-address"
                  name="street-address"
                  type="text"
                  autoComplete="street-address"
                  disabled={!editMode}
                  className={`${
                    !editMode
                      ? "border-0 text-gray-500 bg-neutral-100"
                      : "ring-1 ring-gray-300 text-gray-900"
                  } block pl-3 w-full rounded-md border-0 py-1.5 shadow-sm ring-inset placeholder:text-gray-400 focus:outline-0 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label
                htmlFor="city"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Ciudad
              </label>
              <div className="mt-2">
                <input
                  id="city"
                  name="city"
                  type="text"
                  autoComplete="address-level2"
                  disabled={!editMode}
                  className={`${
                    !editMode
                      ? "border-0 text-gray-500 bg-neutral-100"
                      : "ring-1 ring-gray-300 text-gray-900"
                  } block pl-3 w-full rounded-md border-0 py-1.5 shadow-sm ring-inset placeholder:text-gray-400 focus:outline-0 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="region"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Región / Provincia
              </label>
              <div className="mt-2">
                <input
                  id="region"
                  name="region"
                  type="text"
                  autoComplete="address-level1"
                  disabled={!editMode}
                  className={`${
                    !editMode
                      ? "border-0 text-gray-500 bg-neutral-100"
                      : "ring-1 ring-gray-300 text-gray-900"
                  } block pl-3 w-full rounded-md border-0 py-1.5 shadow-sm ring-inset placeholder:text-gray-400 focus:outline-0 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="postal-code"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                ZIP / Código Postal
              </label>
              <div className="mt-2">
                <input
                  id="postal-code"
                  name="postal-code"
                  type="text"
                  autoComplete="postal-code"
                  disabled={!editMode}
                  className={`${
                    !editMode
                      ? "border-0 text-gray-500 bg-neutral-100"
                      : "ring-1 ring-gray-300 text-gray-900"
                  } block pl-3 w-full rounded-md border-0 py-1.5 shadow-sm ring-inset placeholder:text-gray-400 focus:outline-0 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  );
}

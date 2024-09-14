"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Error = ({ error, reset }) => {
  const router = useRouter();

  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <div className="flex-grow bg-white">
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-indigo-600">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            ¡Error a la vista!
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            Lo sentimos, tuvimos un error en la página que andas buscando.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <button
              onClick={reset}
              className="rounded-md px-8 bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Reintentar
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Error;

"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Construccion = () => {
  const router = useRouter();

  return (
    <div className="flex-grow bg-white">
      <main className="grid h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <div className="w-full flex justify-center">
            <Image
              className="center"
              alt="Construcción"
              src={"/construccion.png"}
              width={100}
              height={100}
            />
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Página en construcción
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            Estamos trabajando para brindarte la mejor experiencia.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <button
              onClick={() => router.back()}
              className="rounded-md px-8 bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Volver
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Construccion;

import Image from "next/image";
import Link from "next/link";

const imgs = [
  {
    src: "",
    alt: "",
    class: "",
  },
  {
    src: "",
    alt: "",
    class: "",
  },
];

export default function Collections() {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
        <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
          <div className="sm:max-w-lg">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Encuentra los mejores productos para tu hogar aquí.
            </h1>
            <p className="mt-4 text-xl text-gray-500">
              Tenemos un catálogo completo con las mejores marcas a nivel
              global. Encuentra la más alta tecnología en Capellari.
            </p>
          </div>
          <div>
            <div className="mt-10">
              {/* Decorative image grid */}
              <div
                aria-hidden="true"
                className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
              >
                <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                  <div className="flex items-center space-x-6 lg:space-x-8">
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                        <Image
                          alt="Refrigerador de muestra"
                          src="/refrigerador-collections.png"
                          className="h-full w-full object-cover object-center"
                          width={500}
                          height={500}
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <Image
                          alt="Lavadora de muestra"
                          src="/lavadora-collections.jpg"
                          className="h-full w-full object-cover object-center"
                          width={500}
                          height={500}
                        />
                      </div>
                    </div>
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <Image
                          alt="Horno de muestra"
                          src="/horno-collections.png"
                          className="h-full w-full object-cover object-center"
                          width={500}
                          height={500}
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <Image
                          alt=""
                          src="/plancha-collections.jpg"
                          className="h-full w-full object-cover object-center"
                          width={500}
                          height={500}
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <Image
                          alt="Hornito de muestra"
                          src="/hornito-collections.png"
                          className="h-full w-full object-cover object-center"
                          width={500}
                          height={500}
                        />
                      </div>
                    </div>
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <Image
                          alt="Hervidor de muestra"
                          src="/hervidor-collections.png"
                          className="h-full w-full object-cover object-center"
                          width={500}
                          height={500}
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <Image
                          alt="Licuadora de muestra"
                          src="/licuadora-collections.png"
                          className="h-full w-full object-cover object-center"
                          width={500}
                          height={500}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Link
                href="/productos"
                className="inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700"
              >
                Ver catálogo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

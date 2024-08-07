import Link from "next/link";

/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
const callouts = [
  {
    name: "Hogar",
    description: "Transforma tu casa en hogar",
    imageSrc:
      "https://www.chimeneasvaquer.com/wp-content/uploads/2019/02/est-vision.png",
    imageAlt:
      "Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.",
    href: "/productos/hogar",
  },
  {
    name: "Cocina",
    description: "Los mejores implementos para tus preparaciones",
    imageSrc:
      "https://st4.depositphotos.com/6343398/30284/i/450/depositphotos_302848210-stock-photo-modern-kitchen-interior-electric-stove.jpg",
    imageAlt:
      "Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.",
    href: "/productos/cocina",
  },
  {
    name: "Belleza",
    description: "La mejor tecnología para tu cuidado personal",
    imageSrc:
      "https://img.freepik.com/fotos-premium/secador-cabello-aspecto-moderno_582637-13344.jpg",
    imageAlt: "Collection of four insulated travel bottles on wooden shelf.",
    href: "/productos/belleza",
  },
];

export default function Categories() {
  return (
    <div className="bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
          <h2 className="text-2xl font-bold text-gray-900">
            Nuestras categorías
          </h2>

          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
            {callouts.map((callout) => (
              <Link
                key={callout.name}
                className="group relative"
                href={callout.href}
              >
                <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                  <img
                    alt={callout.imageAlt}
                    src={callout.imageSrc}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <h3 className="mt-6 text-sm text-gray-500">
                  <span className="absolute inset-0" />
                  {callout.name}
                </h3>
                <p className="text-base font-semibold text-gray-900">
                  {callout.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

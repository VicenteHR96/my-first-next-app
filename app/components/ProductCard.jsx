import Link from "next/link";
import React from "react";

const ProductCard = ({
  id,
  title,
  description,
  price,
  imageAlt,
  imageSrc,
  category,
}) => {
  return (
    <>
      <Link key={id} className="group" href={`/producto/${id}`}>
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
          <img
            alt={imageAlt}
            src={imageSrc}
            className="h-full w-full object-cover object-center group-hover:opacity-75 group-hover:scale-105 transition"
          />
        </div>
        <div className="flex flex-col justify-between h-40">
          <h3 className="mt-4 text-sm font-medium text-gray-700 group-hover:text-gray-500 group-hover:underline">
            {title}
          </h3>
          <p className="mt-1 text-sm text-gray-900 group-hover:text-gray-500">
            {description}
          </p>
          <div className="mt-3 flex justify-between">
            <span className="inline-block rounded-full bg-indigo-600 px-3 py-1 text-center align-baseline text-[0.75em] font-bold leading-none text-primary-700  group-hover:bg-indigo-400 dark:text-primary-500">
              {`$${price}`}
            </span>
            <span className="inline-block rounded-full bg-gray-400 px-3 py-1 text-center align-baseline text-[0.75em] font-bold leading-none text-primary-700 hover:bg-gray-400 group-hover:bg-gray-300 dark:text-primary-500">
              {category}
            </span>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ProductCard;

import ProductCard from "./ProductCard";

export default function ProductList({ data, category }) {
  return (
    <div className="bg-white">
      <div className="mx-auto px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {data.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              description={product.description}
              price={product.price}
              imageAlt={product.imageAlt}
              imageSrc={product.imageSrc}
              category={product.category}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

import ProductList from "../components/ProductList";
import mockData from "../data/mockData";

export default function Productos() {
  return (
    <>
      <ProductList category={"all"} data={mockData} />
    </>
  );
}

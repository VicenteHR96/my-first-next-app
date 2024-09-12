import React from "react";
import MenuCategoria from "../components/MenuCategoria";

export const metadata = {
  title: "Productos - Capellari Tienda Oficial",
  description: "Encuentra los mejores electrodomésticos aquí.",
};

const Layout = ({ children }) => {
  return (
    <>
      <div className="flex-grow bg-white">
        <MenuCategoria content={children} />
      </div>
    </>
  );
};

export default Layout;

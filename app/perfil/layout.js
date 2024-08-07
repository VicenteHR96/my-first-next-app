import React from "react";
import MenuPerfil from "../components/MenuPerfil";

export const metadata = {
  title: "Perfil - Capellari Tienda Oficial",
  description: "Encuentra los mejores electrodomésticos aquí.",
};

const Layout = ({ children }) => {
  return (
    <>
      <MenuPerfil content={children} />
    </>
  );
};

export default Layout;

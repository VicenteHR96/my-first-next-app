"use client";

import React, { useEffect } from "react";
import MenuPerfil from "../components/MenuPerfil";
import { useAuthContext } from "../context/AuthContext";

// export const metadata = {
//   title: "Perfil - Capellari Tienda Oficial",
//   description: "Encuentra los mejores electrodomésticos aquí.",
// };

const PerfilLayout = ({ children, login }) => {
  const { user } = useAuthContext();

  return (
    <>
      {user.logged ? (
        <div className="flex-grow bg-white">
          <MenuPerfil content={children} />
        </div>
      ) : (
        login
      )}
    </>
  );
};

export default PerfilLayout;

"use client";
import { useAuthContext } from "@/app/context/AuthContext";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";
import React from "react";

const LogoutButton = () => {
  const { logout } = useAuthContext();
  return (
    <>
      <button
        onClick={logout}
        className="flex gap-2 px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
      >
        <ArrowLeftStartOnRectangleIcon aria-hidden="true" className="h-5 w-5" />
        Salir
      </button>
    </>
  );
};

export default LogoutButton;

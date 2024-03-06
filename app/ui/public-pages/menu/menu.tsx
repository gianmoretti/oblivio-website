"use client";

import Link from "next/link";
import { Button } from "../../common/button/button";
import AcmeLogo from "../../common/logo/acme-logo";
import React from "react";

const Menu: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleMenu = () => {
    console.log("Click");
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-orange-600 text-white p-4">
      <div className="flex justify-between items-center">
        <Link className="px-4 py-2" href="#">
          <AcmeLogo />
        </Link>
        <ul>
          <li className="md:hidden">
            <button
              onClick={toggleMenu}
              className="px-4 py-2 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </li>
          <div
            className={`md:flex md:items-center md:w-auto" ${isOpen ? "" : "hidden"}`}
          >
            <li>
              <Link className="block px-4 py-2" href="#">
                Home
              </Link>
            </li>
            <li>
              <Link className="block px-4 py-2" href="#">
                Lo sapevi che...
              </Link>
            </li>
            <li>
              <Link className="block px-4 py-2" href="#">
                Prezzo
              </Link>
            </li>
            <li>
              <Link className="block px-4 py-2" href="#">
                Chi siamo
              </Link>
            </li>
            <li>
              <Link className="block px-4 py-2" href="#">
                Contatti
              </Link>
            </li>
            <li className="my-2 md:m-0">
              <Link
                href="/login"
                className="flex h-10 px-4 items-center rounded-lg border hover:bg-blue-400 text-sm"
              >
                Login
              </Link>
            </li>
            <li className="my-2 md:my-0 md:mx-3">
              <Link
                href="#"
                className="flex h-10 px-4 items-center rounded-lg border bg-blue-500 hover:bg-blue-400 text-sm"
              >
                Registrati
              </Link>
            </li>
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Menu;

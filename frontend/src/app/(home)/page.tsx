// import Dashboard from '@/app/dashboard/page'
// import LandingPage from '@/app/home/page'
"use client";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
// import Button from "@/app/(components)/Button/Button"

// export default function Home() {
//   return (
//     // <Dashboard />
//     // <LandingPage />
//     <>

//     <div>hello we are at home</div>
//     <Button text="login"  onClick={() => signIn("github", { redirectTo: "/" })} variant="primary" size="medium" />
//     <Button text="logout" onClick={() => signOut()} variant="secondary" size="medium" />
//     </>

//   );
// }

import React, { useState } from "react";

const WarehouseLandingPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session } = useSession();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-green-700 p-4 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="text-white text-3xl font-extrabold">
            <a href="/">Warehouse X - Animal Feeds & Agriculture</a>
          </div>
          {/* Desktop Menu */}
          <div className="space-x-6 hidden md:flex text-lg">
            {/* <a href="/inventory" className="text-white hover:text-green-200">Inventory</a> */}
            {session?.user.role === "admin" ? (
              <>
                {" "}
                <a href="/admin/dashboard" className="text-white hover:text-green-200">
                  AdminDashboard
                </a>
              </>
            ) : null}
            {session?.user.role === "user" ? (
              <>
                {" "}
                <a href="/pos/dashboard" className="text-white hover:text-green-200">
                  user Dashboard
                </a>
              </>
            ) : null}
            {/* <a href="/orders" className="text-white hover:text-green-200">user Orders</a>
            <a href="/report" className="text-white hover:text-green-200">admin Reports</a>
            <a href="/settings" className="text-white hover:text-green-200">Settings</a> */}

            {session !== null ? (
              <>
                {" "}
                <a href="/logout" className="text-white hover:text-green-200">
                logout
                </a>
              </>
            ) : (
              <>
                {" "}
                <button
                  onClick={() => signIn("github", { redirectTo: "/" })}
                  className="text-white hover:text-green-200"
                >
                  login
                </button>
              </>
            )}
          </div>

          {/* Hamburger Icon for Mobile */}
          <div className="md:hidden text-white">
            <button onClick={toggleMenu} className="text-3xl">
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-all duration-300 ${
            menuOpen ? "block" : "hidden"
          }`}
          onClick={toggleMenu}
        >
          <div
            className={`fixed top-0 right-0 bg-white w-3/4 h-full shadow-lg transform transition-transform duration-300 ${
              menuOpen ? "translate-x-0" : "translate-x-full"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-6">
              <div className="text-3xl font-extrabold text-green-700">
                Warehouse X
              </div>
              <button onClick={toggleMenu} className="text-3xl text-green-700">
                ✕
              </button>
            </div>
            <ul className="space-y-6 px-6 text-lg text-green-700">
              <li>
                <a href="/" className="block py-2">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="/inventory" className="block py-2">
                  Inventory
                </a>
              </li>
              <li>
                <a href="/orders" className="block py-2">
                  Orders
                </a>
              </li>
              <li>
                <a href="/report" className="block py-2">
                  Reports
                </a>
              </li>
              <li>
                <a href="/settings" className="block py-2">
                  Settings
                </a>
              </li>
              <li>
                <a href="/logout" className="block py-2">
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-[80vh]"
        style={{ backgroundImage: "url(https://via.placeholder.com/1500x900)" }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col items-center justify-center h-full text-center text-white">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
            Warehouse X - Efficiently Manage Animal Feeds & Agriculture Products
          </h1>
          <p className="text-xl md:text-2xl mb-6">
            Stay ahead with real-time inventory tracking, order management, and
            seamless warehouse operations.
          </p>
          <a
            href="/inventory"
            className="bg-yellow-500 text-white py-3 px-8 rounded-lg text-xl hover:bg-yellow-600 transition-all transform hover:scale-105 duration-300"
          >
            View Inventory
          </a>
        </div>
      </section>

      {/* Inventory Management Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-semibold text-green-700 mb-10">
            Efficient Inventory Management
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-2xl font-semibold text-green-700 mb-4">
                Animal Feeds
              </h3>
              <p className="text-gray-600">
                Track all types of animal feeds, including grains, supplements,
                and specialty feeds. Keep your stock levels updated at all
                times.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-2xl font-semibold text-green-700 mb-4">
                Agricultural Products
              </h3>
              <p className="text-gray-600">
                From seeds to fertilizers, manage all your agricultural products
                seamlessly and ensure your stock is always ready for use.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-2xl font-semibold text-green-700 mb-4">
                Warehouse Operations
              </h3>
              <p className="text-gray-600">
                Monitor your warehouse activities such as stock movement, order
                picking, and shipping to ensure smooth operations and timely
                deliveries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-700 text-white py-8">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="text-lg">
            <p>
              © 2025 Warehouse X - Animal Feeds & Agriculture. All rights
              reserved.
            </p>
          </div>
          <div className="space-x-6 text-lg">
            <a href="/privacy" className="text-white hover:text-green-200">
              Privacy Policy
            </a>
            <a href="/terms" className="text-white hover:text-green-200">
              Terms of Service
            </a>
            <a href="/contact" className="text-white hover:text-green-200">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WarehouseLandingPage;

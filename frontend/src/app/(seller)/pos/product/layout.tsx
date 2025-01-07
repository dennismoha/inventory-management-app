'use client'
import React, { ReactNode } from 'react';

import { useAppSelector } from "@/app/redux/redux";
import Header from "./components/header";
import CartTab from './components/cartTab';
// import Header from '../components/Header'; // Adjust import paths as needed
// import CartTab from '../components/CartTab'; // Adjust import paths as needed

// Define the type for the children prop
interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
   const statusTabCart = useAppSelector(state => state.cart.statusTab);


  return (
    <div className="bg-zinc-200">
      <main
        className={`w-[1200px] max-w-full m-auto p-5 transform transition-transform duration-500 ${
          statusTabCart === false ? '' : '-translate-x-56 w-[800px] max-w-full'
        }`}
      >
        <Header />
        {/* This is where the page content will be rendered */}
        {children}
      </main> 
      <CartTab />
    </div>
  );
}

export default Layout;

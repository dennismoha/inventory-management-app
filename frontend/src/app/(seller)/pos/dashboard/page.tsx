"use client";

import Link from "next/link";

import React, { ReactNode } from "react";
import TotalSales from "./components/sales";
import SalesByDateRange from "./components/sale-between-dates";
import SalesProductsBetweenDates from "./components/sales-products-between-dates";



const Page = ({
  params,
  searchParams,
}: {
  params: { [key: string]: string };
  searchParams: { [key: string]: string };
}) => {
  console.log(
    "Page Rendered with params:",
    params,
    "and searchParams:",
    searchParams
  );
  return (
    <SellersHomePage>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:overflow-auto gap-10 pb-4 custom-grid-rows">
       <SalesByDateRange />
        <TotalSales />
        <SalesProductsBetweenDates />
      </div>
    </SellersHomePage>
  );
};

export default Page;

interface SellersHomePageProps {
  children: ReactNode;
}

const SellersHomePage = ({ children }: SellersHomePageProps) => {
  console.log("SellersHomePage Rendered");
  return (
    <>
      <div>
        this is the SellersHomePage Navbar
        <Link href={`/seller/pos/`}>pos</Link>
      </div>
      <div>{children}</div>
      <div>footer</div>
    </>
  );
};

// export default SellersHomePage;

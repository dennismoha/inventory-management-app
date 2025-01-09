// import React, { ReactNode } from "react";
// import Link from 'next/link'

// interface SellersHomePageProps {
//   children: ReactNode;
// }

// const SellersHomePage: React.FC<SellersHomePageProps>  = ({ children }) => {
//   console.log('SellersHomePage Rendered');
//   return (
//     <>
//      <div> this is the SellersHomePage Navbar   <Link href={`/seller/pos/`}>pos</Link></div>
    
    
//         <div>{children}</div>
//         <div>footer</div>
//     </>
   
    
//   )
// }

// export default SellersHomePage
'use client'

import Link from 'next/link';

// Component with implicit children typing (Next.js handles it)
// components/SellersHomePage.tsx

import React, { ReactNode } from "react";


// app/seller/pos/dashboard/page.tsx



const Page = ({ params, searchParams }: { params: { [key: string]: string }; searchParams: { [key: string]: string } }) => {
  console.log("Page Rendered with params:", params, "and searchParams:", searchParams);
  return (
    <SellersHomePage>
      <div>This is the content inside the Sellers Home Page!</div>
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


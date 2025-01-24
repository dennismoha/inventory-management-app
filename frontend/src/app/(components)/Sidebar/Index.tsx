"use client";

import { useAppDispatch, useAppSelector } from "@/app/redux/redux";
import { setIsSidebarCollapsed } from "@/app/redux/state";
import { useSession } from "next-auth/react";
import {
 
  Layout,
  LucideIcon,
  Menu, 
  ScanBarcode,  
  HardDrive,
  Users
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SidebarCollpase from "../Button/Collpase/sidebar-collpase";


interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isCollapsed: boolean;
}

const SidebarLink = ({
  href,
  icon: Icon,
  label,
  isCollapsed,
}: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard");

  return (
   
    <Link href={href}>
      <div
        className={`cursor-pointer flex items-center ${
          isCollapsed ? "justify-center py-4" : "justify-start px-8 py-4"
        }
          hover:text-green-500 hover:bg-green-100 gap-3 transition-colors ${
            isActive ? "bg-green-500 text-white" : ""
          }
        }`}
      >        
        <Icon className="w-6 h-6 !text-gray-700" size={14} />

        <span
          className={`${
            isCollapsed ? "hidden" : "block"
          } font-medium text-gray-700 text-sm`}
        >
          {label}
        </span>
       
      </div>
    </Link>   
  );
};

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  const { data: session, } = useSession()

  const sidebarClassNames = `fixed flex flex-col ${
    isSidebarCollapsed ? "w-0 md:w-16" : "w-72 md:w-64"
  } bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40`;

  return (
    <div className={sidebarClassNames}>
      {/* Top Logo */}
      <div className="flex gap-3 justify-between md:justify-normal items-center pt-8">
        <Image
          src="https://s3-ed-inventory.s3.eu-north-1.amazonaws.com/logo.png"
          alt="IMS"
          width={27}
          height={27}
          className="rounded w-8"
        />{" "}
        *
        <h1
          className={`${
            isSidebarCollapsed ? "hidden" : "block"
          } font-extrabold text-2xl`}
        >
          IMS 
        </h1>
        <button
          className="md:hidden px-3 py-3 bg-gray-100 rounded-full hover:bg-green-100"
          onClick={toggleSidebar}
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>

      {/* links */}
      {/* LINKS */}
      <div className="flex-grow mt-8">
        {session && session.user.role === 'user' ?    (<>
          <SidebarLink
          href="/pos/dashboard"
          icon={Layout}
          label="Dashboard"
          isCollapsed={isSidebarCollapsed}
        /> 
          <SidebarLink
          href="/pos/products"
          icon={Layout}
          label="POS"
          isCollapsed={isSidebarCollapsed}
        /> 
        <SidebarLink
          href="/pos/product"
          icon={  HardDrive}
          label="Pos test"
          isCollapsed={isSidebarCollapsed}
        /> 
        
        <SidebarLink
          href="/pos/transactions"
          icon={ ScanBarcode}
          label="transactions"
          isCollapsed={isSidebarCollapsed}
        /> 
        <SidebarLink 
         href="/pos/transactions/transaction-insights"
         icon={ ScanBarcode}
         label="transaction-insights"
         isCollapsed={isSidebarCollapsed}
         
        />
          <SidebarLink
          href="/pos/customers"
          icon={Users}
          label="customers"
          isCollapsed={isSidebarCollapsed}
        /> 
        <SidebarLink
          href="/pos/customers/customer-insights"
          icon={Users}
          label="customers-insights"
          isCollapsed={isSidebarCollapsed}
        /> 
        </>):(<>
          <SidebarLink
          href="/admin/dashboard"
          icon={Layout}
          label="Dashboard"
          isCollapsed={isSidebarCollapsed}
        />
          
        {/* <SidebarLink
          href="/inventory"
          icon={Archive}
          label="Inventory"
          isCollapsed={isSidebarCollapsed}
        />  */}
        {/* <SidebarLink
          href="/products"
          icon={Clipboard}
          label="Products"
          isCollapsed={isSidebarCollapsed}
        /> */}
        {/* <SidebarLink
          href="/users"
          icon={User}
          label="Users"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/settings"
          icon={SlidersHorizontal}
          label="Settings"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/expenses"
          icon={CircleDollarSign}
          label="Expenses"
          isCollapsed={isSidebarCollapsed}
        /> */}
          <SidebarCollpase /> 
        </>)}
     
      </div>
   

      {/* footer */}
      <div className={`${isSidebarCollapsed ? "hidden" : "block"} mb-10`}>
        <p className="text-center text-xs text-gray-500">&copy; 2024 me</p>
      </div>
    </div>
  );
};

export default Sidebar;

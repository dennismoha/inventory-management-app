import React from "react";
import CollapseDefault from ".";
import { SidebarMenuLink } from "@/app/(components)/Button/Interfaces/index";
import Link from "next/link";
import { usePathname } from "next/navigation";
// import {  PackageCheck, Archive, User2Icon, Package2Icon } from "lucide-react";
import { useAppSelector } from "@/app/redux/redux";

import {LucideIcon,  Archive,  Package2Icon,  PackageCheck, ShoppingBagIcon, ShoppingCartIcon, CreditCard,UsersIcon, TagIcon, DollarSignIcon, BoxIcon } from 'lucide-react';

const sidebarMenuLinks: SidebarMenuLink[] = [
  {
    label: "products",
    href: "/admin/products",
    icon: Package2Icon,  // Main icon for the 'products' menu
    submenu: [
      {
        href: "/admin/products",
        icon: PackageCheck,  // Icon for 'product list'
        label: "products",
      },
      {
        href: "/admin/product-units",
        icon: BoxIcon,
        label: "product units list",
      },
    ],
  },
  {
    label: "inventory",
    href: "/admin/inventory",
    icon:  Archive,  // Main icon for the 'products' menu
    submenu: [
      {
        href: "/admin/inventory",
        icon:  Archive,  // Icon for 'product list'
        label: "inventory",
      },
      {
        href: "/admin/inventory/product-pricing",
        icon:  CreditCard,  // Icon for 'product list'
        label: "product-pricing",
      },
      {
        href: "/admin/inventory/inventory-pricing-overview",
        icon:  CreditCard,  // Icon for 'product list'
        label: "inventory-pricing-overview",
      },
    
    ],
  },
  {
    label: "units",
    href: "/admin/units",
    icon: BoxIcon,  // Icon for the 'units' menu
    submenu: [
      {
        href: "/admin/units",
        icon: BoxIcon,
        label: "units",
      },      
    ],
  },
  {
    label: "categories",
    href: "/admin/categories",
    icon: TagIcon,  // Icon for the 'categories' menu
    submenu: [
      {
        href: "/admin/categories",
        icon: TagIcon,
        label: "category list",
      },
      {
        href: "/admin/categories/subcategories",
        icon: TagIcon,
        label: "sub category",
      },
    ],
  },
  {
    label: "suppliers",
    href: "/admin/suppliers",
    icon: UsersIcon,  // Icon for the 'suppliers' menu
    submenu: [
      {
        href: "/admin/suppliers",
        icon: UsersIcon,
        label: "suppliers",
      },
      {
        href: "/admin/suppliers/supplier-products",
        icon: DollarSignIcon,
        label: "supplier products",
      },
      {
        href: "/admin/suppliers/supplier-products-pricing",
        icon: DollarSignIcon,
        label: "supplier pricing list",
      },     
     
    ],
  },  
  {
    label: "orders",
    href: "/orders",
    icon: ShoppingBagIcon,  // Icon for the 'suppliers' menu
    submenu: [
      {
        href: "/orders",
        icon: UsersIcon,
        label: "orders",
      },
      {
        href: "/admin/orders/order-products",
        icon: ShoppingCartIcon,
        label: "order products",
      },     
     
    ],
  }, 
];


// const sidebarMenuLinks: SidebarMenuLink[] = [
//   {
//     label: "products",
//     href: "/products",
//     icon: Package2Icon,
//     submenu: [
//       {
//         href: "/products",
//         icon: PackageCheck,
//         label: "product list",
//       },
//     ],
//   },
//   {
//     label: "customers",
//     href: "/customers",
//     icon:  User2Icon,
//     submenu: [
//       {
//         href: "/customer-list",
//         icon: Archive,
//         label: "customer list",
//       },
//       {
//         href: "/customer-debt",
//         icon: Archive,
//         label: "customer debt",
//       },
//     ],
//   },
// ];

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
            hover:text-blue-500 hover:bg-blue-100 gap-3 transition-colors ${
              isActive ? "bg-gray-200 text-white" : ""
            }
          }`}
      >
        <Icon className="w-6 h-6 !text-gray-700" />

        <span
          className={`${
            isCollapsed ? "hidden" : "block"
          } font-medium text-gray-700`}
        >
          {label}
        </span>
      </div>
    </Link>
  );
};

const SidebarCollpase: React.FC = () => {
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  return (
    <>
      {sidebarMenuLinks.map((data, index) => (
        <CollapseDefault
          key={index}
          label={data.label}
          isCollapsed={isSidebarCollapsed}
          href={data.href}
          Icon={data.icon}
        >
          {data.submenu.map((subMenu, key) => (
            <div style={{padding: '0px 10px 0px 10px', margin:'0px 100px 10px 10px', width:'100%', borderRadius:'6%'}}  key={key}>
            <SidebarLink
              href={subMenu.href}
              icon={subMenu.icon}
              label={subMenu.label}
              isCollapsed={isSidebarCollapsed}
              key={key}
            />
            </div>
          ))}        
        </CollapseDefault>
      ))}
    </>
  );
};

export default SidebarCollpase;

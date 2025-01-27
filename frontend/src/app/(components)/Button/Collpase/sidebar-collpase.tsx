// import React from "react";
// import CollapseDefault from ".";
// import { SidebarMenuLink } from "@/app/(components)/Button/Interfaces/index";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// // import {  PackageCheck, Archive, User2Icon, Package2Icon } from "lucide-react";
// import { useAppSelector } from "@/app/redux/redux";

// import {LucideIcon,CreditCardIcon,  Archive,  Package2Icon,  PackageCheck, ShoppingBagIcon, ShoppingCartIcon, CreditCard,UsersIcon, TagIcon, DollarSignIcon, BoxIcon } from 'lucide-react';

// const sidebarMenuLinks: SidebarMenuLink[] = [
//   {
//     label: "products",
//     href: "/admin/products",
//     icon: Package2Icon,  // Main icon for the 'products' menu
//     submenu: [
//       {
//         href: "/admin/products",
//         icon: PackageCheck,  // Icon for 'product list'
//         label: "products",
//       },
//       {
//         href: "/admin/product-units",
//         icon: BoxIcon,
//         label: "product units list",
//       },
//     ],
//   },
//   {
//     label: "inventory",
//     href: "/admin/inventory",
//     icon:  Archive,  // Main icon for the 'products' menu
//     submenu: [
//       {
//         href: "/admin/inventory",
//         icon:  Archive,  // Icon for 'product list'
//         label: "inventory",
//       },
//       {
//         href: "/admin/inventory/product-pricing",
//         icon:  CreditCardIcon,  // Icon for 'product list'
//         label: "product-pricing",
//       },
//       // {
//       //   href: "/admin/inventory/inventory-pricing-overview",
//       //   icon:  CreditCard,  // Icon for 'product list'
//       //   label: "inventory-pricing-overview",
//       // },

//     ],
//   },
//   {
//     label: "units",
//     href: "/admin/units",
//     icon: BoxIcon,  // Icon for the 'units' menu
//     submenu: [
//       {
//         href: "/admin/units",
//         icon: BoxIcon,
//         label: "units",
//       },
//     ],
//   },
//   {
//     label: "categories",
//     href: "/admin/categories",
//     icon: TagIcon,  // Icon for the 'categories' menu
//     submenu: [
//       {
//         href: "/admin/categories",
//         icon: TagIcon,
//         label: "category list",
//       },
//       {
//         href: "/admin/categories/subcategories",
//         icon: TagIcon,
//         label: "sub category",
//       },
//     ],
//   },
//   {
//     label: "suppliers",
//     href: "/admin/suppliers",
//     icon: UsersIcon,  // Icon for the 'suppliers' menu
//     submenu: [
//       {
//         href: "/admin/suppliers",
//         icon: UsersIcon,
//         label: "suppliers",
//       },
//       {
//         href: "/admin/suppliers/supplier-products",
//         icon: DollarSignIcon,
//         label: "supplier products",
//       },
//       {
//         href: "/admin/suppliers/supplier-products-pricing",
//         icon: DollarSignIcon,
//         label: "supplier pricing list",
//       },

//     ],
//   },
//   {
//     label: "orders",
//     href: "/orders",
//     icon: ShoppingBagIcon,  // Icon for the 'suppliers' menu
//     submenu: [
//       {
//         href: "/orders",
//         icon: UsersIcon,
//         label: "orders",
//       },
//       {
//         href: "/admin/orders/order-products",
//         icon: ShoppingCartIcon,
//         label: "order products",
//       },

//     ],
//   },
// ];

// // const sidebarMenuLinks: SidebarMenuLink[] = [
// //   {
// //     label: "products",
// //     href: "/products",
// //     icon: Package2Icon,
// //     submenu: [
// //       {
// //         href: "/products",
// //         icon: PackageCheck,
// //         label: "product list",
// //       },
// //     ],
// //   },
// //   {
// //     label: "customers",
// //     href: "/customers",
// //     icon:  User2Icon,
// //     submenu: [
// //       {
// //         href: "/customer-list",
// //         icon: Archive,
// //         label: "customer list",
// //       },
// //       {
// //         href: "/customer-debt",
// //         icon: Archive,
// //         label: "customer debt",
// //       },
// //     ],
// //   },
// // ];

// interface SidebarLinkProps {
//   href: string;
//   icon: LucideIcon;
//   label: string;
//   isCollapsed: boolean;
// }

// const SidebarLink = ({
//   href,
//   icon: Icon,
//   label,
//   isCollapsed,
// }: SidebarLinkProps) => {
//   const pathname = usePathname();
//   const isActive =
//     pathname === href || (pathname === "/" && href === "/dashboard");

//   return (
//     <Link href={href}>
//       <div
//         className={`cursor-pointer flex items-center ${
//           isCollapsed ? "justify-center py-4" : "justify-start px-8 py-4"
//         }
//             hover:text-blue-500 hover:bg-blue-100 gap-3 transition-colors ${
//               isActive ? "bg-gray-200 text-white" : ""
//             }
//           }`}
//       >
//         <Icon className="w-6 h-6 !text-gray-700" />

//         <span
//           className={`${
//             isCollapsed ? "hidden" : "block"
//           } font-medium text-gray-700`}
//         >
//           {label}
//         </span>
//       </div>
//     </Link>
//   );
// };

// const SidebarCollpase: React.FC = () => {
//   const isSidebarCollapsed = useAppSelector(
//     (state) => state.global.isSidebarCollapsed
//   );

//   return (
//     <>
//       <div className="py-4 space-y-2">
//       {sidebarMenuLinks.map((data, index) => (
//         <CollapseDefault
//           key={index}
//           label={data.label}
//           isCollapsed={isSidebarCollapsed}
//           href={data.href}
//           Icon={data.icon}
//         >
//           {data.submenu.map((subMenu, key) => (
//             <div  className="px-2 py-1 hover:bg-gray-100 rounded-lg transition-all duration-200" key={key}>
//             <SidebarLink
//               href={subMenu.href}
//               icon={subMenu.icon}
//               label={subMenu.label}
//               isCollapsed={isSidebarCollapsed}
//               key={key}
//             />
//             </div>
//           ))}
//         </CollapseDefault>
//       ))}
//       </div>
//     </>
//   );
// };

// export default SidebarCollpase;

// ================= starting of the changes ==========================================

import React from 'react';
import CollapseDefault from '.';
import { SidebarMenuLink } from '@/app/(components)/Button/Interfaces/index';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppSelector } from '@/app/redux/redux';

import { LucideIcon, Archive, Package2Icon, ShoppingBagIcon, UsersIcon, TagIcon, BoxIcon, Circle } from 'lucide-react';

const sidebarMenuLinks: SidebarMenuLink[] = [
  {
    label: 'products',
    href: '/admin/products',
    icon: Package2Icon,
    submenu: [
      {
        href: '/admin/products',
        icon: Circle,
        label: 'products'
      },
      {
        href: '/admin/product-units',
        icon: Circle,
        label: 'product units list'
      }
    ]
  },
  {
    label: 'inventory',
    href: '/admin/inventory',
    icon: Archive,
    submenu: [
      {
        href: '/admin/inventory',
        icon: Circle,
        label: 'inventory'
      },
      {
        href: '/admin/inventory/restock-inventory',
        icon: Circle,
        label: 'restock inventory'
      },
      {
        href: '/admin/inventory/product-pricing',
        icon: Circle,
        label: 'product-pricing'
      },
      {
        href: '/admin/inventory/inventory-insights',
        icon: Circle,
        label: 'inventory-insights'
      },
      {
        href: '/admin/inventory/inventory-pricing-overview',
        icon: Circle,
        label: 'inventory-pricing-overview'
      }
    ]
  },
  {
    label: 'units',
    href: '/admin/units',
    icon: BoxIcon,
    submenu: [
      {
        href: '/admin/units',
        icon: Circle,
        label: 'units'
      }
    ]
  },
  {
    label: 'categories',
    href: '/admin/categories',
    icon: TagIcon,
    submenu: [
      {
        href: '/admin/categories',
        icon: Circle,
        label: 'category list'
      },
      {
        href: '/admin/categories/subcategories',
        icon: Circle,
        label: 'sub category'
      }
    ]
  },
  {
    label: 'suppliers',
    href: '/admin/suppliers',
    icon: UsersIcon,
    submenu: [
      {
        href: '/admin/suppliers',
        icon: Circle,
        label: 'suppliers'
      },
      {
        href: '/admin/suppliers/supplier-products',
        icon: Circle,
        label: 'supplier products'
      },
      {
        href: '/admin/suppliers/supplier-products-pricing',
        icon: Circle,
        label: 'supplier pricing list'
      }
    ]
  },
  {
    label: 'orders',
    href: '/admin/orders',
    icon: ShoppingBagIcon,
    submenu: [
      {
        href: '/admin/orders',
        icon: Circle,
        label: 'orders'
      },
      {
        href: '/admin/orders/order-products',
        icon: Circle,
        label: 'order products'
      }
    ]
  }
];

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isCollapsed: boolean;
}

const SidebarLink = ({ href, icon: Icon, label, isCollapsed }: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href || (pathname === '/' && href === '/dashboard');

  return (
    <Link href={href}>
      <div
        className={`cursor-pointer flex items-center  ${
          isCollapsed ? 'justify-center py-4' : 'justify-start px-14 py-4'
        } hover:text-blue-600  gap-3 transition-all duration-200 transform hover:scale-105 ${isActive ? ' text-blue-200' : ''}`}
      >
        {/* className="w-6 h-6 text-gray-700"  */}
        <Icon size={8} />

        <span className={`${isCollapsed ? 'hidden' : 'block'} font-medium hover:text-blue-300`}>{label}</span>
      </div>
    </Link>
  );
};

const SidebarCollpase: React.FC = () => {
  const isSidebarCollapsed = useAppSelector((state) => state.global.isSidebarCollapsed);

  return (
    <div className="py-4 space-y-2">
      {sidebarMenuLinks.map((data, index) => (
        <CollapseDefault key={index} label={data.label} isCollapsed={isSidebarCollapsed} href={data.href} Icon={data.icon}>
          <div className="bg-gray-50 rounded-sm  ">
            {data.submenu.map((subMenu, key) => (
              <div className="px-2 py-1 bg-black  rounded-lg transition-all duration-200 transform hover:scale-105" key={key}>
                <SidebarLink href={subMenu.href} icon={subMenu.icon} label={subMenu.label} isCollapsed={isSidebarCollapsed} key={key} />
              </div>
            ))}
          </div>
        </CollapseDefault>
      ))}
    </div>
  );
};

export default SidebarCollpase;

// =========================================begining of what we don't want=====================

// import React from "react";
// import CollapseDefault from ".";
// import { SidebarMenuLink } from "@/app/(components)/Button/Interfaces/index";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useAppSelector } from "@/app/redux/redux";

// import {
//   LucideIcon,
//   Package2Icon,
//   PackageCheck,
//   ShoppingBagIcon,
//   ShoppingCartIcon,
//   UsersIcon,
//   TagIcon,
//   DollarSignIcon,
//   BoxIcon,
//   TractorIcon,  // Add a farming or warehouse-specific icon
//   // Use agricultural related icons
// } from "lucide-react";

// const sidebarMenuLinks: SidebarMenuLink[] = [
//   {
//     label: "Animal Feed Products",
//     href: "/admin/animal-feeds",
//     icon: Package2Icon,
//     submenu: [
//       { href: "/admin/animal-feeds", icon: PackageCheck, label: "Animal Feed List" },
//       { href: "/admin/feed-types", icon: BoxIcon, label: "Feed Types" },
//     ],
//   },
//   {
//     label: "Inventory",
//     href: "/admin/inventory",
//     icon: TractorIcon,  // A more warehouse-like or agricultural icon
//     submenu: [
//       { href: "/admin/inventory", icon: TractorIcon, label: "Inventory Overview" },
//       { href: "/admin/inventory/feed-pricing", icon: DollarSignIcon, label: "Feed Pricing" },
//     ],
//   },
//   {
//     label: "Units & Stock",
//     href: "/admin/units",
//     icon: BoxIcon,
//     submenu: [{ href: "/admin/units", icon: BoxIcon, label: "Units Overview" }],
//   },
//   {
//     label: "Categories",
//     href: "/admin/categories",
//     icon: TagIcon,
//     submenu: [
//       { href: "/admin/categories", icon: TagIcon, label: "Categories List" },
//       { href: "/admin/categories/subcategories", icon: TagIcon, label: "Subcategories" },
//     ],
//   },
//   {
//     label: "Suppliers",
//     href: "/admin/suppliers",
//     icon: UsersIcon,
//     submenu: [
//       { href: "/admin/suppliers", icon: UsersIcon, label: "Suppliers List" },
//       { href: "/admin/suppliers/supplier-products", icon: DollarSignIcon, label: "Supplier Products" },
//     ],
//   },
//   {
//     label: "Orders",
//     href: "/orders",
//     icon: ShoppingBagIcon,
//     submenu: [
//       { href: "/orders", icon: UsersIcon, label: "Orders Overview" },
//       { href: "/admin/orders/order-products", icon: ShoppingCartIcon, label: "Order Products" },
//     ],
//   },
// ];

// interface SidebarLinkProps {
//   href: string;
//   icon: LucideIcon;
//   label: string;
//   isCollapsed: boolean;
// }

// const SidebarLink = ({
//   href,
//   icon: Icon,
//   label,
//   isCollapsed,
// }: SidebarLinkProps) => {
//   const pathname = usePathname();
//   const isActive =
//     pathname === href || (pathname === "/" && href === "/dashboard");

//   return (
//     <Link href={href}>
//       <div
//         className={`cursor-pointer flex items-center gap-3 py-3 px-6 rounded-lg transition-colors duration-200 hover:bg-yellow-100 hover:text-green-700 ${
//           isActive ? "bg-green-600 text-white" : "text-gray-700"
//         }`}
//       >
//         <Icon className="w-6 h-6 text-green-700" />
//         <span
//           className={`${
//             isCollapsed ? "hidden" : "block"
//           } font-semibold text-sm sm:text-base`}
//         >
//           {label}
//         </span>
//       </div>
//     </Link>
//   );
// };

// const SidebarCollpase: React.FC = () => {
//   const isSidebarCollapsed = useAppSelector((state) => state.global.isSidebarCollapsed);

//   return (
//     <div className="py-4 space-y-4 bg-brown-50">
//       {sidebarMenuLinks.map((data, index) => (
//         <div key={index}>
//           {/* Parent Link */}
//           <CollapseDefault
//             label={data.label}
//             isCollapsed={isSidebarCollapsed}
//             href={data.href}
//             Icon={data.icon}
//           >
//             {data.submenu.map((subMenu, key) => (
//               <div
//                 key={key}
//                 className="pl-8 py-1 hover:bg-gray-100 rounded-lg transition-all duration-200"
//               >
//                 {/* Child Link */}
//                 <SidebarLink
//                   href={subMenu.href}
//                   icon={subMenu.icon}
//                   label={subMenu.label}
//                   isCollapsed={isSidebarCollapsed}
//                 />
//               </div>
//             ))}
//           </CollapseDefault>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default SidebarCollpase;

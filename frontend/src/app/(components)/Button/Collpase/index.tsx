'use client'
import React from "react";
import {
  Collapse,
} from "@material-tailwind/react";

import {  LucideIcon, ChevronDown, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
// import {SidebarMenuLink} from '@/app/(components)/Button/Interfaces/index'

//Type definition for children
type MyComponentProps = {

    children: React.ReactNode;
    label: string;
    isCollapsed: boolean;
    href: string,
    Icon: LucideIcon;
  };

 
const CollapseDefault: React.FC<MyComponentProps> = ({label,children, isCollapsed,href,  Icon }) =>{
    const [open, setOpen] = React.useState(false);
    const pathname = usePathname();
    const isActive =
      pathname === href || (pathname === "/" && href === "/dashboard");
  const toggleOpen = () => setOpen((cur) => !cur);

 
  return (
    <>
    <div>
      <div
        className={`cursor-pointer flex items-center ${
          isCollapsed ? "justify-center py-4" : "justify-between px-8 py-4"
        }
            hover:text-blue-500 hover:bg-blue-100 gap-3 transition-colors ${
              isActive ? "bg-blue-200 text-white" : ""
            }
          }`}
          onClick={toggleOpen}
      >
        <span className={`cursor-pointer flex justify-start`} >
        <Icon className="w-6 h-6 !text-gray-700"  />

        <span
          className={`${
            isCollapsed ? "hidden" : "block"
          } font-medium text-gray-700 mx-4`}
        >
          {label}
        </span>
        </span>
        <span
          className={`${
            isCollapsed ? "hidden" : "block"
          } font-medium text-gray-700`}
        >
            {open ?  <ChevronDown /> : <ChevronRight /> }           
           
        </span>
      </div>
    </div>
      {/* <Button onClick={toggleOpen} style={{backgroundColor:'red', width:'100%'}}>{label}</Button> */}
      <Collapse open={open}>
      {children}
      </Collapse>
    </>
  );
}

export default CollapseDefault

// export default function CollapseDefaults({children}: React.ReactNode) {
//   const [open, setOpen] = React.useState(false);
 
//   const toggleOpen = () => setOpen((cur) => !cur);
 
//   return (
//     <>
//       <Button onClick={toggleOpen} style={{backgroundColor:'red'}}>Open Collapse</Button>
//       <Collapse open={open}>
//         {children}
//       </Collapse>
//     </>
//   );
// }
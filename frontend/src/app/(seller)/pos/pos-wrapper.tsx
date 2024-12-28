// "use client";
// // import Navbar from "@/app/(components)/Navbar";
// // import Sidebar from "@/app/(components)/Sidebar/Index";
// import StoreProvider, { useAppSelector } from "@/app/redux/redux";
// // import { Suspense } from "react";
// // import Loading from "./loading";
// import { useEffect } from "react";
// //Date Picker Imports - these should just be in your Context Provider
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

// // import { useGetCategoriesQuery } from "@/app/redux/api/inventory-api";
// // import { addCategory } from "@/app/redux/state/categories";
// // import { Category } from "./products/interface/products-Interface";



// type Props = { children: React.ReactNode };

// const PosLayout = ({ children }: { children: React.ReactNode }) => {
//   // const dispatch = useAppDispatch()
//   const isSidebarCollapsed = useAppSelector(
//     (state) => state.global.isSidebarCollapsed
//   );
//   const isDarkMode = useAppSelector((state) => state.global.isDarkMode);




//   useEffect(() => {
//     if (isDarkMode) {
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.add("light");
//     }
//   });

//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//     <div
//       className={`${
//         isDarkMode ? "dark" : "light"
//       } flex bg-gray-50 text-gray-900 w-full min-h-screen`}
//     >
//       <h3>sidebar will come here</h3>
//       {/* <Suspense fallback={<Loading />}> */}
//         <main
//           className={`flex flex-col w-full h-full py-7 px-9 bg-gray-50 ${
//             isSidebarCollapsed ? "md:pl-24" : "md:pl-72"
//           }`}
//         >
//          <h1>navbar will come here</h1>
//           {children}
//         </main> 
//       {/* </Suspense> */}
//     </div>
//     </LocalizationProvider>
//   );
// };

// const posWrapper = ({ children }: Props) => {
//   return (
//     <StoreProvider>
//       <PosLayout>{children}</PosLayout>
//     </StoreProvider>
//   );
// };

// export default posWrapper;




"use client";
import Navbar from "@/app/(components)/Navbar";
import Sidebar from "@/app/(components)/Sidebar/Index";
import StoreProvider, { useAppSelector } from "@/app/redux/redux";
// import { Suspense } from "react";
// import Loading from "./loading";
import { useEffect } from "react";
//Date Picker Imports - these should just be in your Context Provider
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

// import { useGetCategoriesQuery } from "@/app/redux/api/inventory-api";
// import { addCategory } from "@/app/redux/state/categories";
// import { Category } from "./products/interface/products-Interface";



type Props = { children: React.ReactNode };

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  // const dispatch = useAppDispatch()
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  // const { data: categories, isLoading, isError } = useGetCategoriesQuery();
  // if(categories) {
  //   let {data} = categories
  //   console.log('data is ', data)
  //   console.log('categories is ', categories.data)
  //   dispatch(addCategory(categories.data))
  // }
 




  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.add("light");
    }
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <div
      className={`${
        isDarkMode ? "dark" : "light"
      } flex bg-gray-50 text-gray-900 w-full min-h-screen`}
    >
      <Sidebar />
      {/* <Suspense fallback={<Loading />}> */}
        <main
          className={`flex flex-col w-full h-full py-7 px-9 bg-gray-50 ${
            isSidebarCollapsed ? "md:pl-24" : "md:pl-72"
          }`}
        >
          <Navbar />
          {children}
        </main> 
      {/* </Suspense> */}
    </div>
    </LocalizationProvider>
  );
};

const dashboardwrapper = ({ children }: Props) => {
  return (
    <StoreProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </StoreProvider>
  );
};

export default dashboardwrapper;
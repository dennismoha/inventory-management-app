'use client';

import 'react-toastify/dist/ReactToastify.css';
// import "../../app/globals.css";
import { ToastContainer } from 'react-toastify';
import React from 'react';

interface ToastProviderProps {
  children: React.ReactNode;
}

export default function ToastProvider({ children }: ToastProviderProps) {
  const contextClass = {
    success: 'bg-blue-600',
    error: 'bg-red-600',
    info: 'bg-gray-600',
    warning: 'bg-orange-400',
    default: 'bg-indigo-600',
    dark: 'bg-white-600 font-gray-300'
  };

  return (
    <>
      {children}
      <ToastContainer
        toastClassName={(context) =>
          contextClass[context?.type || 'default'] + ' relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer'
        }
        //@ts-expect-error bodyclassname does not exist in intrinsic attribute
        bodyClassName={() => 'text-sm font-white font-med block p-3'}
        position="bottom-left"
        autoClose={3000}
      />
    </>
  );
}

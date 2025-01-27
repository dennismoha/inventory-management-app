'use client';
import React, { useState, useEffect } from 'react';

import iconCart from '../assets/images/iconCart.png';

// import { useSelector, useDispatch } from 'react-redux'
import { toggleStatusTab } from '@/app/redux/state/cart';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/app/redux/redux';
import Image from 'next/image';

const Header = () => {
  const [totalQuantity, setTotalQuantity] = useState(0);
  const carts = useAppSelector((store) => store.cart.cartProducts);
  const dispatch = useAppDispatch();
  useEffect(() => {
    let total = 0;
    carts.forEach((item) => (total += item.quantity));
    setTotalQuantity(total);
  }, [carts]);
  const handleOpenTabCart = () => {
    dispatch(toggleStatusTab());
  };
  return (
    <header className="flex justify-between items-center mb-5">
      <Link href="/" className="text-xl font-semibold">
        Home.
      </Link>
      <div
        className="w-10 h-10 bg-gray-100 rounded-full
        flex justify-center items-center relative"
        onClick={handleOpenTabCart}
      >
        <Image src={iconCart} alt="" width="100" height="100" className="w-6" />
        <span
          className="absolute top-2/3 right-1/2 bg-red-500 text-white text-sm
            w-5 h-5 rounded-full flex justify-center items-center"
        >
          {totalQuantity}
        </span>
      </div>
    </header>
  );
};

export default Header;

'use client'
// import React, {useState, useEffect} from 'react' 
// import { products } from '../products';
// import { CheckoutProducts } from '../interface';


import { changeQuantity, cartProducts  } from '@/app/redux/state/cart';
import { useAppDispatch } from '@/app/redux/redux';
import Image from 'next/image';
import imageProduct8 from '../assets/images/8.png' 

type data = {
    data: cartProducts
}


const CartItem: React.FC<data> = (props) => {
    const {
        inventoryId,
        // supplier_products_id,
        // product_weight,
        stock_quantity,
        // reorder_level,
        // last_restocked,
        // unit_id,
        // created_at,
        // updated_at,
        // softDelete,
        status,
        // supplierProduct,
        // unit,
        quantity,
        productName,
        price,
      } = props.data;
    // const [detail, setDetail] = useState<CheckoutProducts>();
    const dispatch = useAppDispatch();
    // useEffect(() => {
    //     const findDetail = products.filter(product => product.inventoryId === inventoryId)[0];
    //     setDetail(findDetail);
    // }, [inventoryId])
    const handleMinusQuantity = () => {
        dispatch(changeQuantity({
            inventoryId: inventoryId,
            quantity: quantity - 1
        }));
    }
    const handlePlusQuantity = () => {
        dispatch(changeQuantity({
            inventoryId: inventoryId,
            quantity: quantity + 1
        }));
    }
  return (
    <div className='flex justify-between items-center bg-green-600 text-white p-2 border-b-2 border-green-700 gap-5 rounded-md'>
        <Image src={imageProduct8} height="100" width="100"alt="" className='w-12'/>
        <h3>{productName}</h3>
        <p>${price * quantity}</p>
        <div className='w-20 flex justify-between gap-2'>
            <button className='bg-gray-200 rounded-full w-6 h-6 text-teal-600' onClick={handleMinusQuantity}>-</button>
            <span>{quantity}</span>
            <button className='bg-gray-200 rounded-full w-6 h-6 text-teal-600' onClick={handlePlusQuantity}>+</button>
        </div>
    </div>
  )
}

export default CartItem
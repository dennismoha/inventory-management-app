import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/app/redux/redux';

// Select the cart state
const selectCart = (state: RootState) => state.cart;

export const selectProductIndexByInventoryId = (inventoryId: string) =>
  createSelector([selectCart], (cart) => {
    return cart.cartProducts.findIndex((item) => item.inventoryId === inventoryId);
  });

  export const selectProductByInventoryId = (inventoryId: string) =>
    createSelector([selectCart], (cart) => {
      return cart.cartProducts.find((item) => item.inventoryId === inventoryId);
    });
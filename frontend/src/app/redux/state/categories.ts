// categorySlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category, CategoryState } from '@/app/(admin)/admin/categories/interface/categories-interface';


// Initial state based on the CategoryState interface
const initialState: CategoryState = {
  categories: [], 
};

// Slice to manage categories and products
const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {

    // Action for adding a new category
    addCategory(state, action: PayloadAction<Category[]>) {
        console.log('action paylod is ', action.payload)
      state.categories.length = 0;
      state.categories = [...state.categories, ...action.payload]
    },
  },
});

// Export actions and reducer
export const { 
  addCategory,

  
} = categorySlice.actions;

export default categorySlice.reducer;

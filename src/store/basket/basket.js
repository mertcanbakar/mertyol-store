// src/reducers/basketSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    basketItems: []
}

const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        addBasket: (state, action) => {
            const { product, quantity } = action.payload;
      
            const existingItem = state.basketItems.find(item => item.id === product.id);
      
            if (existingItem) {
              existingItem.quantity += quantity || 1; // Artış miktarını veya varsayılan olarak 1'i ekleyin
            } else {
              state.basketItems.push({ ...product, quantity: quantity || 1 });
            }
        },
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const existingItem = state.basketItems.find(item => item.id === id);
      
            if (existingItem) {
              existingItem.quantity = quantity;
            }
          },
        removeItem: (state, action) => {
            state.basketItems = state.basketItems.filter(item => item.id !== action.payload);
        },
        clearBasket: (state) => {
            state.basketItems = [];
        },
        calculateTotal: (state) => {
            state.totalPrice = state.basketItems.reduce((total, item) => {
              return total + item.quantity * item.price;
            }, 0);
          }
    }
});

export const { addBasket, updateQuantity, removeItem, clearBasket, calculateTotal } = basketSlice.actions;
export default basketSlice.reducer;

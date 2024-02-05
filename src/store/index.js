import { configureStore } from '@reduxjs/toolkit';
import basket from './basket/basket';

const store = configureStore({
    reducer : {
        basket
    }
  
});

export default store;
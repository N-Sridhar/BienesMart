import {createSlice} from '@reduxjs/toolkit';

export const favSlice = createSlice({
  name: 'fav',
  initialState: {
    products: [],
  },
  reducers: {
    addFav: (state, action) => {
      state.products = [...state.products, action.payload];
    },
    updateFav: (state, action) => {
      const index = state.products.findIndex(
        (favItem) => favItem.id === action.payload.id
      );
      let newItems = state.products;
      newItems.splice(index, 1, action.payload);
      state.products = newItems;
    },
    removeFav: (state, action) => {
      const index = state.products.findIndex(
        (favItem) => favItem.id === action.payload
      );
      let newItems = state.products;
      newItems.splice(index, 1);
      state.products = newItems;
    },
  },
});

export const {addFav, updateFav, removeFav} = favSlice.actions;

export const getFav = (state) => state.fav.products;

export default favSlice.reducer;

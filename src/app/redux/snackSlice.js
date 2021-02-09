import {createSlice} from '@reduxjs/toolkit';

export const snackSlice = createSlice({
  name: 'snack',
  initialState: {
    slideIn: false,
    top: 0,
  },
  reducers: {
    setSlideIn: (state) => {
      state.slideIn = true;
    },
    removeSlideIn: (state) => {
      state.slideIn = false;
    },
  },
});

export const {setSlideIn, removeSlideIn} = snackSlice.actions;

export const selectSnack = (state) => state.snack.slideIn;

export default snackSlice.reducer;

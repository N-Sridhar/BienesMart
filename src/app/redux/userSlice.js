import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    info: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.info = action.payload;
    },
    removeUser: (state) => {
      state.info = null;
    },
  },
});

export const {setUser, removeUser} = userSlice.actions;

export const selectUser = (state) => state.user.info;

export default userSlice.reducer;

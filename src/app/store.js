import {configureStore} from '@reduxjs/toolkit';
import userReducer from './redux/userSlice';
import snackReducer from './redux/snackSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    snack: snackReducer,
  },
});

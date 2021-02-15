import {configureStore} from '@reduxjs/toolkit';
import userReducer from './redux/userSlice';
import snackReducer from './redux/snackSlice';
import favReducer from './redux/favSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    snack: snackReducer,
    fav: favReducer,
  },
});

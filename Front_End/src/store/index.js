import { configureStore } from '@reduxjs/toolkit';
import categoryRedu from '../reducers/category';
const store = configureStore({
  reducer: {
    category: categoryRedu.reducer
  },
});
export default store;

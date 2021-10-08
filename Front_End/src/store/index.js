import { configureStore } from '@reduxjs/toolkit';
import categoryRedu from '../reducers/category';
import historyRedu from '../reducers/historyBid';
const store = configureStore({
  reducer: {
    category: categoryRedu.reducer,
    history: historyRedu.reducer
  },
});
export default store;

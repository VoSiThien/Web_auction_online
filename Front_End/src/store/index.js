import { configureStore } from '@reduxjs/toolkit';
import categoryRedu from '../reducers/category';
import historyRedu from '../reducers/historyBid';
import authSlice from '../reducers/auth';
import selProductRedu from '../reducers/users/product';
import cartSlice from '../reducers/cart';
import langSlice from '../reducers/lang';
import uiSlice from '../reducers/ui';
import bidderRedu from '../reducers/users/bidder';
const store = configureStore({
  reducer: {
    category: categoryRedu.reducer,
    history: historyRedu.reducer,
    bidder: bidderRedu.reducer,
    
    auth: authSlice.reducer,
    selProduct: selProductRedu.reducer,

    ui: uiSlice.reducer,
    cart: cartSlice.reducer,
    lang: langSlice.reducer,
  },
});
export default store;

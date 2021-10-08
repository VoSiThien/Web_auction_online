import { configureStore } from '@reduxjs/toolkit';
import categoryRedu from '../reducers/category';
import historyRedu from '../reducers/historyBid';
import authSlice from '../reducers/auth';
// import adminAuthSlice from '../reducers/admin/auth';
import userProductSlice from '../reducers/users/product';
import cartSlice from '../reducers/cart';
import langSlice from '../reducers/lang';
import uiSlice from '../reducers/ui';
import bidProductRedu from '../reducers/users/bidder';
const store = configureStore({
  reducer: {
    category: categoryRedu.reducer,
    history: historyRedu.reducer,
    bidProduct: bidProductRedu.reducer,
    
    auth: authSlice.reducer,
    userProduct: userProductSlice.reducer,

    // adminAuth: adminAuthSlice.reducer,

    ui: uiSlice.reducer,
    cart: cartSlice.reducer,
    lang: langSlice.reducer,
  },
});
export default store;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import API from '../../apis/users/product';
import { getResponseError } from '../../helpers';

const initialState = {
  data: [],
  loading: false,
  modifyLoading: false,
};

export const getAuctionProductList = createAsyncThunk(
  'product/getAuctionProductList',
  async ({page, limit}, { rejectWithValue }) => {
    try {
      return (await API.getAuctionProductList({page, limit})).data.data;
    } catch (error) {
      return rejectWithValue(getResponseError(error));
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'product/DeleteProduct',
  async (productId, { rejectWithValue }) => {
    try {
      return (await API.deleteById(productId)).data;
    } catch (error) {
      return rejectWithValue(getResponseError(error));
    }
  }
);

export const postAuctionProduct = createAsyncThunk(
  'product/postAuctionProduct',
  async (formData, { rejectWithValue }) => {
    // console.log('Form data', formData);
    try {
      return (await API.postAuctionProduct(formData)).data;
    } catch (error) {
      return rejectWithValue(getResponseError(error));
    }
  }
);

const adminProductSlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: {
    [getAuctionProductList.pending]: (state) => {
      state.loading = true;
    },
    [getAuctionProductList.rejected]: (state) => {
      state.loading = false;
    },
    [getAuctionProductList.fulfilled]: (state, action) => {
      state.loading = false;
      const { productList } = action.payload;
      state.loading = false;
      state.data = productList;
      console.log(productList)
    },

    [postAuctionProduct.pending]: (state) => {
      state.modifyLoading = true;
    },
    [postAuctionProduct.rejected]: (state) => {
      state.modifyLoading = false;
    },
    [postAuctionProduct.fulfilled]: (state) => {
      state.modifyLoading = false;
    },
  },
});

export const adminProductActión = adminProductSlice.actions;
export default adminProductSlice;

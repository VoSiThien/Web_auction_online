import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import API from '../../apis/users/product-mgt';
import { getResponseError } from '../../helpers';

const initialState = {
  data: [],
  loading: false,
  modifyLoading: false,
};

export const getAuctionProductList = createAsyncThunk(
  'users/product/GetList',
  async (page, { rejectWithValue }) => {
    try {
      return (await API.getAuctionProductList(page, 10)).data.data;
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

export const addNewProduct = createAsyncThunk(
  'product/AddNewProduct',
  async (formData, { rejectWithValue }) => {
    console.log('Form data', formData);
    try {
      return (await API.addNew(formData)).data;
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
      state.data = action.payload.listProducts;
    },

    [addNewProduct.pending]: (state) => {
      state.modifyLoading = true;
    },
    [addNewProduct.rejected]: (state) => {
      state.modifyLoading = false;
    },
    [addNewProduct.fulfilled]: (state) => {
      state.modifyLoading = false;
    },
  },
});

export const adminProductActión = adminProductSlice.actions;
export default adminProductSlice;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import unauthorizedProductApi from '../apis/unauthorizedProduct';
import { getResponseError } from '../helpers';

const initialState = {//default state, this value will be gotten from use selector
  loading: false,
  data: []
};

export const getProductDetail = createAsyncThunk(
  'userProduct/GetDetail',
  async ({ id }, { rejectWithValue }) => {
    try {
      var value = (await unauthorizedProductApi.getProductDetail(id)).data;
      return value;
    } catch (error) {
      return rejectWithValue(getResponseError(error));
    }
  }
);

export const listProductAboutToEnd = createAsyncThunk(
  'userProduct/listProductAboutToEnd',
  async (_, { rejectWithValue }) => {//no parameter in reducer, put "_"
    try {
      var value = (await unauthorizedProductApi.listProductAboutToEnd()).data;
      return value;
    } catch (error) {
      return rejectWithValue(getResponseError(error));
    }
  }
);

export const listProductHighestPrice = createAsyncThunk(
  'userProduct/listProductHighestPrice',
  async (_, { rejectWithValue }) => {
    try {
      var value = (await unauthorizedProductApi.listProductHighestPrice()).data;
      return value;
    } catch (error) {
      return rejectWithValue(getResponseError(error));
    }
  }
);

export const listProductHighestBid = createAsyncThunk(
  'userProduct/listProductHighestBid',
  async (_, { rejectWithValue }) => {
    try {
      var value = (await unauthorizedProductApi.listProductHighestBid()).data;
      return value;
    } catch (error) {
      return rejectWithValue(getResponseError(error));
    }
  }
);
const unauthorizedProductSlice = createSlice({
  name: 'userProduct',
  initialState,
  extraReducers: {
    [getProductDetail.pending]: (state) => {
      state.loading = true;
    },
    [getProductDetail.rejected]: (state) => {
      state.loading = false;
    },
    [getProductDetail.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [listProductAboutToEnd.pending]: (state) => {
      state.loading = true;
    },
    [listProductAboutToEnd.rejected]: (state) => {
      state.loading = false;
    },
    [listProductAboutToEnd.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [listProductHighestPrice.pending]: (state) => {
      state.loading = true;
    },
    [listProductHighestPrice.rejected]: (state) => {
      state.loading = false;
    },
    [listProductHighestPrice.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [listProductHighestBid.pending]: (state) => {
      state.loading = true;
    },
    [listProductHighestBid.rejected]: (state) => {
      state.loading = false;
    },
    [listProductHighestBid.fulfilled]: (state, action) => {
      state.loading = false;
    },
  },
});
//export action to using redux hook
export const unauthorizedProduct = unauthorizedProductSlice.actions;
export default unauthorizedProductSlice;

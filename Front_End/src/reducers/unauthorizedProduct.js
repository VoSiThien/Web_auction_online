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
      var x = (await unauthorizedProductApi.getProductDetail(id)).data;
      return x;
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
  },
});
//phai export ca 2 thi store moi nhan duoc
export const unauthorizedProduct = unauthorizedProductSlice.actions;
export default unauthorizedProductSlice;

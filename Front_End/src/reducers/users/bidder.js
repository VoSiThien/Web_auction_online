import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import bidderApi from '../../apis/users/bidder';
import { getResponseError } from '../../helpers';

const initialState = {
  datas: [],
  loading: false,
};

export const bidProduct = createAsyncThunk(
  'history/Post',
  async ({priceBid, prodId}, { rejectWithValue }) => {
  try {
      const result = (await bidderApi.bidProduct({ priceBid, prodId }));
      return result.data;
  } catch (error) {
    return rejectWithValue(getResponseError(error));
  }
});

const bidProductSlice = createSlice({
  name: 'bidProduct',
  initialState,
  reducers: {},
  extraReducers: {
      [bidProduct.fulfilled]: (state, action) => {
        state.loading = false;
        state.datas = action.payload;
      },
  },
});

export const bidProductActions = bidProductSlice.actions;
export default bidProductSlice;

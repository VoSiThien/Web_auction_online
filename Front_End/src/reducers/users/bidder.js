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

export const bidAddWatchList = createAsyncThunk(
  'addWatchList/Post',
  async ({ prodId }, { rejectWithValue }) => {
  try {
      const result = (await bidderApi.bidAddWatchList({ prodId }));
      return result.data;
  } catch (error) {
    return rejectWithValue(getResponseError(error));
  }
});

export const bidDeleteWatchList = createAsyncThunk(
  'deleteWatchList/Post',
  async ({favId}, { rejectWithValue }) => {
  try {
      const result = (await bidderApi.bidDeleteWatchList({ favId }));
      return result.data;
  } catch (error) {
    return rejectWithValue(getResponseError(error));
  }
});

const bidderSlice = createSlice({
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

export const bidderActions = bidderSlice.actions;
export default bidderSlice;

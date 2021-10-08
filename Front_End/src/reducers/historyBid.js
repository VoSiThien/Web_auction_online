import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import historyApi from '../apis/historyBid';
import { getResponseError } from '../helpers';

const initialState = {
  data: [],
  loading: false,
};

export const getListHistory = createAsyncThunk(
  'history/Post',
  async ({page, limit, prodId, status}, { rejectWithValue }) => {
  try {
    return (await historyApi.getListHistory({page, limit, prodId, status})).data;
  } catch (error) {
    return rejectWithValue(getResponseError(error));
  }
});

export const confirmHistory = createAsyncThunk(
    'Confrim/Post',
    async ({hisId}, { rejectWithValue }) => {
    try {
        var check = await historyApi.confirmHistory({hisId});
        return check.data;
    } catch (error) {
      return rejectWithValue(getResponseError(error));
    }
});

export const cancelHistory = createAsyncThunk(
    'Cancel/Post',
    async ({hisId}, { rejectWithValue }) => {
    try {
        console.log('aa');
        var check = await historyApi.cancelHistory({hisId});
        console.log(check);
        return check.data;
    } catch (error) {
      return rejectWithValue(getResponseError(error));
    }
});

const historyBidSlice = createSlice({
  name: 'history',
  initialState,
  reducers: {},
  extraReducers: {
    [getListHistory.pending]: (state) => {
      state.loading = true;
    },
    [getListHistory.rejected]: (state) => {
      state.loading = false;
    },
    [getListHistory.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
  },
});

export const historyBidAccounts = historyBidSlice.actions;
export default historyBidSlice;

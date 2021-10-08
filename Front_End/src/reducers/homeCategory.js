import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import homeCategoryApi from '../apis/homeCategory';
import { getResponseError } from '../helpers';

const initialState = {
  data: [],
  loading: false,
};

export const getHomeCategory = createAsyncThunk(
  'homeCategory/GetList',
  async (_, { rejectWithValue }) => {
  try {
    const catList = (await homeCategoryApi.geHomepageCategory()).data
    return catList;
  } catch (error) {
    return rejectWithValue(getResponseError(error));
  }
});

const adminCategorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: {
    [getHomeCategory.pending]: (state) => {
      state.loading = true;
    },
    [getHomeCategory.rejected]: (state) => {
      state.loading = false;
    },
    [getHomeCategory.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
  },
});

export const adminCategoryActions = adminCategorySlice.actions;
export default adminCategorySlice;

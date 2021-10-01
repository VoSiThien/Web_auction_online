import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import categoryApi from '../apis/category';
import { getResponseError } from '../helpers';

const initialState = {
  data: [],
  loading: false,
};

export const getListCategory = createAsyncThunk(
  'category/Get',
  async ({page, limit}, { rejectWithValue }) => {
  try {
    const asd = (await categoryApi.getListCategory({page, limit})).data
    return asd;
  } catch (error) {
    return rejectWithValue(getResponseError(error));
  }
});

const adminCategorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: {
    [getListCategory.pending]: (state) => {
      state.loading = true;
    },
    [getListCategory.rejected]: (state) => {
      state.loading = false;
    },
    [getListCategory.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
  },
});

export const adminCategoryActions = adminCategorySlice.actions;
export default adminCategorySlice;

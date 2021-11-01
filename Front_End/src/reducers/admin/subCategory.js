import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import subCategoryAPI from '../../apis/admin/subCategory';
import { getResponseError } from '../../helpers';

const initialState = {
  userList: [],
  numPage: 1,
  loading: false,
  modifyLoading: false,
};



export const getListSubCategory = createAsyncThunk(
    'adminCategory/ListParent',
    async ({page, limit}, { rejectWithValue }) => {
    try {
      const subCategoryList = (await subCategoryAPI.getListCategory({page, limit})).data
      return subCategoryList;
    } catch (error) {
      return rejectWithValue(getResponseError(error));
    }
  });

const adminUserSlice = createSlice({
  name: 'adminCategory',
  initialState,
  reducers: {},
  extraReducers: {
    [getListSubCategory.pending]: (state) => {
      state.loading = true;
    },
    [getListSubCategory.rejected]: (state) => {
      state.loading = false;
    },
    [getListSubCategory.fulfilled]: (state, action) => {
      state.loading = false
      const { subCategoryList, totalPage  } = action.payload
      state.totalPage = totalPage
      state.subCategoryList = subCategoryList
    },
  },
});

export const adminUserActions = adminUserSlice.actions;
export default adminUserSlice;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import sellerApi from '../../apis/users/seller';
import { getResponseError } from '../../helpers';

const initialState = {
    seller: null,
    loading: false,
    erorr: null,
  };

export const getProfile = createAsyncThunk( 'seller/profile', async(_, {rejectWithValue}) => {
    try {
      const response = (await sellerApi.getProfile()).data.data;
      return response;
    } catch (error) {
      return rejectWithValue(getResponseError(error));
    }
});

const sellerSlice = createSlice({
    name: 'seller',
    initialState,
    reducers: {},
    extraReducers: {
      [getProfile.pending]: (state, action) => {
        state.loading = true;
      },
      [getProfile.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload
      },
      [getProfile.fulfilled]: (state, action) => {
        state.loading = false;
        state.seller = action.payload;
      },
    },
  });

  export const sellerActions = sellerSlice.actions;
  export default sellerSlice;
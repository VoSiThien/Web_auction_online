import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import profileApi from '../../apis/users/profile';
import { getResponseError } from '../../helpers';

const initialState = {
    data:[],
    loading: false,
    dataNewPass: []
  };

export const getProfile = createAsyncThunk( 'profile/get', async(_, {rejectWithValue}) => {
    try {
      const response = (await profileApi.getProfile()).data.data;
      return response;
    } catch (error) {
      return rejectWithValue(getResponseError(error));
    }
});

export const accNewPassword = createAsyncThunk(
    'profile/NewPassword',
    async ({ userId, newpassword, oldpassword }, { rejectWithValue }) => {
        try {
            const response = await await profileApi.accNewPassword({
                userId,
                newpassword,
                oldpassword
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(getResponseError(error));
        }
    }
);

export const accUpdateprofiles = createAsyncThunk(
    'profile/upadateProfile',
    async ({ email, fullName, birthday, phoneNumber }, { rejectWithValue }) => {
        try {
            const response = await await profileApi.accUpdateprofile({
                email, fullName, birthday, phoneNumber
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(getResponseError(error));
        }
    }
);

const profileSlice = createSlice({
    name: 'profile',
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
        state.data = action.payload;
      },
      [accNewPassword.pending]: (state, action) => {
        state.loading = true;
      },
      [accNewPassword.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload
      },
      [accNewPassword.fulfilled]: (state, action) => {
        state.loading = false;
        state.dataNewPass = action.payload;
      },
      [accUpdateprofiles.pending]: (state, action) => {
        state.loading = true;
      },
      [accUpdateprofiles.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload
      },
      [accUpdateprofiles.fulfilled]: (state, action) => {
        state.loading = false;
      },
    },
  });

  export const profileActions = profileSlice.actions;
  export default profileSlice;
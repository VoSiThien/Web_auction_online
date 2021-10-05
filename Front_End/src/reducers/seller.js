import { createAsyncThunk } from '@reduxjs/toolkit';
import sellerApi from '../apis/seller';
import { getResponseError } from '../helpers';

export const getProfile = createAsyncThunk(
    'seller/profile',
    async() => {
        try {
            return (await sellerApi.getProfile()).data.data;
        } catch (error) {
            // return rejectWithValue(getResponseError(error));
        }
    }
);

/**
 * Redux authentication used to force log the user out on expiration
 */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userData: {},
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUserData: (state, action) => {
      state.userData = { ...state.userData, ...action.payload };
    },

  },
});

export const { updateUserData } = userSlice.actions;

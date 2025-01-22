import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UpwardRunningAuthToken } from '@tallo/store/upwardapi';
import { AuthAppStore, AuthState } from '../types/authTypes';

const initialState: AuthState = {
  data: null,
  forcedLogout: false,
  userAuthorized: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState as AuthState,
  reducers: {
    setToken: (state, action: PayloadAction<UpwardRunningAuthToken>) => {
      state.data = { ...state.data, ...action.payload };
    },
    select: (state, action) => {
      state.data = { ...state, ...action.payload };
    },
    setForcedLogout: (state, action: PayloadAction<boolean>) => {
      state.forcedLogout = action.payload;
    },
    setUserAuthorized: (state, action: PayloadAction<boolean>) => {
      state.userAuthorized = action.payload;
    },
  },
});

export const tokenSelector = (state: AuthAppStore) => state.auth.data?.upwrJWToken;
export const userAuthorizedSelector = (state: AuthAppStore) => state.auth.userAuthorized;
export const { select, setToken, setForcedLogout, setUserAuthorized } = authSlice.actions;

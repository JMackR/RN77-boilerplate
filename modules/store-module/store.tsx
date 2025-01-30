import { emptySplitApi as upwardapi } from '@tallo/store/emptyApi';
import { TypedUseSelectorHook, useDispatch, useSelector, useStore } from 'react-redux';

import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { authSlice } from '@tallo/authentication/auth-module';


import { rememberReducer } from 'redux-remember';

export const emptySplitApi = upwardapi(process.env.NEXT_PUBLIC_BASE_URL as string);
const rootReducer = rememberReducer(
  combineSlices(
    authSlice,

    emptySplitApi,
  ),
);

export const makeStore = ({ enhancers }) => {
  return configureStore({
    reducer: rootReducer,
    //middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(emptySplitApi.middleware).concat(loadingMiddleware).concat(errorMiddleware),
    enhancers,
  });
};
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;

export type AppDispatch = AppStore['dispatch'];
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore = useStore.withTypes<AppStore>();

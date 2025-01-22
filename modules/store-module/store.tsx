import { emptySplitApi as upwardapi } from '@tallo/store/emptyApi';
import { TypedUseSelectorHook, useDispatch, useSelector, useStore } from 'react-redux';

import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { authSlice, partnerChallengeCheckoutSlice, partnerChallengeInfoSlice, signupSlice } from '@tallo/authentication/auth-module';
import { modalSlice } from '@tallo/navigation/navigation';
import { trainingSlice, weeklyWorkoutSlice } from '@tallo/training/index';
import { userSlice } from '@tallo/user/index';
import { errorMiddleware } from './error-middleware';
import { activityDetail } from '@tallo/stats/stats-module';
import { rememberReducer } from 'redux-remember';
import { loadingMiddleware } from './loading-middleware';
import { asyncLoading } from './loading.slice';
import { errorSliceExt } from '@tallo/store/error-sliceExt';
export const emptySplitApi = upwardapi(process.env.NEXT_PUBLIC_BASE_URL as string);
const rootReducer = rememberReducer(
  combineSlices(
    asyncLoading,
    modalSlice,
    authSlice,
    signupSlice,
    partnerChallengeInfoSlice,
    partnerChallengeCheckoutSlice,
    userSlice,
    trainingSlice,
    weeklyWorkoutSlice,
    activityDetail,
    errorSliceExt,
    emptySplitApi,
  ),
);

export const makeStore = ({ enhancers }) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(emptySplitApi.middleware).concat(loadingMiddleware).concat(errorMiddleware),
    enhancers,
  });
};
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;

export type AppDispatch = AppStore['dispatch'];
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore = useStore.withTypes<AppStore>();

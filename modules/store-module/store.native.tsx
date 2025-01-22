import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { authSlice } from '@tallo/authentication/auth-module';
import feedSlice from '@tallo/groups/src/redux/slices/feedSlice';
import globalFeedSlice from '@tallo/groups/src/redux/slices/globalfeedSlice';
import postDetailSlice from '@tallo/groups/src/redux/slices/postDetailSlice';
import uiSlice from '@tallo/groups/src/redux/slices/uiSlice';
import { emptySplitApi as upwardapi } from '@tallo/store/emptyApi';
import { trainingSlice, weeklyWorkoutSlice } from '@tallo/training/index.native';
import { userSlice } from '@tallo/user';
import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { rememberEnhancer, rememberReducer } from 'redux-remember';
import { errorMiddleware } from './error-middleware';
import Config from 'react-native-config';
const rememberedKeys = ['auth', 'globalFeed', 'postDetail', 'feed', 'ui'];
export const emptySplitApi = upwardapi(Config.BASE_URL as string);
const rootReducer = rememberReducer(
  combineSlices(authSlice, userSlice, trainingSlice, weeklyWorkoutSlice, globalFeedSlice, postDetailSlice, feedSlice, uiSlice, emptySplitApi),
);
// MAKE STORE HAS TO STAY IN THIS FILE AND ALL SLICES ARE IMPORTED HERE DO NOT MOVE- AR
const makeStore = () => {
  const configured = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        immutableCheck: { warnAfter: 128 },
        serializableCheck: { warnAfter: 128 },
      })
        .concat(emptySplitApi.middleware)
        .concat(errorMiddleware),
    enhancers: (getDefaultEnhancers) => getDefaultEnhancers().concat(rememberEnhancer(AsyncStorage, rememberedKeys)),
  });
  return configured;
};
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;

export type AppDispatch = AppStore['dispatch'];
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const store = makeStore();

  return (
    <Provider store={store}>
      <>{children}</>
    </Provider>
  );
};

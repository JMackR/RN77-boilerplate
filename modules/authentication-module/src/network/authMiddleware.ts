import { Buffer } from 'buffer';
export const encodeBase64 = (data) => {
  return Buffer.from(data).toString('base64');
};
export const decodeBase64 = (data) => {
  return Buffer.from(data, 'base64').toString('ascii');
};

import { Middleware } from '@reduxjs/toolkit';
import { RootState } from '@tallo/store';
//import { setLoading } from './loading.slice';

const loaders: string[] = [];
export const authMiddleware: Middleware =
  ({ dispatch, getState }) =>
  (next) =>
  async (action: any) => {
    console.log('ACTION:', action, 'getState().auth.data?.upwrJWToken', getState().auth.data?.upwrJWToken);
    if (!getState().auth.data?.upwrJWToken && action.type === 'asyncloading/setLoading') {
      //const token = getState().auth.data.upwrJWToken;

      //const decodedToken = decodeBase64(token.split('.')[1]);
      //const tokenData = JSON.parse(decodedToken);
      //if (
      //  tokenData.exp <= Math.floor(Date.now() / 1000) &&
      //  !(getState() as RootState).auth.data?.hasUpwardRunningAccount
      //) {
      //console.log('TIME HAS EXPIRED NULL TOKEN:', emptySplitApi.endpoints);
      console.log('ARE WE EVEN GETTING HERE:');
      //const result = await dispatch(emptySplitApi.endpoints.getApiAuthGuesttoken.initiate(undefined));
      //result.unsubscribe();
      //}
    }
    if (action.type !== 'auth/setToken' && getState().auth.data?.upwrJWToken) {
      const token = getState().auth.data.upwrJWToken;

      const decodedToken = decodeBase64(token.split('.')[1]);
      const tokenData = JSON.parse(decodedToken);
      //  console.log(
      //    //  token,
      //    'tokenData.exp',
      //    tokenData.exp,
      //    'Date.now() / 1000',
      //    Math.floor(Date.now() / 1000),
      //  );
      if (
        tokenData.exp <= Math.floor(Date.now() / 1000) &&
        !(getState() as RootState).auth.data?.hasUpwardRunningAccount
      ) {
        //console.log('tokenData::', { tokenDataExp: fromUnixTime(tokenData.exp), now: fromUnixTime(Date.now() / 1000) });
        //const result = dispatch(emptySplitApi.endpoints.getApiAuthGuesttoken.initiate(undefined));
        //dispatch(setForcedLogout(true));
        //dispatch(setLoading({ key: 'auth', value: false }));
        //result.unsubscribe();
        //dispatch(setToken({ upwrJWToken: null, hasUpwardRunningAccount: false, hasUpwardRunningSubscription: false }));
        //next(action);
      }
    }
    next(action);
    //if (action?.meta?.requestStatus) {
    //  if (action?.meta?.requestStatus === ) {
    //    loaders.push(action.meta.arg.endpointName);
    //    //dispatch();
    //  }

    //}
  };

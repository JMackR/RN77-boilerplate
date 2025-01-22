import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { ApiTags } from './types';
import Config from 'react-native-config';
import { logApiError } from './api-error-handler';

const baseUrl = Config.BASE_URL;
// Create our baseQuery instance
const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers) => {
    // By default, if we have a token in the store, let's use that for authenticated requests
    // const token = (getState() as RootState).auth.token
    // if (token) {
    //   headers.set('authentication', `Bearer ${token}`)
    // }

    return headers;
  },
  fetchFn: async (input, init) => {
    try {
      // Handle WebSocket connections
      if (typeof input === 'string' && (input.startsWith('ws:') || input.startsWith('wss:'))) {
        const wsOptions = ['agent', 'perMessageDeflate', 'pfx', 'key', 'passphrase', 'cert', 'ca', 'ciphers', 'rejectUnauthorized'];
        
        // Move WebSocket options to headers
        const headers = new Headers(init.headers);
        wsOptions.forEach(option => {
          if (init[option] !== undefined) {
            headers.set(`ws-${option}`, 'null');
            delete init[option];
          }
        });
        
        // Create new init object with updated headers
        const wsInit = {
          ...init,
          headers
        };
        
        return fetch(input, wsInit).catch(error => {
          logApiError({ error: error.message }, 'WebSocket');
          throw error;
        });
      }
      
      const response = await fetch(input, init);
      if (!response.ok) {
        logApiError(
          { 
            status: response.status,
            error: await response.text()
          },
          typeof input === 'string' ? input : input.url
        );
      }
      return response;
    } catch (error) {
      logApiError(
        { error: error.message },
        typeof input === 'string' ? input : input.url
      );
      throw error;
    }
  },
});
// Configure retry with better error handling
const baseQueryWithRetry = retry(baseQuery, { 
  maxRetries: 3,
  backoff: (attempt, error) => {
    const delay = Math.min(1000 * (2 ** attempt), 30000);
    console.warn(`Retry attempt ${attempt + 1} after ${delay}ms due to:`, error);
    return delay;
  },
});

/**
 * Create a base API to inject endpoints into elsewhere.
 * Components using this API should import from the injected site,
 * in order to get the appropriate types,
 * and to ensure that the file injecting the endpoints is loaded
 */
export const api = createApi({
  /**
   * `reducerPath` is optional and will not be required by most users.
   * This is useful if you have multiple API definitions,
   * e.g. where each has a different domain, with no interaction between endpoints.
   * Otherwise, a single API definition should be used in order to support tag invalidation,
   * among other features
   */
  reducerPath: 'splitApi',
  /**
   * A bare bones base query would just be `baseQuery: fetchBaseQuery({ baseUrl: '/' })`
   */
  baseQuery: baseQueryWithRetry,
  /**
   * Tag types must be defined in the original API definition
   * for any tags that would be provided by injected endpoints
   */
  tagTypes: Object.values(ApiTags),
  /**
   * This api has endpoints injected in adjacent files,
   * which is why no endpoints are shown below.
   * If you want all endpoints defined in the same file, they could be included here instead
   */
  endpoints: () => ({}),
  keepUnusedDataFor: 60, // Keep unused data for 60 seconds
  refetchOnMountOrArgChange: false, // Disable automatic refetching
  refetchOnFocus: false, // Disable refetch on window focus
  refetchOnReconnect: true, // Only refetch on reconnection
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat((store) => (next) => (action) => {
      if (action.type?.endsWith('/rejected')) {
        const error = action.error;
        console.error('API Error:', {
          type: action.type,
          error: error?.message || 'Unknown error',
          stack: error?.stack,
          status: error?.status,
          data: action.payload
        });

        // Handle specific error types
        if (error?.name === 'AbortError') {
          console.warn('Request was aborted');
          return next(action);
        }

        // Handle timeout errors
        if (error?.message?.includes('timeout')) {
          console.warn('Request timed out');
          return next(action);
        }

        // Handle network errors
        if (error?.message?.includes('Network') || error?.message?.includes('Failed to fetch')) {
          console.warn('Network error occurred');
          return next(action);
        }
      }
      return next(action);
    }),
});

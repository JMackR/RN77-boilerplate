import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export const logApiError = (
  error: FetchBaseQueryError | SerializedError | undefined,
  apiName: string
) => {
  if (!error) return;

  const errorDetails = {
    timestamp: new Date().toISOString(),
    apiName,
    type: 'FetchBaseQueryError' in error ? 'FetchBaseQueryError' : 'SerializedError',
    status: 'status' in error ? error.status : 'unknown',
    message: 'error' in error ? error.error : error.message || 'Unknown error',
  };

  console.error(`API Connection Error [${apiName}]:`, errorDetails);
  return errorDetails;
};

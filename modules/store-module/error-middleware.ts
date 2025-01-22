import { Middleware, isRejectedWithValue } from '@reduxjs/toolkit';
import { logApiError } from './api-error-handler';
import { setError } from './error-sliceExt'; // Action to set the error in the store
import { Int32 } from 'react-native/Libraries/Types/CodegenTypes';

const authEndpoints = [
  'bioAuthenticate',
  'checkDeviceExists',
  'devSignIn',
  'getPassword',
  'registerUserEmail',
  'resetPhoneNumber',
  'setBiometricEnrolled',
  'signIn',
  'userLookup',
  'checkPhoneExists',
  'addDocuments',
];

const showPopupEndpoints = [
  'getApiPartnerChallengeRegistrationInfoByUpwardChallengeId',
  'usePostApiAuthUisRequestnewuserMutation',
  'usePostApiAuthLoginMutation',
  'usePostApiAuthPasswordresetMutation',
  'usePostApiStripeNewPartnerChallengeSessionMutation',
  'usePostApiAuthUisRequestnewuserMutation',
  'createPartnerChallengeCheckoutSessionRequest',
  'usePostApiAuthCheckExistsMutation',
  'postApiAuthCheckExists',
  'currentUserInfo',
  'IndividualAddressChangeRequest',
  'IndividualPhoneChangeRequest',
  'PartnerChallengeParticipantProductChangeRequest',
  'PartnerChallengeParticipantUdfValueChangeRequest',
  'PartnerChallengeUdfDefinitionInfoRead',
  'useGetApiContentLegalQuery',
  'useGetApiUserCurrentUserInfoQuery',
  'usePostApiAuthCheckExistsMutation',
  'usePostApiAuthUisRequestnewuserMutation',
  'getApiStatsLog',
  'getApiStats',
  'getApiChallengeWeeklyoverview',

  // Add other endpoints here if you want to show an error popup...
  //need to add the error-dialog.tsx to your layout page.  See Registration\layout.tsx for an example
];

const redirectEndpoints = [
  'getApiPartnerChallengeRegistrationInfoByUpwardChallengeId2',
  //these are endpoints that you just want to redirect directly to the /errors page.  this is not a popup.
];

const ignoreEndpoints = [
  'getApiPartnerChallengeRegistrationInfoByUpwardChallengeId2',
  //these are end points that you only want to console.log.
];

// Configuration for error threshold and time period
//const ERROR_THRESHOLD = 5; // Max number of errors allowed in the time window
const ERROR_TIME_PERIOD = 60000; // Time window in milliseconds (e.g., 1 minute = 60000ms)
//const STATUS_CODE_LIMIT = 2; // Set the limit for unique status codes per endpoint

const trackErrorOccurrences = (endpoint: string) => {
  const errorData = JSON.parse(localStorage.getItem(endpoint) || '[]');
  const currentTime = Date.now();
  // Add the current error with timestamp (before filtering)
  errorData.push({ timestamp: currentTime });

  // Filter errors to keep only those within the time window
  const filteredErrors = errorData.filter((error: { timestamp: number }) => currentTime - error.timestamp < ERROR_TIME_PERIOD);

  // Update local storage with the filtered errors
  localStorage.setItem(endpoint, JSON.stringify(filteredErrors));

  //there's a bug in the tracking error occurrence where it won't refresh after redirecting...
  //so for now... Will troubleshoot later.
  //Just going to set this to return false and not keep track of # of occurences.
  return false;
  // Return whether the threshold is exceeded
  //return filteredErrors.length > ERROR_THRESHOLD;
};

//adding this function because we need to ignore a 401 error on the initial occurent
//since the code will try and get a new token.
const trackStatusAndEndpoints = (status: number, endpoint: string) => {
  // Define the structure of the parsed object

  // Parse and type the localStorage data
  const rawData = JSON.parse(localStorage.getItem('statusCodes') || '{}');
  const statusData: { [key: string]: Set<number> } = Object.fromEntries(
    Object.entries(rawData).map(([key, value]) => [key, new Set(value as number[])])
  );

  if (!statusData[endpoint]) {
    statusData[endpoint] = new Set();
  }

  statusData[endpoint].add(status);

  //const uniqueStatusCodes = [...statusData[endpoint]];

  // Update local storage with the new set of status codes
  localStorage.setItem(
    'statusCodes',
    JSON.stringify(
      Object.fromEntries(
        Object.entries(statusData).map(([key, value]) => [key, [...value]])
      )
    )
  );

  // Return true if the count of unique status codes is less than the limit
  //there's a bug in the tracking error occurrence where it won't refresh after redirecting...
  //so for now... Will troubleshoot later.
  //Just going to set this to return false and not keep track of # of occurences.
  //return uniqueStatusCodes.length < STATUS_CODE_LIMIT;
  return true;
};

const handleError = ({
  dispatch,
  endpoint,
  status,
  errorDetails,
  redirectToErrorPage,
  showPopup,
  ignoreError,
}: {
  dispatch: any;
  endpoint: string;
  status: Int32;
  errorDetails: string;
  redirectToErrorPage: boolean;
  showPopup: boolean;
  ignoreError: boolean;
}) => {
  let errorMessage = '';
  let dialogTitle = '';

  switch (status) {
    case 401:
      errorMessage = 'Unauthorized access. Please check your credentials and try again.';
      dialogTitle = 'Unauthorized Error';
      break;
    case 403:
      errorMessage = 'Forbidden access. You do not have permission to access this resource.';
      dialogTitle = 'Forbidden Error';
      break;
    case 404:
      errorMessage = 'The requested resource was not found.';
      dialogTitle = 'Requested Resource Not Found';
      break;
    case 500:
    case 503:
    case 504:
      errorMessage = 'A server error occurred. Please try again later.';
      dialogTitle = 'Server Error';
      break;
    default:
      errorMessage = 'An unexpected error occurred. Please contact support.';
      dialogTitle = 'Unexpected Error';
      break;
  }

  if (showPopup && !ignoreError) {
    dispatch(setError({
      errorOccurred: true,
      redirectToErrorPage,
      errorMessage,
      dialogTitle,
      errorStatus: status,
      errorDetails,
    }));
  }
};

export const errorMiddleware: Middleware =
  ({ dispatch }) =>
    (next) =>
      (action: any) => {

        return next(action);
      };

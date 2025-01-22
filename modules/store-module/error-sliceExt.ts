import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Int32 } from 'react-native/Libraries/Types/CodegenTypes';

type ErrorState = {
  errorOccurred: boolean;
  redirectToErrorPage: boolean;
  errorMessage: string;
  dialogTitle: string;
  errorStatus: Int32,
  errorDetails: string,
};

const initialState: ErrorState = {
  errorOccurred: false,
  redirectToErrorPage: false,
  errorMessage: '',
  errorStatus: 0,
  errorDetails: '',
  dialogTitle: '',
};

export const errorSliceExt = createSlice({
  name: 'errorSliceExt',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<ErrorState>) => {
      state.errorOccurred = action.payload.errorOccurred;
      state.redirectToErrorPage = action.payload.redirectToErrorPage;
      state.errorMessage = action.payload.errorMessage;
      state.dialogTitle = action.payload.dialogTitle;
      state.errorStatus = action.payload.errorStatus;
      state.errorDetails = action.payload.errorDetails;
    },
    resetError: (state) => {
      state.errorOccurred = false;
      state.redirectToErrorPage = false;
      state.errorMessage = '';
      state.dialogTitle = '';
      state.errorStatus = 0;
      state.errorDetails = '';
    },
  },
});

export const { setError, resetError } = errorSliceExt.actions;
export default errorSliceExt.reducer;


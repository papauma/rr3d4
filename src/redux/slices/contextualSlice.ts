import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface ContextualInformation {
  errorMessage: string;
  successMessage: string;
  infoMessage: string;
  warningMessage: string;
  showLoading: boolean;
  showBackground: boolean;
  showNearStops: boolean;
}

const initialState = {
  contextualInformation: {
    errorMessage: '',
    successMessage: '',
    infoMessage: '',
    warningMessage: '',
    showLoading: false,
  },
};

export const contextualSlice = createSlice({
  name: 'contextualSlice',
  initialState,
  reducers: {
    updateErrorMessage: (state, action) => {
      console.log(' [contectuaSlice] - updateErrorMessage');
      state.contextualInformation.errorMessage = action.payload;
    },
    updateSuccessMessage: (state, action) => {
      console.log(' [contectuaSlice] - updateSuccessMessage');
      state.contextualInformation.successMessage = action.payload;
    },
    updateInfoMessage: (state, action) => {
      console.log(' [contectuaSlice] - updateInfoMessage');

      state.contextualInformation.infoMessage = action.payload;
    },
    updateWarningMessage: (state, action) => {
      console.log(' [contectuaSlice] - updateWarningMessage');

      state.contextualInformation.warningMessage = action.payload;
    },
    updateShowLoading: (state, action) => {
      console.log(' [contectuaSlice] - updateShowLoading');
      state.contextualInformation.showLoading = action.payload;
    },
    resetContextual: (state)=> {
      console.log(' [contectuaSlice] - resetContextual');
      state.contextualInformation = JSON.parse(JSON.stringify(initialState));
    },
  },
});

export const { updateSuccessMessage, updateErrorMessage, resetContextual, updateShowLoading } = contextualSlice.actions;


export const contextualInformation = (state: RootState) => state.contextualSlice.contextualInformation;

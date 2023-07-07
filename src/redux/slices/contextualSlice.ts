import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface ContextualInformation {
  errorMessage: string;
  sucessMessage: string;
  infoMessage: string;
  warningMessage: string;
  showLoading: boolean;
  showBackground: boolean;
  showNearStops: boolean;
}

const initialState = {
  contextualInformation: {
    errorMessage: '',
    sucessMessage: '',
    infoMessage: '',
    warningMessage: '',
    showLoading: false,
    showBackground: false,
    showNearStops: false,
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
    updateSucessMessage: (state, action) => {
      console.log(' [contectuaSlice] - updateSucessMessage');
      state.contextualInformation.sucessMessage = action.payload;
    },
    updateInfoMessage: (state, action) => {
      console.log(' [contectuaSlice] - updateInfoMessage');

      state.contextualInformation.infoMessage = action.payload;
    },
    updateWarningMessage: (state, action) => {
      console.log(' [contectuaSlice] - updateWarningMessage');

      state.contextualInformation.warningMessage = action.payload;
    },
    updateShowNearStops: (state, action) => {
      state.contextualInformation.showNearStops = action.payload;
    },
    updateShowLoading: (state, action) => {
      console.log(' [contectuaSlice] - updateShowLoading');

      state.contextualInformation.showLoading = action.payload;
    },
    updateShowBackground: (state, action) => {
      console.log(' [contectuaSlice] - updateShowBackground');

      state.contextualInformation.showBackground = action.payload;
    },
    updateShowLoadingBackground: (state, action) => {
      console.log(' [contectuaSlice] - updateShowLoadingBackground');
      state.contextualInformation.showBackground = action.payload;
      state.contextualInformation.showLoading = action.payload;
    },
  },
});

export const contextualInformation = (state: RootState) =>
  state.contextualSlice.contextualInformation;

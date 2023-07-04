import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IPosition } from "@src/types/interfaces";

export interface LocationInformation {
    userLocation?: IPosition | null;
    askedServiceLocation: boolean;
    tracking: boolean;
    initTracking: boolean;
    granted: boolean;
    countNotShowingLocation?: number;
  }
  
  const initialState = {
    locationInformation: {
      userLocation: null,
      askedServiceLocation: false,
      tracking: false,
      initTracking: false,
      granted: false,
      countNotShowingLocation: 0,
    },
  };
  
  export const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {
      updateLocation: (state, action) => {
        state.locationInformation.userLocation = action.payload;
      },
      updatedAskedServiceLocation: (state, action) => {
        state.locationInformation.askedServiceLocation = action.payload;
      },
      updatedTracking: (state, action) => {
        state.locationInformation.tracking = action.payload;
      },
      updatedInitTracking: (state, action) => {
        state.locationInformation.initTracking = action.payload;
      },
      updateGrantedLocation: (state, action) => {
        state.locationInformation.granted = action.payload;
      },
      updateCountLocation: (state, action) => {
        state.locationInformation.countNotShowingLocation = action.payload;
      },
    },
  });
  
  export const locationInformation = (state: RootState) =>
    state.location.locationInformation;
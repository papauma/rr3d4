import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IPosition } from "@src/types/interfaces";

export interface LocationInformation {
    userLocation?: IPosition | null;
    askedServiceLocation: boolean;
    tracking: boolean;
    initTracking: boolean;
  }
  
  const initialState = {
    locationInformation: {
      userLocation: null,
      askedServiceLocation: false,
      tracking: false,
      initTracking: false,
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
    },
  });
  
  export const locationInformation = (state: RootState) =>
    state.location.locationInformation;
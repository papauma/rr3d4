import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { SearchStopType } from '../../types/ExploreInterfaces';
import { IMarker } from '../../types/interfaces';

// Define the initial state using that type
const initialState: any = {
  stopsStore: Array<IMarker>(),
  allStops: Array<SearchStopType>(),
};

export const stopsSlices = createSlice({
  name: 'stopsSlices',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateStops: (state, action) => {
      console.log(' [stopsSlices] - updateStops');
      state.stopsStore = action.payload;
    },
  },
});

export const { updateStops } = stopsSlices.actions;

// Other code such as selectors can use the imported `RootState` type
export const stopsState = (state: RootState) => state.stops.stopsStore;

export default stopsSlices.reducer;

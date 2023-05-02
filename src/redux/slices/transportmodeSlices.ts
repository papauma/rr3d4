import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

// Define the initial state using that type
const initialState: any = {
  transportModeStore: [],
};

export const transportModeSlices = createSlice({
  name: 'transportModeSlices',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateTransportMode: (state, action) => {
      state.transportModeStore = action.payload;
    },
  },
});

export const { updateTransportMode } = transportModeSlices.actions;

// Other code such as selectors can use the imported `RootState` type
export const transportModeState = (state: RootState) => state.transportmode.transportModeStore;

export default transportModeSlices.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

// Define the initial state using that type
const initialState: any = {
  line: null,
  polylineStore: [],
  markersStore: [],
  stopSelectedId: null,
  vehicles: [],
};

export const lineInfoSlice = createSlice({
  name: 'lineInfoSlice',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updatelineInfo: (state, action) => {
      console.log('linesInfo - 1');
      state.line = action.payload;
    },
    updateStopSelectedId: (state, action) => {
      state.stopSelectedId = action.payload;
    },
    updateVehicleInfo: (state, action) => {
      console.log('linesInfo - 1');
      state.vehicles = action.payload;
    },
    resetlineInfo: (state) => {
      console.log('linesInfo - 2');
      state.line = null;
      state.polylineStore = [];
      state.markersStore = [];
      state.vehicles = [];
      state.stopSelectedId = null;
    },
    updatePolylinesInfoline: (state, action) => {
      console.log('updatePolylinesInfoline - 1');
      state.polylineStore = [...action.payload];
    },
    updateMarkersInfoLine: (state, action) => {
      console.log('updateMarkersInfoLine - 1');
      state.markersStore = [...action.payload];
    }
  },
});

export const { updatelineInfo, resetlineInfo, updatePolylinesInfoline, updateMarkersInfoLine, updateVehicleInfo, updateStopSelectedId } = lineInfoSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const lineInfoState = (state: RootState) => state.lineInfo.line;
export const lineInfoVehicleState = (state: RootState) => state.lineInfo.vehicles;
export const lineInfoPolyLineState = (state: RootState) => state.lineInfo.polylineStore;
export const lineInfoMarkersState = (state: RootState) => state.lineInfo.markersStore;
export const lineInfoStopIdState = (state: RootState) => state.lineInfo.stopSelectedId;


export default lineInfoSlice.reducer;

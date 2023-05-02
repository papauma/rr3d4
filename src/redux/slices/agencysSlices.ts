import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface AgencyInformation {
  agencysStore: Array<any>;
  dataOrigin: Array<any>;
}

// Define the initial state using that type
const initialState: AgencyInformation = {
  agencysStore: [],
  dataOrigin: [],
};

export const agencysSlices = createSlice({
  name: 'agencysSlices',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateAgencys: (state, action) => {
      state.agencysStore = action.payload;
    },
    updateDataOrigin: (state, action) => {
      state.dataOrigin = action.payload;
    },
  },
});

export const { updateAgencys, updateDataOrigin } = agencysSlices.actions;

// Other code such as selectors can use the imported `RootState` type
export const agencyState = (state: RootState) => state.agencys;

export default agencysSlices.reducer;

export const agencyInformation = (state: RootState) => state.agencys;

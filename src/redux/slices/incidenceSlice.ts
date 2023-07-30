import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@src/redux/store';

// Define the initial state using that type
const initialState: any = {
  incidenceStore: {
    prua: 'ddd',
  },
};

export const incidenceSlice = createSlice({
  name: 'incidenceSlice',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateIncidence: (state, action) => {
      console.log(' [incidenceSlice] - updateIncidence');
      state.incidenceStore = {...state.incidenceStore, ...action.payload};
    },
  },
});

export const { updateIncidence } = incidenceSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const incidenceState = (state: RootState) => state.incidence.incidenceStore;

export default incidenceSlice.reducer;

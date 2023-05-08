import { RootState } from '../store';
import { createSlice } from '@reduxjs/toolkit';

// Define the initial state using that type
const initialState: any = {
  linesStore: [],
};

export const linesSlices = createSlice({
  name: 'linesSlices',
  initialState,
  reducers: {
    updateLines: (state, action) => {
      console.log('[linesSlices] - updateLines');
      state.linesStore = action.payload;
    },
  },
});

export const { updateLines } = linesSlices.actions;
export const lineState = (state: RootState) => state.lines.linesStore;

export default linesSlices.reducer;

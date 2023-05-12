import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IMarker } from '@src/types/interfaces';

interface InitialSegments {
  origin?: any;
  destination?: any;
}

interface SetSegments {
  index: number;
  stop?: any;
  overwrite?: any;
}

const initialState = {
  plannerSegmentsInformation: [undefined, undefined] as Array<IMarker | undefined>,
};

export const plannerSegmentsSlice = createSlice({
  name: 'plannerSegmentsSlice',
  initialState,
  reducers: {
    init: (state, action: PayloadAction<InitialSegments>) => {
      if (action.payload !== undefined) {
        state.plannerSegmentsInformation = [];
        state.plannerSegmentsInformation.push(action.payload.origin);
        state.plannerSegmentsInformation.push(action.payload.destination);
      }
    },
    swap: (state, action?) => {
      let origin = state.plannerSegmentsInformation[0];
      let indexDest = state.plannerSegmentsInformation.length - 1;
      state.plannerSegmentsInformation[0] = state.plannerSegmentsInformation[indexDest];
      state.plannerSegmentsInformation[indexDest] = origin;
    },
    delete: (state, action) => {
      state.plannerSegmentsInformation.splice(action.payload, 1);
    },
    set: (state, action: PayloadAction<SetSegments>) => {
      if (
        state.plannerSegmentsInformation[action.payload.index] &&
        action.payload.index !== 0 &&
        action.payload.overwrite
      ) {
        for (let i = 0; i < state.plannerSegmentsInformation.length; i++) {
          state.plannerSegmentsInformation[1 + action.payload.index] =
            state.plannerSegmentsInformation[action.payload.index];
        }
      }
      state.plannerSegmentsInformation[action.payload.index] = action.payload.stop;
    },
  },
});

export const plannerSegmentsInformation = (state: RootState) =>
  state.plannerSegmentsSlice.plannerSegmentsInformation;

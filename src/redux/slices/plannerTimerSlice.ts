import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import TimeUtils from '../../utils/TimeUtils';

export interface PlannerTimerInformation {
  time?: any | null; //hora de salida con formato HH::MMam
  date?: any | null; //fecha de salida con formato dia/mes/año
  arriveBy: boolean; //true tiempo de llegada, false tiempo de salida
  now: boolean; //identificación de si se ha escogido la hora actual
  intermediateStopTimes: Array<string | undefined>; //tiempos de salida en las paradas intermedias
}

const initialState = {
  PlannerTimerInformation: {
    time: TimeUtils.getTimePM_AM(TimeUtils.getTime(Date.now())),
    date: TimeUtils.getDate(Date.now()),
    arriveBy: false,
    now: true,
    intermediateStopTimes: new Array<string>(),
  },
};

export const plannerTimerSlice = createSlice({
  name: 'plannerTimer',
  initialState,
  reducers: {
    updateTime: (state, action) => {
      let time = action.payload;

      state.PlannerTimerInformation.time = TimeUtils.getTimePM_AMByHoursMinutes(
        time.hour,
        time.minute,
      );
    },
    updateTimePMAM: (state, action) => {
      state.PlannerTimerInformation.time = action.payload;
    },
    updateDate: (state, action) => {
      state.PlannerTimerInformation.date = action.payload;
    },
    updateArriveBy: (state, action) => {
      state.PlannerTimerInformation.arriveBy = action.payload;
    },
    updateNow: (state, action) => {
      state.PlannerTimerInformation.now = action.payload;
    },
    updateIntermediateStopTimes: (state, action) => {
      state.PlannerTimerInformation.intermediateStopTimes = action.payload;
    },
  },
});

export const plannerTimerInformation = (state: RootState) =>
  state.plannerTimer.PlannerTimerInformation;

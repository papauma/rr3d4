import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface FiltersInformation {
  transportModes: Array<number>;
  sellingCategories: Array<number>;
  otherCategories: Array<number>;
}

const initialState: FiltersInformation = {
    transportModes: [],
    sellingCategories: [],
    otherCategories: [],
};

export const filtersSlice = createSlice({
  name: 'filtersSlice',
  initialState,
  reducers: {
    updateFiltersTransportModes: (state, action) => {
      console.log(' [filtersSlice] - updateFilters');
      state.transportModes = action.payload;
    },
    updateFiltersOtherCategories: (state, action) => {
      console.log(' [filtersSlice] - updateFilters');
      state.otherCategories = action.payload;
    },
    updateFiltersSellingCategories: (state, action) => {
      console.log(' [filtersSlice] - updateFilters');
      state.sellingCategories = action.payload;
    },
    resetFilters: (state) => {
      console.log(' [filtersSlice] - resetFilters');
      state.transportModes = [];
      state.otherCategories = [];
      state.sellingCategories = [];
    },
  },
});

export const filtersState = (state: RootState) => state.filters;

export const { updateFiltersTransportModes, updateFiltersOtherCategories, updateFiltersSellingCategories, resetFilters } = filtersSlice.actions;

export default filtersSlice.reducer;
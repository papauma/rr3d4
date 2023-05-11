import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface SearchInformation {
  searchInformation: {
    stops: Array<any>;
    pois: Array<any>;
    directions: Array<any>;
    others: Array<any>;
  };
  inputSelected: any;
  recentSearchInformation: {
    stops: Array<any>;
    pois: Array<any>;
    directions: Array<any>;
    others: Array<any>;
  };
  searchLoading: {
    stops: boolean;
    pois: boolean;
    directions: boolean;
    others: boolean;
  };
}

const initialState: SearchInformation = {
  searchInformation: {
    stops: [],
    pois: [],
    directions: [],
    others: [],
  },
  inputSelected: null,
  recentSearchInformation: {
    stops: [],
    pois: [],
    directions: [],
    others: [],
  },
  searchLoading: {
    stops: false,
    pois: false,
    directions: false,
    others: false,
  },
};

export const searchSlice = createSlice({
  name: 'searchSlice',
  initialState,
  reducers: {
    updateInput: (state, action) => {
      console.log(' [searchSlice] - updateInput');
      state.inputSelected = action.payload;
    },
    updateStops: (state, action) => {
      console.log(' [searchSlice] - updateStops');
      state.searchInformation.stops = action.payload;
    },
    updatePois: (state, action) => {
      console.log(' [searchSlice] - updatePois');
      state.searchInformation.pois = action.payload;
    },
    updateDirections: (state, action) => {
      console.log(' [searchSlice] - updateDirections');
      state.searchInformation.directions = action.payload;
    },
    updateOthers: (state, action) => {
      console.log(' [searchSlice] - updateOthers');
      state.searchInformation.others = action.payload;
    },
    updateLoadingAll: (state, action) => {
      console.log(' [searchSlice] - updateLoadingAll');
      state.searchLoading = {
        stops: true,
        pois: false,
        directions: true,
        others: false,
      };
    },
    updateLoadingStops: (state, action) => {
      console.log(' [searchSlice] - updateLoadingStops');
      state.searchLoading.stops = action.payload;
    },
    updateLoadingPois: (state, action) => {
      console.log(' [searchSlice] - updateLoadingPois');
      state.searchLoading.pois = action.payload;
    },
    updateLoadingDirections: (state, action) => {
      console.log(' [searchSlice] - updateLoadingDirections');
      state.searchLoading.directions = action.payload;
    },
    updateLoadingOthers: (state, action) => {
      console.log(' [searchSlice] - updateLoadingOthers');
      state.searchLoading.others = action.payload;
    },
    resetAll: (state) => {
      console.log(' [searchSlice] - resetAll');
      state.searchInformation = {
        stops: [],
        pois: [],
        directions: [],
        others: [],
      };
    },
    updateRecentSearch: (state, action) => {
      console.log(' [searchSlice] - updateRecentSearch');
      state.recentSearchInformation = {
        stops: [...action.payload.stops, ...state.recentSearchInformation.stops],
        pois: [...state.recentSearchInformation.pois, ...action.payload.pois],
        directions: [...state.recentSearchInformation.directions, ...action.payload.directions],
        others: [...state.recentSearchInformation.others, ...action.payload.others],
      };
    },
  },
});

export const SearchState = (state: RootState) => state.searchSlice;
export const searchInformation = (state: RootState) => state.searchSlice.searchInformation;
export const inputSelected = (state: RootState) => state.searchSlice.inputSelected;
export const searchLoading = (state: RootState) => state.searchSlice.searchLoading;

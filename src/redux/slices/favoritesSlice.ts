import {createSlice} from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface FavoritesInformation {
  lines: Array<any>;
  stops: Array<number>;
  destinations: Array<any>;
}

const initialState = {
  favoritesInformation: {
    lines: [],
    stops: [],
    destinations: [],
  },
};

export const favoritesSlice = createSlice({
  name: 'favoritesSlice',
  initialState,
  reducers: {
    updateFavorites: (state, action) => {
      state.favoritesInformation = action.payload;
    },
  },
});

export const { updateFavorites} = favoritesSlice.actions;


export const favoritesInformation = (state: RootState) =>
  state.favoritesSlice.favoritesInformation;

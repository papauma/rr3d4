import { createSlice } from '@reduxjs/toolkit';
import { MMKV } from 'react-native-mmkv'
import { IMarker } from '../../types/interfaces';
import { RootState } from '../store';

const storage = new MMKV();

const initialState = {
  recentSearchInformation: Array<IMarker>(), //array de IMarkers
};

export const searchRecentsSlice = createSlice({
  name: 'searchRecentsSlice',
  initialState,
  reducers: {
    updateRecentSearch: (state, action) => {
      let copyRecents: Array<IMarker> = JSON.parse(JSON.stringify(state.recentSearchInformation));
      let elementToAdd: IMarker = action.payload;

      //control de no está añadido ya en la lista de recientes
      if (
        !copyRecents.find(
          (recent: IMarker) =>
            recent.markerType === elementToAdd.markerType && recent.id === elementToAdd.id,
        )
      ) {
        if (copyRecents.length === 5) {
          copyRecents.pop();
        }

        copyRecents = [elementToAdd].concat(copyRecents);
        state.recentSearchInformation = copyRecents;
        storage.set('searchRecents', JSON.stringify(copyRecents));
      }
    },
    deleteRecent: (state, action) => {
      let copyRecents: Array<IMarker> = JSON.parse(JSON.stringify(state.recentSearchInformation));

      copyRecents.splice(action.payload, 1);

      state.recentSearchInformation = copyRecents;
      storage.set('searchRecents', JSON.stringify(copyRecents));
    },
    modifyRecent: (state, action) => {
      //modifica la información de un reciente
      let copyRecents: Array<IMarker> = JSON.parse(JSON.stringify(state.recentSearchInformation));

      copyRecents.splice(action.payload.index, 1, action.payload.marker);

      state.recentSearchInformation = copyRecents;
      storage.set('searchRecents', JSON.stringify(copyRecents));
    },
    inititalizeFromCache: (state, action) => {
      state.recentSearchInformation = action.payload;
    },
  },
});
export const recentSearchInformation = (state: RootState) =>
  state.searchRecentsSlice.recentSearchInformation;

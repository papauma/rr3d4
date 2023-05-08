import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { MMKV } from 'react-native-mmkv'

const storage = new MMKV();
// Define a type for the slice state
interface IconsState {
  iconsStore: Array<{
    contentFile: string;
    formatFile: any;
    id: number;
    nameFile: any;
  }>;
}

// Define the initial state using that type
// Define the initial state using that type
const initialState: IconsState = {
  iconsStore: [],
};

export const iconsSlices = createSlice({
  name: 'iconsSlices',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateIcons: (state, action) => {
      console.log(' [iconsSlice] - updateIcons');
      state.iconsStore = action.payload;
    },
    updateIcon: (state, action) => {
      console.log(' [iconsSlice] - updateIcon');
      if (state.iconsStore.filter((icon) => icon.id === action.payload.id).length === 0) {
        state.iconsStore.push(action.payload);
        storage.set('icons', JSON.stringify(state.iconsStore));
      }
    },
  },
});

export const { updateIcons, updateIcon } = iconsSlices.actions;

// Other code such as selectors can use the imported `RootState` type
export const iconsState = (state: RootState) => state.icons.iconsStore;

export default iconsSlices.reducer;

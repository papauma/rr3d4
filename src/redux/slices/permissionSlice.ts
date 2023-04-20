import { createSlice } from '@reduxjs/toolkit';

// Define a type for the slice state
interface PermissionState {
  cookies: string;
  PermissionGeolocation: boolean;
}

// Define the initial state using that type
const initialState: PermissionState = {
  cookies: 'true',
  PermissionGeolocation: false,
};
export const permissionSlice = createSlice({
  name: 'permission',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateCookies: (state) => {
      console.log(' [permissionSlice] - updateCookies');
      state.cookies = 'true';
    },
    updatePermissionGeolocation: (state, action) => {
      // storage.set('PermissionGeolocation', action.payload);
      // AsyncStorage.setItem('PermissionGeolocation', action.payload);
      console.log(' [permissionSlice] - updatePermissionGeolocation');
      state.PermissionGeolocation = action.payload;
    },
  },
});

export const { updateCookies, updatePermissionGeolocation } = permissionSlice.actions;

// Other code such as selectors can use the imported `PermissionState` type
export const permissionState = (state: PermissionState) => state;

export default permissionSlice.reducer;

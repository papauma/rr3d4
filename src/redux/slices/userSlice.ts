import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { MMKV } from 'react-native-mmkv';
import { random } from '@src/utils/StringUtils';
import { enviroments } from '@src/utils/constants';
const storage = new MMKV();

export interface UserInterface {
  user: {
    userTypeId: number | undefined;
    languageId: number | undefined;
    deviceTypeId: number | undefined;
    tokenDevice: any;
    bearerToken: string;
    alias: string | undefined;
    email: string | undefined;
  };
}

const initialState: UserInterface = {
  user: {
    userTypeId: enviroments.userTypeId.anonymous,
    languageId: enviroments.languageId,
    deviceTypeId: enviroments.deviceTypeId,
    tokenDevice: '',
    bearerToken: '',
    alias: '',
    email: '',
  },
};

export const userSliceFingerprint = createAsyncThunk<any>('', async () => {
  let fingerprint = random();
  return fingerprint;
});


export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    userTypeIdUpdate: (state, action) => {
      console.log('userSlice -> userTypeIdUpdate');
      state.user.userTypeId = action.payload;
    },
    languageIdUpdate: (state, action) => {
      console.log('userSlice -> languageIdUpdate');
      state.user.languageId = action.payload;
    },
    deviceTypeIdUpdate: (state, action) => {
      console.log('userSlice -> deviceTypeIdUpdate');
      state.user.deviceTypeId = action.payload;
    },
    tokenDeviceUpdate: (state, action) => {
      console.log('userSlice -> tokenDeviceUpdate');
      state.user.tokenDevice = action.payload;
    },
    updateUserData: (state, action: any) => {
      console.log('userSlice -> updateUserData');
      state.user = { ...state.user, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userSliceFingerprint.fulfilled, (state, action) => {
      state.user.tokenDevice = action.payload;
    });
  },
});

export const {
  userTypeIdUpdate,
  languageIdUpdate,
  deviceTypeIdUpdate,
  tokenDeviceUpdate,
  updateUserData,
} = userSlice.actions;
export default userSlice.reducer;

export const userState = (state: RootState) => state.user.user;

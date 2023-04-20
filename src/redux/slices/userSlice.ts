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
    id: number | undefined;
    username: string | undefined;
    enabled: boolean | undefined;
    roles: Array<any> | undefined;
    tutorial: boolean | undefined;
  };
}

const initialState: UserInterface = {
  user: {
    userTypeId: enviroments.userTypeId.anonymous,
    languageId: enviroments.languageId,
    deviceTypeId: enviroments.deviceTypeId,
    tokenDevice: '',
    bearerToken: '',
    id: undefined,
    username: undefined,
    enabled: undefined,
    roles: undefined,
    tutorial: false,
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
    updateTutorial: (state, action: any) => {
      console.log('userSlice -> updateTutorial');
      state.user.tutorial = action.payload;
      storage.set('userAccountInformation', JSON.stringify(state.user));
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
  updateTutorial,
  updateUserData,
} = userSlice.actions;
export default userSlice.reducer;

export const userState = (state: RootState) => state.user.user;

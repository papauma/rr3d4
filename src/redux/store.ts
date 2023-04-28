import { configureStore } from '@reduxjs/toolkit';
import userSlice from '@src/redux/slices/userSlice';
import permissionSlice from '@src/redux/slices/permissionSlice';
import stopsSlices from '@src/redux/slices/stopsSlices';
import { locationSlice } from './slices/locationSlice';
import { contextualSlice } from './slices/contextualSlice';

export const reducer = {
  user: userSlice,
  permission: permissionSlice,
  stops: stopsSlices,
  [locationSlice.name]: locationSlice.reducer,
  [contextualSlice.name]: contextualSlice.reducer,
};

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: [
          'stops.stopsStore',
        ],
        warnAfter: 700,
      },
    }).concat(
    );
  },
});

export type RootState = ReturnType<typeof store.getState>;

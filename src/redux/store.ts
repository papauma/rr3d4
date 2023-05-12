import { configureStore } from '@reduxjs/toolkit';
import userSlice from '@src/redux/slices/userSlice';
import permissionSlice from '@src/redux/slices/permissionSlice';
import stopsSlices from '@src/redux/slices/stopsSlices';
import { locationSlice } from './slices/locationSlice';
import { contextualSlice } from './slices/contextualSlice';
import agencysSlices from './slices/agencysSlices';
import transportmodeSlices from './slices/transportmodeSlices';
import { agencyServiceApi } from './services/agencyService';
import { transportModeServiceApi } from './services/transportmodeServices';
import { stopsServiceApi } from './services/stopsService';
import iconsSlices from './slices/iconsSlices';
import { iconsServiceApi } from './services/iconsServices';
import { userServiceApi } from './services/userService';
import mapSlice from './slices/mapSlice';
import { linesServiceApi } from './services/linesService';
import linesSlices from './slices/linesSlices';
import filtersSlice from './slices/filtersSlice';
import { searchRecentsSlice } from './slices/searchRecentsSlice';
import { searchSlice } from './slices/searchSlice';

export const reducer = {
  user: userSlice,
  permission: permissionSlice,
  stops: stopsSlices,
  [locationSlice.name]: locationSlice.reducer,
  [contextualSlice.name]: contextualSlice.reducer,
  [searchRecentsSlice.name]: searchRecentsSlice.reducer,
  [searchSlice.name]: searchSlice.reducer,
  agencys: agencysSlices,
  transportmode: transportmodeSlices,
  icons: iconsSlices,
  map: mapSlice,
  lines: linesSlices,
  filters: filtersSlice,
  [agencyServiceApi.reducerPath]: agencyServiceApi.reducer,
  [transportModeServiceApi.reducerPath]: transportModeServiceApi.reducer,
  [stopsServiceApi.reducerPath]: stopsServiceApi.reducer,
  [iconsServiceApi.reducerPath]: iconsServiceApi.reducer,
  [userServiceApi.reducerPath]: userServiceApi.reducer,
  [linesServiceApi.reducerPath]: linesServiceApi.reducer,
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
      agencyServiceApi.middleware,
      transportModeServiceApi.middleware,
      stopsServiceApi.middleware,
      iconsServiceApi.middleware,
      userServiceApi.middleware,
      linesServiceApi.middleware,
    );
  },
});

export type RootState = ReturnType<typeof store.getState>;

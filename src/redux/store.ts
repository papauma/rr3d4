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
import { plannerSegmentsSlice } from './slices/plannerSegmentsSlice';
import { plannerSlice } from './slices/plannerSlice';
import { plannerTimerSlice } from './slices/plannerTimerSlice';
import { plannerServiceApi } from './services/plannerService';
import lineInfoSlice from './slices/lineInfoSlice';
import { favoritesSlice } from './slices/favoritesSlice';
import { favoriteServiceApi } from './services/favoriteServiceApi';

export const reducer = {
  user: userSlice,
  permission: permissionSlice,
  stops: stopsSlices,
  [locationSlice.name]: locationSlice.reducer,
  [contextualSlice.name]: contextualSlice.reducer,
  [searchRecentsSlice.name]: searchRecentsSlice.reducer,
  [searchSlice.name]: searchSlice.reducer,
  [plannerSegmentsSlice.name]: plannerSegmentsSlice.reducer,
  [plannerSlice.name]: plannerSlice.reducer,
  [plannerTimerSlice.name]: plannerTimerSlice.reducer,
  [favoritesSlice.name]: favoritesSlice.reducer,
  agencys: agencysSlices,
  transportmode: transportmodeSlices,
  icons: iconsSlices,
  map: mapSlice,
  lines: linesSlices,
  filters: filtersSlice,
  lineInfo: lineInfoSlice,
  [agencyServiceApi.reducerPath]: agencyServiceApi.reducer,
  [transportModeServiceApi.reducerPath]: transportModeServiceApi.reducer,
  [stopsServiceApi.reducerPath]: stopsServiceApi.reducer,
  [iconsServiceApi.reducerPath]: iconsServiceApi.reducer,
  [userServiceApi.reducerPath]: userServiceApi.reducer,
  [linesServiceApi.reducerPath]: linesServiceApi.reducer,
  [plannerServiceApi.reducerPath]: plannerServiceApi.reducer,
  [favoriteServiceApi.reducerPath]: favoriteServiceApi.reducer,
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
      plannerServiceApi.middleware,
    );
  },
});

export type RootState = ReturnType<typeof store.getState>;

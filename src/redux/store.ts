import { configureStore } from '@reduxjs/toolkit';
import incidenceSlice from '@src/redux/slices/incidenceSlice';
import { stopsServiceApi } from './services/stopsService';
import { contextualSlice } from './slices/contextualSlice';


export const reducer = {
  incidence: incidenceSlice,
  [contextualSlice.name]: contextualSlice.reducer,
  [stopsServiceApi.reducerPath]: stopsServiceApi.reducer,
};

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: [],
        warnAfter: 700,
      },
    }).concat(
      stopsServiceApi.middleware,
    );
  },
});

export type RootState = ReturnType<typeof store.getState>;

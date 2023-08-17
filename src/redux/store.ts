import { configureStore } from '@reduxjs/toolkit';
import incidenceSlice from '@src/redux/slices/incidenceSlice';
import { contextualSlice } from './slices/contextualSlice';


export const reducer = {
  incidence: incidenceSlice,
  [contextualSlice.name]: contextualSlice.reducer,
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
      // aqui van los services
    );
  },
});

export type RootState = ReturnType<typeof store.getState>;

import { configureStore } from '@reduxjs/toolkit';
import userSlice from '@src/redux/slices/userSlice';
import permissionSlice from '@src/redux/slices/permissionSlice';

export const reducer = {
  user: userSlice,
  permission: permissionSlice,
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
    );
  },
});

export type RootState = ReturnType<typeof store.getState>;

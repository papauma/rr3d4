import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { enviroments } from '@src/utils/constants';
import { RootState } from '../store';

export const transportModeServiceApi = createApi({
  reducerPath: 'transportModeServiceApi',
  baseQuery: fetchBaseQuery({
    baseUrl: enviroments.endPoint,
    prepareHeaders: (headers, { getState, endpoint }) => {
      const bearerToken = (getState() as RootState).user.user.bearerToken;
      headers.set('Authorization', `Bearer ${bearerToken}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    GetTransportMode: builder.query<any, void>({
      query: () => `transportmode`,
    }),
  }),
});

export const { useLazyGetTransportModeQuery } = transportModeServiceApi;

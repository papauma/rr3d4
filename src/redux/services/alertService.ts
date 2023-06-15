import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { enviroments } from '@src/utils/constants';
import { RootState } from '../store';

const idioma = 'es';

export const alertServiceApi = createApi({
  reducerPath: 'alertServiceApi',
  baseQuery: fetchBaseQuery({
    baseUrl: enviroments.endPoint,
    prepareHeaders: (headers, { getState, endpoint }) => {
      const bearerToken = (getState() as RootState).user.user.bearerToken;
      headers.set('Authorization', `Bearer ${bearerToken}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    GetAlerts: builder.query<any, void>({
      query: () => `alert/?locale=${idioma}`,
    }),
    GetService: builder.query<any, void>({
      query: () => `service-alerts`,
    }),
  }),
});

export const { useLazyGetAlertsQuery, useLazyGetServiceQuery } = alertServiceApi;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { enviroments } from '@src/utils/constants';
import { RootState } from '../store';

export const agencyServiceApi = createApi({
  reducerPath: 'agencyServiceApi',
  baseQuery: fetchBaseQuery({
    baseUrl: enviroments.endPoint,
    prepareHeaders: (headers, { getState, endpoint }) => {
      const bearerToken = (getState() as RootState).user.user.bearerToken;
      headers.set('Authorization', `Bearer ${bearerToken}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    GetDataOrigin: builder.query<any, void>({
      query: () => `agency/dataorigin`,
    }),
    GetAgency: builder.query<any, void>({
      query: () => `agency/`,
    }),
  }),
});

export const { useLazyGetDataOriginQuery, useLazyGetAgencyQuery } = agencyServiceApi;

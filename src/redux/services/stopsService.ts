import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '@src/redux/store';
import { enviroments } from '@src/utils/constants';

export const stopsServiceApi = createApi({
  reducerPath: 'stopsServiceApi',
  baseQuery: fetchBaseQuery({
    baseUrl: enviroments.endPoint,
    prepareHeaders: (headers, { getState, endpoint }) => {
      const bearerToken = (getState() as RootState).user.user.bearerToken;
      headers.set('Authorization', `Bearer ${bearerToken}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    GetStops: builder.query<any, void>({
      query: () => 'agency/stops/',
    }),
    SearchStops: builder.query<any, string>({
      query: (txt) => ({
        url: `/agency/stops-intercambiador?txt=${txt}`,
        method: 'GET',
      }),
    }),
    GetStopById: builder.query<any, any>({
      query: (id) => `agency/stops/${id}`,
    }),
    GetLinesByStopId: builder.query<any, any>({
      query: (id) => `agency/stops/${id}/lines`,
    }),
    GetLinesTimesByStopId: builder.query<any, any>({
      query: (id) => `agency/stops/${id}/linestimes`,
    }),
    GetLinesofChildsByStopParentId: builder.query<any, number>({
      query: (id) => `agency/stops/${id}/lines-of-childs`,
    }),
    GetNearLines: builder.query<any, any>({
      query: ({ latitude, longitude }) =>
        `/agency/lines/near-stop?latitude=${latitude}&longitude=${longitude}`,
    }),
  }),
});

export const {
  useLazyGetStopsQuery,
  useLazySearchStopsQuery,
  useLazyGetStopByIdQuery,
  useLazyGetLinesByStopIdQuery,
  useLazyGetLinesTimesByStopIdQuery,
  useLazyGetLinesofChildsByStopParentIdQuery,
  useLazyGetNearLinesQuery,
} = stopsServiceApi;

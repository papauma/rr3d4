import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from 'src/redux/store';
import { enviroments } from '@src/utils/constants';

export const linesServiceApi = createApi({
  reducerPath: 'linesServiceApi',
  baseQuery: fetchBaseQuery({
    baseUrl: enviroments.endPoint,
    prepareHeaders: (headers, { getState, endpoint }) => {
      const bearerToken = (getState() as RootState).user.user.bearerToken;
      headers.set('Authorization', `Bearer ${bearerToken}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    GetLines: builder.query<any, void>({
      query: () => `agency/lines/`,
    }),
    GetLineShape: builder.query<any, number>({
      query: (id) => `agency/lines/${id}/shape`,
    }),
    GetLineShapeTrip: builder.query<any, any>({
      query: ({ id, tripId })  => !tripId ? `agency/lines/${id}/shape` : `agency/lines/${id}/shape?tripId=${tripId}`,
    }),
    GetLineDirections: builder.query<any, number>({
      query: (id) => `agency/lines/${id}/directions`,
    }),
    GetLineStop: builder.query<any, number>({
      query: (id) => `agency/lines/${id}/stops`,
    }),
    GetLineStopWithTrip: builder.query<any, any>({
      query: ({ id, tripId }) => `agency/lines/${id}/stops?tripId=${tripId}`,
    }),
    GetLineShapeGeneric: builder.query<any, number>({
      query: (id) => `agency/lines/${id}/shapes-generic`,
    }),
    GetLinesBothTypesStopsTrip: builder.query<any, any>({
      query: ({ id, tripId }) => `agency/lines/${id}/stops?tripId=${tripId}&isLine=0&isLineNearStop=0&both=1`,
    }),
    GetLinesBothTypesStops: builder.query<any, any>({
      query: (id) => `agency/lines/${id}/stops?isLine=0&isLineNearStop=0&both=1`,
    }),
  }),
});

export const {
  useLazyGetLinesQuery,
  useLazyGetLineShapeQuery,
  useLazyGetLineShapeTripQuery,
  useLazyGetLineDirectionsQuery,
  useLazyGetLineStopWithTripQuery,
  useLazyGetLineStopQuery,
  useLazyGetLineShapeGenericQuery,
  useLazyGetLinesBothTypesStopsQuery,
  useLazyGetLinesBothTypesStopsTripQuery
} = linesServiceApi;

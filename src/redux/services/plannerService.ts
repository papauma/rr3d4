import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { enviroments } from '@src/utils/constants';
import { RootState } from '../store';

const MINWALKDISTANCE = 1000

interface PlannerRequest {}

export const plannerServiceApi = createApi({
  reducerPath: 'plannerServiceApi',
  baseQuery: fetchBaseQuery({
    baseUrl: enviroments.endPoint,
    prepareHeaders: (headers, { getState, endpoint }) => {
      const bearerToken = (getState() as RootState).user.user.bearerToken;
      headers.set('Authorization', `Bearer ${bearerToken}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    plan: builder.mutation<any, any>({
      query: ({
        origin,
        destination,
        time,
        date,
        wheelchair,
        maxWalkDistance,
        arriveBy,
        transportModes,
        deviceType,
        intermediateStops,
        toPlaceTypeId,
        toPlaceValue,
        fromPlaceTypeId,
        fromPlaceValue,
        intermediatePlacesId,
        times,
      }) => {
        return {
          url: `/plan/?from=${origin}&to=${destination}&time=${time}&maxWalkDistance=${
            maxWalkDistance ?? MINWALKDISTANCE
          }&wheelchair=${wheelchair ?? false}&mode=${
            transportModes ?? 'TRANSIT,WALK'
          }&date=${date}&arriveBy=${arriveBy}&deviceType=${deviceType}&toPlaceTypeId=${toPlaceTypeId}&toPlaceValue=${toPlaceValue}&fromPlaceId=${fromPlaceTypeId}&fromPlaceValue=${fromPlaceValue}${intermediateStops ?? ''}${
            intermediatePlacesId ?? ''
          }${times ?? ''}`,
          method: 'GET',
          /* headers: {
          timeout: '60000'
        }, */
        };
      },
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
        } catch (err) {
          console.log(err);
        }
      },
    }),
    rateGuided: builder.mutation<any, any>({
      query: ({ userId, planningId, guidedCategoryId, deviceTypeId, observations }) => {
        return {
          url: `/guided/report?userId=${userId}&planningId=${planningId}&guidedCategoryId=${guidedCategoryId}&deviceTypeId=${deviceTypeId}&observations=${observations}`,
          method: 'POST',
        };
      },
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (err) {
          console.log(err);
        }
      },
    }),
    obtainPlanById: builder.mutation<any, any>({
      query: ({ id }) => {
        return {
          url: `/plan/share?planId=${id}`,
          method: 'GET',
        };
      },
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

export const { usePlanMutation, useObtainPlanByIdMutation } = plannerServiceApi;

import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { enviroments } from '@src/utils/constants';

export const favoriteServiceApi = createApi({
  reducerPath: 'favoriteServiceApi',
  baseQuery: fetchBaseQuery({
    baseUrl: enviroments.endPoint,
    prepareHeaders: (headers, { getState, endpoint }) => {
      const bearerToken = (getState() as RootState).user.user.bearerToken;
      headers.set('Authorization', `Bearer ${bearerToken}`);
      return headers;
    },
  }),
  endpoints: builder => ({
    addFavorite: builder.mutation<any, any>({
      query: ({body}) => ({
        url: '/favorite/',
        method: 'POST',
        body: body,
      }),
      async onQueryStarted(id, {dispatch, queryFulfilled}) {
        try {
          await queryFulfilled;
        } catch (err) {}
      },
    }),
    deleteFavorite: builder.mutation<any, any>({
      query: ({body}) => ({
        url: '/favorite/',
        method: 'DELETE',
        body: body,
      }),
      async onQueryStarted(id, {dispatch, queryFulfilled}) {
        try {
          await queryFulfilled;
        } catch (err) {}
      },
    }),
    editDirectionFavorite: builder.mutation<any, any>({
      query: ({body}) => ({
        url: '/favorite/',
        method: 'PUT',
        body: body,
      }),
      async onQueryStarted(id, {dispatch, queryFulfilled}) {
        try {
          await queryFulfilled;
        } catch (err) {}
      },
    }),
    GetFavorites: builder.query<any, void>({
      query: () => `/favorite/`,
    }),
  }),
});

export const {
  useAddFavoriteMutation,
  useDeleteFavoriteMutation,
  useLazyGetFavoritesQuery,
  useEditDirectionFavoriteMutation,
} = favoriteServiceApi;

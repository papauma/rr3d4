import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { enviroments } from '@src/utils/constants';
import { RootState } from 'src/redux/store';

export const iconsServiceApi = createApi({
  reducerPath: 'iconsServiceApi',
  baseQuery: fetchBaseQuery({
    baseUrl: enviroments.endPoint,
    prepareHeaders: (headers, { getState, endpoint }) => {
      const bearerToken = (getState() as RootState).user.user.bearerToken;
      headers.set('Authorization', `Bearer ${bearerToken}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    GetIcons: builder.query<any, any>({
      query: (id) => `icons/${id}`,
    }),
  }),
});

export const { useLazyGetIconsQuery } = iconsServiceApi;

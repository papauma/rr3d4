import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UserInterface } from '../slices/userSlice';
import { enviroments } from '@src/utils/constants';

export const userServiceApi = createApi({
  reducerPath: 'userServiceApi',
  baseQuery: fetchBaseQuery({
    baseUrl: enviroments.endPoint,
  }),
  endpoints: (builder) => ({
    createUserAnonymous: builder.mutation<any, any>({
      query: (params: UserInterface) => ({
        url: 'user/create-user-anonimous',
        method: 'POST',
        body: params,
      }),
    }),
  }),
});

export const { useCreateUserAnonymousMutation } = userServiceApi;

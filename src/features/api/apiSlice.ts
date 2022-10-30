import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../../utils/contants';

export const apiSlice = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: builder => ({
    getHomeMovie: builder.query<any, string>({
      query: () => ``,
    }),
  }),
});

export const { useGetHomeMovieQuery } = apiSlice;

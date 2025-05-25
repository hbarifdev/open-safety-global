import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import qs from 'qs';

export const apiSlice = createApi({
  reducerPath: 'strapiApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL + '/api',
    paramsSerializer: (params) => qs.stringify(params, { encodeValuesOnly: true }),
  }),
  endpoints: (builder) => ({
    // Existing endpoint for subcategories
    getSubCategoryDetailBySlug: builder.query({
      query: (slug: string) => ({
        url: '/sub-categories',
        params: {
          filters: { slug: { $eq: slug } },
          populate: [
            'parent',
            'parent.sub_categories',
            'products',
          ],
        },
      }),
    }),

    // NEW endpoint for categories
    getCategoryDetailBySlug: builder.query({
      query: (slug: string) => ({
        url: '/categories',
        params: {
          filters: { slug: { $eq: slug } },
          populate: [
            'sub_categories',
            'featured_products',
          ],
        },
      }),
    }),
  }),
});

export const {
  useGetSubCategoryDetailBySlugQuery,
  useGetCategoryDetailBySlugQuery,  
} = apiSlice;

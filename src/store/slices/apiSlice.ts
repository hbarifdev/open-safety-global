import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import qs from 'qs';

export const apiSlice = createApi({
  reducerPath: 'strapiApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL + '/api',
    paramsSerializer: (params) => qs.stringify(params, { encodeValuesOnly: true }),
  }),
  endpoints: (builder) => ({
    // Subcategory with products, including featured + gallery images
    getSubCategoryDetailBySlug: builder.query({
      query: (slug: string) => ({
        url: '/sub-categories',
        params: {
          filters: { slug: { $eq: slug } },
          populate: {
            parent: {
              populate: 'sub_categories',
            },
            products: {
              populate: {
                featured: true,
                gallery: true,
              },
            },
          },
        },
      }),
    }),

    // Category with subcategories and featured products including featured + gallery images
    getCategoryDetailBySlug: builder.query({
      query: (slug: string) => ({
        url: '/categories',
        params: {
          filters: { slug: { $eq: slug } },
          populate: {
            sub_categories: true,
            featured_products: {
              populate: {
                featured: true,
                gallery: true,
              },
            },
          },
        },
      }),
    }),
    searchProducts: builder.query({
      query: (searchTerm: string) => ({
        url: '/products',
        params: {
          filters: {
            title: {
              $containsi: searchTerm,
            },
          },
          populate: {
            featured: true,
            gallery: true,
          },
        },
      }),
    }),
  }),
});


export const {
  useGetSubCategoryDetailBySlugQuery,
  useGetCategoryDetailBySlugQuery,
  useSearchProductsQuery
} = apiSlice;

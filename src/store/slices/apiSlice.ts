import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import qs from 'qs';

export const apiSlice = createApi({
  reducerPath: 'strapiApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL + '/api',
    paramsSerializer: (params) => qs.stringify(params, { encodeValuesOnly: true }),
  }),
  tagTypes: ['Category', 'SubCategory', 'Product'],
  endpoints: (builder) => ({

  // Subcategory with products
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
              },
            },
          },
        },
      }),
      providesTags: (result, error, slug) => [{ type: 'SubCategory', id: slug }],
      keepUnusedDataFor: 3600, 
    }),

  // Category with subcategories and featured products
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
              },
            },
          },
        },
      }),
      providesTags: (result, error, slug) => [{ type: 'Category', id: slug }],
      keepUnusedDataFor: 3600,
    }),

    // Product search
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
          },
        },
      }),
      providesTags: (result, error, term) => [{ type: 'Product', id: term }],
      keepUnusedDataFor: 3600, 
    }),
// Get products by IDs
    getProductsByIds: builder.query({
      query: (documentIds: string[] | number[]) => {
        const queryString = qs.stringify(
          {
            filters: {
              documentId: {
                $in: documentIds,
              },
            },
              populate: ['featured'],
            },
            { encodeValuesOnly: true }
          );

          return {
            url: `/products?${queryString}`,
          };
        },
        providesTags: (result, error, documentIds) =>
          documentIds.map((id) => ({ type: 'Product', id })),
        keepUnusedDataFor: 3600,
      }),


  // Product detail by slug
    getProductDetailBySlug: builder.query({
      query: (slug: string) => ({
        url: '/products',
        params: {
          filters: { slug: { $eq: slug } },
          populate: '*',
        },
      }),
      providesTags: (result, error, slug) => [{ type: 'Product', id: slug }],
      keepUnusedDataFor: 3600,
    }),
  }),
});

export const {
  useGetSubCategoryDetailBySlugQuery,
  useGetCategoryDetailBySlugQuery,
  useSearchProductsQuery,
  useGetProductsByIdsQuery,
  useGetProductDetailBySlugQuery,
} = apiSlice;

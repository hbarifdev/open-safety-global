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

  // ✅ Stripe Payment Session
    createStripeSession: builder.mutation({
      query: (payload) => ({
        url: '/orders/stripe',
        method: 'POST',
        body: payload,
      }),
    }),

  // Get user profile
    getUserProfile: builder.query({
      query: (jwt: string) => ({
        url: '/users/me',
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }),
    }),

  // Update user profile
    updateUserProfile: builder.mutation({
      query: ({ jwt, id, payload }) => ({
        url: `/users/${id}`,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
        body: payload,
      }),
    }),
    
  // Get user orders
    getUserOrders: builder.query({
      query: (jwt: string) => ({
        url: '/orders',
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
        params: {
          populate: '*', 
          sort: ['createdAt:desc'],
        },
      }),
    }),

  // User addresses
    getUserAddresses: builder.query({
      query: (jwt: string) => ({
        url: '/users/me', 
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }),
    }),

    // Update user addresses
    updateUserAddresses: builder.mutation({
      query: ({ jwt, payload }) => ({
        url: '/user-addresses/me',
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
        body: payload,
      }),
    }),

  // Register user
    registerUser: builder.mutation({
      query: (payload) => ({
        url: '/auth/local/register',
        method: 'POST',
        body: payload,
      }),
    }),

  // Login user
    loginUser: builder.mutation({
      query: (payload) => ({
        url: '/auth/local',
        method: 'POST',
        body: payload,
      }),
    }),

  }),
});

export const {
  useGetSubCategoryDetailBySlugQuery,
  useGetCategoryDetailBySlugQuery,
  useSearchProductsQuery,
  useGetProductsByIdsQuery,
  useGetProductDetailBySlugQuery,
  useCreateStripeSessionMutation,
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useGetUserOrdersQuery,
  useGetUserAddressesQuery,
  useUpdateUserAddressesMutation,
  useRegisterUserMutation,
  useLoginUserMutation,
} = apiSlice;

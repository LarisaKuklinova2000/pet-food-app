import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: 'https://api.react-learning.ru'}),
    tagTypes: ['Products', 'Likes'],
    endpoints: builder => ({
        signUp: builder.mutation({
            query: userData => ({
                url: '/signup',
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: userData
            })
        }),
        signIn: builder.mutation({
            query: authData => ({
                url: '/signin',
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: authData
            })
        }),
        getAllProducts: builder.query({
            query: token => ({
                url: '/products',
                headers: {
                    'Content-type': 'application/json',
                    'authorization': `Bearer ${token}`
                }
            }),
            transformResponse: (res) => res.products
        }),
        getSingleProduct: builder.query({
            query: (arr) => ({
                url: `products/${arr[0]}`,
                headers: {
                    'Content-type': 'application/json',
                    'authorization': `Bearer ${arr[1]}`
                }
            }),
            providesTags: ['Products']
        }),
        getProductRewiews: builder.query({
            query: (id, token) => ({
                url: `products/review/${id}`,
                headers: {
                    'Content-type': 'application/json',
                    'authorization': `Bearer ${token}`
                }
            })
        }),
        like: builder.mutation({
            query: (id, token) => ({
                url: `/products/likes/${id}`,
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                    'authorization': `Bearer ${token}`
                }
            }),
            providesTags: ['Likes']
        }),
        delelteLike: builder.mutation({
            query: (id, token) => ({
                url: `/products/likes/${id}`,
                method: 'DELELTE',
                headers: {
                    'Content-type': 'application/json',
                    'authorization': `Bearer ${token}`
                }
            }),
            providesTags: ['Likes']
        }),
        getMyInfo: builder.query({
            query: token => ({
                url: '/v2/sm8/users/me',
                headers: {
                    'Content-type': 'application/json',
                    'authorization': `Bearer ${token}`
                }
            })
        })
    })
})

export const {
    useSignUpMutation, 
    useSignInMutation, 
    useGetAllProductsQuery, 
    useGetSingleProductQuery, 
    useGetProductRewiewsQuery, 
    useLikeMutation, 
    useDelelteLikeMutation, 
    useGetMyInfoQuery} = apiSlice
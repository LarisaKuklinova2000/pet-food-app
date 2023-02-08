import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: 'https://api.react-learning.ru'}),
    tagTypes: ['Products', 'Likes', 'Reviews', 'SingleProduct'],
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
            transformResponse: (res) => res.products,
            providesTags: ['Products']
        }),
        getSingleProduct: builder.query({
            query: ({productId, token}) => ({
                url: `products/${productId}`,
                headers: {
                    'Content-type': 'application/json',
                    'authorization': `Bearer ${token}`
                }
            }),
            providesTags: ['Products', 'SingleProduct']
        }),
        getOtherUserInfo: builder.query({
            query: ({authorId, token}) => ({
                url: `/v2/sm8/users/${authorId}`,
                headers: {
                    'Content-type': 'application/json',
                    'authorization': `Bearer ${token}`
                }
            })
        }),
        addComment: builder.mutation({
            query: ({_id, token, values}) => ({
                url: `products/review/${_id}`,
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'authorization': `Bearer ${token}`
                },
                body: values
            }),
            invalidatesTags: ['SingleProduct']
        }),
        deleteComment: builder.mutation({
            query: ({productId, commentId, token}) => ({
                url: `/products/review/${productId}/${commentId}`,
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json',
                    'authorization': `Bearer ${token}`
                }
            }),
            invalidatesTags: ['SingleProduct']
        }),
        createProduct: builder.mutation({
            query: (arr) => ({
                url: `/products/`,
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'authorization': `Bearer ${arr[0]}`
                },
                body: arr[1]
            }),
            invalidatesTags: ['Products']
        }),
        deleteProduct: builder.mutation({
            query: ({productId, token}) => ({
                url: `/products/${productId}`,
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json',
                    'authorization': `Bearer ${token}`
                }
            }),
            invalidatesTags: ['Products']
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
    useGetOtherUserInfoQuery,
    useAddCommentMutation,
    useDeleteCommentMutation,
    useCreateProductMutation,
    useDeleteProductMutation,
    useGetProductRewiewsQuery, 
    useLikeMutation, 
    useDelelteLikeMutation, 
    useGetMyInfoQuery} = apiSlice
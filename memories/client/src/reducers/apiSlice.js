import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/posts",
    }),
    endpoints: (builder) => ({
        getPosts: builder.query({ query: () => '/' }),
        addNewPost: builder.mutation({
            query: (initialPost) => ({
                url: '/',
                method: 'POST',
                body: initialPost
            })
        }),
        updatePost: builder.mutation({
            query: ({ id, post }) => ({
                url: `/${id}`,
                method: 'PATCH',
                body: post
            })
        }),
        deletePost: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE'
            })
        }),
        likePost: builder.mutation({
            query: (id) => ({
                url: `/${id}/likePost`,
                method: 'PATCH',
            })
        })
    })
})

export const { useGetPostsQuery, useAddNewPostMutation, useUpdatePostMutation, useDeletePostMutation, useLikePostMutation } = apiSlice;

export default apiSlice;
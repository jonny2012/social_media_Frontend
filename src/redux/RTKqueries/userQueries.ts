import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"


export interface User {
    id: number | undefined,
    username: string | undefined,
    email: string,
    password: string
}


export const userApi = createApi({
    reducerPath: "userAPI",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
    tagTypes: ["likes"],
    endpoints: (build) => ({
        getLoginUser: build.mutation<User, Partial<User>>({
            query: (body) => ({
                url: "/auth/login",
                method: "POST",
                body
            }),
        },

        ),
        getAllPosts: build.query({
            query: (id) => ({
                url: "post",
                method: "GET"
            }),
            providesTags: (result, error, arg) => [{ type: "likes", id: "All" }],
        }),

        updatePostLikes: build.mutation({
            query: ({ postId, rest }) => ({
                url: `post/add-like/${postId}`,
                method: "PUT",
                body: rest
            }),
            invalidatesTags: (result, error, { postId }) => [{ type: "likes", postId }]
        }),

        registerUser: build.mutation<User, Partial<User>>({
            query: (body) => ({
                url: "/user/register",
                method: "POST",
                body
            })

        })

    })

})
export const { useGetAllPostsQuery, useUpdatePostLikesMutation } = userApi


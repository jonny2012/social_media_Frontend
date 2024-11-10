import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"


export interface User {
    id: number | undefined,
    username: string | undefined,
    email: string,
    password: string
}


export const userApi = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/' }),
    tagTypes: ['Post', "Comments"],  // Add 'Post' tag for each post
    endpoints: (build) => ({
        getAllPosts: build.query({
            query: () => ({
                url: 'post',  // Endpoint to fetch all posts
                method: 'GET',
            }),
            providesTags: [{ type: "Post" }]


        }),

        updatePostLikes: build.mutation({
            query: ({ postId, rest }) => ({
                url: `post/add-like/${postId}`,
                method: 'PUT',
                body: rest,
            }),
            invalidatesTags: (result, error, { postId }) => [
                { type: 'Post', id: postId },

            ],
        }),
        getAllPostComments: build.query({
            query: (postId) => ({
                url: `/comment/${postId}`,  // Endpoint to fetch all posts
                method: 'GET',

            }),
            providesTags: (result, error, postId) =>
                result ? result.map((comment: any) => ({ type: 'Comment', id: comment.id })) : [],  // Tag comments by their ID


        }),

        createPostComments: build.mutation({
            query: (body) => ({
                url: 'comment',
                method: 'POST',
                body,
            }),
            invalidatesTags: (result, error, { postId }) => [
                { type: 'Comments', id: postId },  // Invalidate comment cache for the post that was commented on
                { type: 'Post', id: postId },]
        }),


    }),
});
export const { useGetAllPostsQuery,
    useUpdatePostLikesMutation,
    useCreatePostCommentsMutation,
    useGetAllPostCommentsQuery
} = userApi
// src/services/rewardCategoryApis.js

import { baseApi } from "../BaseUrl"; // import the base API configuration

const rewardCategoryApis = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Create Reward Category
        createRewardCategory: builder.mutation({
            query: (data) => ({
                url: `reward-category/create`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['rewardCategory'],
        }),

        // Get All Reward Categories
        getAllRewardCategories: builder.query({
            query: ({ searchTerm, page }) => ({
                url: `reward-category/get-all`,
                params: { searchTerm, page },
            }),
            providesTags: ['rewardCategory'],
        }),

        // Update Reward Category
        updateRewardCategory: builder.mutation({
            query: ({ id, data }) => ({
                url: `reward-category/update/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['rewardCategory'],
        }),

        // Delete Reward Category
        deleteRewardCategory: builder.mutation({
            query: (id) => ({
                url: `reward-category/delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['rewardCategory'],
        }),
    }),
});

export const {
    useCreateRewardCategoryMutation,
    useGetAllRewardCategoriesQuery,
    useUpdateRewardCategoryMutation,
    useDeleteRewardCategoryMutation,
} = rewardCategoryApis;

export default rewardCategoryApis;

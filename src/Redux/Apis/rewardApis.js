// src/services/rewardApis.js

import { baseApi } from '../BaseUrl'; // import the base API configuration

const rewardApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create Reward
    createReward: builder.mutation({
      query: (data) => ({
        url: `reward/create`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['reward'],
    }),

    // Get All Rewards
    getAllRewards: builder.query({
      query: ({ searchTerm, page, limit }) => ({
        url: `reward/get-all`,
        params: { searchTerm, page, limit },
      }),
      providesTags: ['reward'],
    }),

    // Update Reward
    updateReward: builder.mutation({
      query: ({ id, data }) => ({
        url: `reward/update/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['reward'],
    }),

    // Delete Reward
    deleteReward: builder.mutation({
      query: (id) => ({
        url: `reward/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['reward'],
    }),
  }),
});

export const {
  useCreateRewardMutation,
  useGetAllRewardsQuery,
  useUpdateRewardMutation,
  useDeleteRewardMutation,
} = rewardApis;

export default rewardApis;

import { baseApi } from '../BaseUrl';
const teamApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTeam: builder.query({
      query: ({ searchTerm, page, limit, league, signIn }) => {
        const param = { searchTerm, page, limit, signIn };
        if (league) {
          param.league = league;
        }
        return {
          url: `team/get-all`,
          params: param,
        };
      },
      providesTags: ['team'],
    }),
    createTeam: builder.mutation({
      query: (data) => ({
        url: `team/create`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['team'],
    }),
    updateTeam: builder.mutation({
      query: ({ id, data }) => ({
        url: `team/update/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['team'],
    }),
    deleteTeam: builder.mutation({
      query: (id) => ({
        url: `team/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['team'],
    }),
    deleteTeamSelected: builder.mutation({
      query: (data) => ({
        url: `/team/delete-teams`,
        method: 'DELETE',
        body: data,
      }),
      invalidatesTags: ['team'],
    }),
    inviteTeam: builder.mutation({
      query: ({ id, data }) => ({
        url: `team/invite-team/${id}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['team'],
    }),
    sendTip: builder.mutation({
      query: ({ id, data }) => ({
        url: `team/send-money/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['team'],
    }),
  }),
});

export const {
  useGetAllTeamQuery,
  useCreateTeamMutation,
  useUpdateTeamMutation,
  useDeleteTeamMutation,
  useInviteTeamMutation,
  useSendTipMutation,
  useDeleteTeamSelectedMutation,
} = teamApis;

import { baseApi } from "../BaseUrl";

const playerApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPlayer: builder.query({
      query: ({ searchTerm, page, limit }) => ({
        url: `player/get-all`,
        params: { searchTerm, page, limit },
      }),
      providesTags: ["player"],
    }),
    createPlayer: builder.mutation({
      query: (data) => ({
        url: `player/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["player"],
    }),
    updatePlayer: builder.mutation({
      query: ({ id, data }) => ({
        url: `player/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["player"],
    }),
    deletePlayerSelected: builder.mutation({
      query: (data) => ({
        url: `/player/delete-players`,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["player"],
    }),
    deletePlayer: builder.mutation({
      query: (id) => ({
        url: `player/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["player"],
    }),
    invitePlayer: builder.mutation({
      query: ({ id, data }) => ({
        url: `player/invite-player/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["player"],
    }),
    sendPlayerTip: builder.mutation({
      query: ({ id, data }) => ({
        url: `player/send-money/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["player"],
    }),
  }),
});

export const {
  useGetAllPlayerQuery,
  useCreatePlayerMutation,
  useUpdatePlayerMutation,
  useDeletePlayerMutation,
  useInvitePlayerMutation,
  useSendPlayerTipMutation,
  useDeletePlayerSelectedMutation,
} = playerApis;

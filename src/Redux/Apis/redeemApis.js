import { baseApi } from "../BaseUrl";

const redeemApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRedeemRequest: builder.query({
      query: ({ page, searchTerm }) => ({
        url: `redeem-request/get-all`,
        method: "GET",
        params: { page, searchTerm },
      }),
      providesTags: ["redeem"],
    }),
    updateStatusRedeemRequest: builder.mutation({
      query: ({ id, data }) => ({
        url: `/redeem-request/change-status/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["redeem"],
    }),
  }),
});
export const {
  useGetAllRedeemRequestQuery,
  useUpdateStatusRedeemRequestMutation,
} = redeemApis;

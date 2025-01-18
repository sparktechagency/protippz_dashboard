import { baseApi } from "../BaseUrl";

const withdrawApis = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getWithdrew: builder.query({
            query: ({ searchTerm, entityType, page }) => ({
                url: `withdraw/get-all`,
                method: 'GET',
                params: { entityType, searchTerm, page }
            }),
            providesTags: ['withdraw']
        }),
        updateWithdraw: builder.mutation({
            query: ({ id, data }) => ({
                url: `withdraw/update-status/${id}`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['withdraw']
        }),
        getTransition: builder.query({
            query: ({ searchTerm, page }) => ({
                url: `transaction/get-all`,
                method: 'GET',
                params: { searchTerm, page }
            })
        })
    })
})
export const {
    useGetWithdrewQuery,
    useUpdateWithdrawMutation,
    useGetTransitionQuery
} = withdrawApis
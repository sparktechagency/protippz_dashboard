import { baseApi } from "../BaseUrl";
const leagueApis = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllLeague: builder.query({
            query: ({ page, searchTerm, limit }) => ({
                url: `league/get-all`,
                method: 'GET',
                params: { page, searchTerm, limit }
            }),
            providesTags: ['league']
        }),
        createLeague: builder.mutation({
            query: (data) => ({
                url: `league/create`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['league']
        }),
        updateLeague: builder.mutation({
            query: ({ id, data }) => ({
                url: `league/update/${id}`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['league']
        }),
        deleteLeague: builder.mutation({
            query: (id) => ({
                url: `league/delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['league']
        }),
    })
})
export const {
    useGetAllLeagueQuery,
    useCreateLeagueMutation,
    useUpdateLeagueMutation,
    useDeleteLeagueMutation
} = leagueApis
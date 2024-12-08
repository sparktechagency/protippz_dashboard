import { baseApi } from "../BaseUrl";

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // get all user
        getAllUser: builder.query({
            query: ({ page, searchTerm }) => {
                return {
                    url: `/normal-user/get-all`,
                    method: 'GET',
                    params: { page, searchTerm }
                }
            },
            providesTags: ['users']
        }),
        // block user
        blockUser: builder.mutation({
            query: ({ id, data }) => {
                return {
                    url: `/user/change-status/${id}`,
                    method: 'PATCH',
                    body: data
                }
            },
            invalidatesTags: ['users']
        })
    })
})

export const {
    // get all user 
    useGetAllUserQuery,
    //  block user
    useBlockUserMutation
} = userApi
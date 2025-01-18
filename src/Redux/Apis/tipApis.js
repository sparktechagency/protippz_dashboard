import { baseApi } from "../BaseUrl";

const tipApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getTips: builder.query({//Team Player
            query: ({ entityType, searchTerm, page }) => ({
                url: `tip/get-all`,
                method: 'GET',
                params: { entityType, searchTerm, page }
            })
        })
    })
})
export const {
    useGetTipsQuery
} = tipApi
import { baseApi } from "../BaseUrl";

const redeemApis = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllRedeemRequest: builder.query({
            query: ({ page, searchTerm }) => ({
                url: `redeem-request/get-all`,
                method: 'GET',
                params: { page, searchTerm }
            })
        })
    })
})
export const {
    useGetAllRedeemRequestQuery

} = redeemApis
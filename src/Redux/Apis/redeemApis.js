import { baseApi } from "../BaseUrl";

const redeemApis = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllRedeemRequest: builder.query({
            query: ({ category }) => ({
                url: `redeem-request/get-all`,
                method: 'GET',
                params: { category }
            })
        })
    })
})
export const {
    useGetAllRedeemRequestQuery

} = redeemApis
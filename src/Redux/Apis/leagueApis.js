import { baseApi } from "../BaseUrl";

const leagueApis = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllLeague: builder.query({
            query: () => ({
                url: `league/get-all`,
                method: 'GET',
            })
        })
    })
})
export const {
    useGetAllLeagueQuery
} = leagueApis
import { baseApi } from "../BaseUrl";

const dashboardApi = baseApi.injectEndpoints({
    //  get dashboard data 
    endpoints: (builder) => ({
        getDashboardData: builder.query({
            query: () => ({ url: 'meta/get-admin-meta-data', method: 'GET' }),
            providesTags: ['dashboard']
        }),
        getIncomeOverview: builder.query({
            query: (year) => ({ url: `meta/tip-chart-data?year=${year}`, method: 'GET' }),
            providesTags: ['dashboard']
        }),
        getAppointmentOverview: builder.query({
            query: (year) => ({ url: `/meta/user-chart-data?year=${year}`, method: 'GET' }),
            providesTags: ['dashboard']
        }),
    })
});

export const {
    // useGetDashboardDataQuery
    useGetDashboardDataQuery,
    // useGetIncomeOverviewQuery
    useGetIncomeOverviewQuery,
    // useGetAppointmentOverviewQuery
    useGetAppointmentOverviewQuery

} = dashboardApi
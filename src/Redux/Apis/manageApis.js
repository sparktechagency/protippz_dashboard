
import { baseApi } from "../BaseUrl";

const manageApis = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Add FAQ
        addFaq: builder.mutation({
            query: (faqData) => ({
                url: '/manage/add-faq',
                method: 'POST',
                body: faqData,
            }),
            invalidatesTags: ['faq']
        }),

        // Get FAQs
        getFaq: builder.query({
            query: () => ({
                url: '/manage/get-faq',
                method: 'GET',
            }),
            providesTags: ['faq']
        }),

        // Delete FAQ
        deleteFaq: builder.mutation({
            query: (id) => ({
                url: `/manage/delete-faq/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['faq']
        }),

        // Add Terms and Conditions
        addTermsConditions: builder.mutation({
            query: (termsData) => ({
                url: '/manage/add-terms-conditions',
                method: 'POST',
                body: termsData,
            }),
        }),

        // Get Terms and Conditions
        getTermsConditions: builder.query({
            query: () => ({
                url: '/manage/get-terms-conditions',
                method: 'GET',
            }),
        }),

        // Add Privacy Policy
        addPrivacyPolicy: builder.mutation({
            query: (privacyData) => ({
                url: '/manage/add-privacy-policy',
                method: 'POST',
                body: privacyData,
            }),
        }),

        // Get Privacy Policy
        getPrivacyPolicy: builder.query({
            query: () => ({
                url: '/manage/get-privacy-policy',
                method: 'GET',
            }),
        }),
        // Add Privacy Policy
        addPartner: builder.mutation({
            query: (privacyData) => ({
                url: '/manage/add-partner',
                method: 'POST',
                body: privacyData,
            }),
        }),

        // Get Privacy Policy
        getPartner: builder.query({
            query: () => ({
                url: '/manage/get-partner',
                method: 'GET',
            }),
        }),
        getNotification: builder.query({
            query: (limit) => ({
                url: '/notification/get-notifications',
                method: 'GET',
                params: { limit }
            }),
        }),
        uploadCsv: builder.mutation({
            query: (data) => ({
                url: '/upload-csv',
                method: 'POST',
                body: data
            }),
        }),
    }),
});

export const {
    useAddFaqMutation,
    useGetFaqQuery,
    useDeleteFaqMutation,
    useAddTermsConditionsMutation,
    useGetTermsConditionsQuery,
    useAddPrivacyPolicyMutation,
    useGetPrivacyPolicyQuery,
    useAddPartnerMutation,
    useGetPartnerQuery,
    useGetNotificationQuery,
    useUploadCsvMutation
} = manageApis;

export default manageApis;

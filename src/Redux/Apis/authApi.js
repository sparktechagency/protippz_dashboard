import { baseApi } from '../BaseUrl';

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // user login
    loginUser: builder.mutation({
      query: (data) => {
        return {
          url: 'auth/login',
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: ['auth', 'category'],
    }),
    // send verify email
    forgetPassword: builder.mutation({
      query: (data) => {
        return {
          url: 'auth/forget-password',
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: ['auth'],
    }),
    // verify code
    verifyCode: builder.mutation({
      query: (data) => {
        return {
          url: 'auth/verify-reset-otp',
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: ['auth'],
    }),
    // reset password
    resetPassword: builder.mutation({
      query: (data) => {
        return {
          url: 'auth/reset-password',
          method: 'POST',
          body: data,
          headers: {
            Authorization: `${
              JSON.parse(localStorage.getItem('accessToken')) || ''
            }`,
          },
        };
      },
      invalidatesTags: ['auth'],
    }),
    updateUser: builder.mutation({
      query: (data) => {
        return {
          url: 'super-admin/update-profile',
          method: 'PATCH',
          body: data,
        };
      },
      invalidatesTags: ['auth'],
    }),
    // change password
    changePassword: builder.mutation({
      query: (data) => {
        return {
          url: 'auth/change-password',
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: ['auth'],
    }),
    getProfile: builder.query({
      query: () => {
        const token = localStorage.getItem('token');
        if (token) {
          return {
            url: 'user/get-my-profile',
            method: 'GET',
          };
        } else {
          console.log('No token found, API not called.');
          return null;
        }
      },
      providesTags: ['auth'],
    }),
  }),
});
export const {
  useLoginUserMutation,
  useForgetPasswordMutation,
  useVerifyCodeMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useUpdateUserMutation,
  useGetProfileQuery,
} = authApi;

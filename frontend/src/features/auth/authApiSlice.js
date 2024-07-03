import { apiSlice } from "../../app/apiSlice.js";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder =>({
        login: builder.mutation({
            query: credentials => ({
                url: '/auth/jwt/create',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        signup: builder.mutation({
            query: credentials => ({
                url: '/auth/users/',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        verify:  builder.mutation({
            query: credentials => ({
                url: '/auth/users/activation/',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        forgotpassword:  builder.mutation({
            query: credentials => ({
                url: '/auth/users/reset_password/',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        resetpassword:  builder.mutation({
            query: credentials => ({
                url: '/auth/users/reset_password_confirm/',
                method: 'POST',
                body: { ...credentials }
            })
        }),
    })
})

export const {
    useLoginMutation,
    useSignupMutation,
    useVerifyMutation,
    useForgotpasswordMutation,
    useResetpasswordMutation
} = authApiSlice
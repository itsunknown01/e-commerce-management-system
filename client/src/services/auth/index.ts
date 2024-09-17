import { setCredentials } from "../../redux/slices/auth";
import { apiSlice } from "../api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: credentials,
      }),
    }),
    refreshToken: builder.mutation({
      query: () => ({
        url:  "/refresh",
        method: "GET"
      }),
      async onQueryStarted(arg, {dispatch,queryFulfilled}) {
        try {
          const {data} = await queryFulfilled
          const {accessToken,userInfo} = data
          dispatch(setCredentials({token: accessToken,userInfo}))
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useRefreshTokenMutation,
} = authApiSlice;

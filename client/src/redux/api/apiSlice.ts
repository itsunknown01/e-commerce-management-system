import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { RootState } from "../store";
import { logout, setToken } from "../slices/auth";

const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:8000/api",
    prepareHeaders: (headers, {getState}) => {
        const token = (getState() as RootState).auth.token;
        if(token) {
            headers.set('Authorization', `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithAuth: typeof baseQuery = async (args,api,options) => {
    let result = await baseQuery(args,api,options)

    if(result.error?.status === 403) {
        const refreshResult = await baseQuery("/refresh",api,options);
        if(refreshResult.data) {
            const {accessToken} = refreshResult.data as {
                accessToken: string
            }

            api.dispatch(setToken(accessToken))

            result = await baseQuery(args,api,options)
        } else {
            api.dispatch(logout())
        }
    }

    return result
}

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: baseQueryWithAuth,
    tagTypes: ["APIS"], 
    endpoints: builder => ({})
})
import { apiSlice } from "../api/apiSlice";

export const storeAPISlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchStores: builder.query({
      query: () => "/store",
    }),
    createStore: builder.mutation({
      query: (store) => ({
        url: "/create-store",
        method: "POST",
        body: store,
      }),
    }),
  }),
});

export const { useFetchStoresQuery, useCreateStoreMutation } = storeAPISlice;
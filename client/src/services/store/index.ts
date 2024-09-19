import * as z from "zod";
import { StoreType } from "../../types/store";
import { apiSlice } from "../api/apiSlice";
import { storeSchema } from "../../schemas/store";

type storeValue = z.infer<typeof storeSchema>

export const storeAPISlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchStores: builder.query<StoreType[],any>({
      query: () => "/store",
    }),
    createStore: builder.mutation<StoreType[],storeValue>({
      query: (store) => ({
        url: "/create-store",
        method: "POST",
        body: store,
      }),
    }),
  }),
});

export const { useFetchStoresQuery, useCreateStoreMutation,useLazyFetchStoresQuery } = storeAPISlice;
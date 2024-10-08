import * as z from "zod";
import { BillboardTypes } from "../../types/store";
import { apiSlice } from "../api/apiSlice";
import { billboardSchema } from "../../schemas/store";

const billboardAPISlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchAllBillboards: builder.query<BillboardTypes[], string>({
      query: (storeId) => `${storeId}/billboards`,
      providesTags: ["Billboards"]
    }),
    createBillboard: builder.mutation<
      { newBillboard: BillboardTypes },
      { storeId: string; values: z.infer<typeof billboardSchema> }
    >({
      query: ({ storeId, values }) => ({
        url: `${storeId}/create-billboard`,
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["Billboards"]
    }),
    updateBillboard: builder.mutation<
      { updatedBillboard: BillboardTypes },
      {
        storeId: string;
        values: z.infer<typeof billboardSchema>;
        billboardId: string;
      }
    >({
      query: ({ storeId, values, billboardId }) => ({
        url: `${storeId}/update-billboard/${billboardId}`,
        method: "PUT",
        body: values,
      }),
      invalidatesTags: ["Billboards"]
    }),
    deleteBillboard: builder.mutation<
      any,
      {
        storeId: string;
        billboardId: string;
      }
    >({
      query: ({ storeId, billboardId }) => ({
        url: `${storeId}/delete-billboard/${billboardId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Billboards"]
    }),
  }),
});

export const {
  useFetchAllBillboardsQuery,
  useCreateBillboardMutation,
  useUpdateBillboardMutation,
  useDeleteBillboardMutation,
} = billboardAPISlice;

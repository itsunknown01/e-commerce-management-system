import * as z from "zod";
import { BillboardTypes } from "../../types/store";
import { apiSlice } from "../api/apiSlice";
import { billboardSchema } from "../../schemas/store";

const billboardAPISlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchAllBillboards: builder.query<BillboardTypes[], string>({
      query: (storeId) => `${storeId}/billboards`,
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
    }),
  }),
});

export const {
  useFetchAllBillboardsQuery,
  useCreateBillboardMutation,
  useUpdateBillboardMutation,
  useDeleteBillboardMutation,
} = billboardAPISlice;

import * as z from "zod";
import { SizeTypes } from "../../types/store";
import { apiSlice } from "../api/apiSlice";
import { sizeSchema } from "../../schemas/store";

const SizeAPISlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchAllSizes: builder.query<SizeTypes[], string>({
      query: (storeId) => `${storeId}/sizes`,
    }),
    createSize: builder.mutation<
      { newSize: SizeTypes },
      { storeId: string; values: z.infer<typeof sizeSchema> }
    >({
      query: ({ storeId, values }) => ({
        url: `${storeId}/create-size`,
        method: "POST",
        body: values,
      }),
    }),
    updateSize: builder.mutation<
      { updateSize: SizeTypes },
      { storeId: string; values: z.infer<typeof sizeSchema>; sizeId: string }
    >({
      query: ({ storeId, values, sizeId }) => ({
        url: `${storeId}/update-size/${sizeId}`,
        method: "PUT",
        body: values,
      }),
    }),
    deleteSize: builder.mutation<any, { storeId: string; sizeId: string }>({
      query: ({ storeId, sizeId }) => ({
        url: `${storeId}/delete-size/${sizeId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useFetchAllSizesQuery,
  useCreateSizeMutation,
  useUpdateSizeMutation,
  useDeleteSizeMutation,
} = SizeAPISlice;
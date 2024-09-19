import * as z from "zod";
import { ColorTypes } from "../../types/store";
import { apiSlice } from "../api/apiSlice";
import { colorSchema } from "../../schemas/store";

const ColorAPISlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchAllColors: builder.query<ColorTypes[], string>({
      query: (storeId) => `${storeId}/colors`,
    }),
    createColor: builder.mutation<
      { newColor: ColorTypes },
      { storeId: string; values: z.infer<typeof colorSchema> }
    >({
      query: ({ storeId, values }) => ({
        url: `${storeId}/create-color`,
        method: "POST",
        body: values,
      }),
    }),
    updateColor: builder.mutation<
      { updateColor: ColorTypes },
      { storeId: string; values: z.infer<typeof colorSchema>; colorId: string }
    >({
      query: ({ storeId, values, colorId }) => ({
        url: `${storeId}/update-color/${colorId}`,
        method: "PUT",
        body: values,
      }),
    }),
    deleteColor: builder.mutation<any, { storeId: string; colorId: string }>({
      query: ({ storeId, colorId }) => ({
        url: `${storeId}/delete-color/${colorId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useFetchAllColorsQuery,
  useCreateColorMutation,
  useUpdateColorMutation,
  useDeleteColorMutation,
} = ColorAPISlice;
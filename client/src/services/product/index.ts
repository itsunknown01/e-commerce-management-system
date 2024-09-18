import * as z from "zod";
import { apiSlice } from "../api/apiSlice";
import { productSchema } from "../../schemas/store";
import { ProductType } from "../../types/store";

const productAPISlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchProducts: builder.query<ProductType[], string>({
      query: (storeId) => `${storeId}/products`,
    }),
    createProduct: builder.mutation<
      { newProduct: ProductType },
      { storeId: string; values: z.infer<typeof productSchema> }
    >({
      query: ({ storeId, values }) => ({
        url: `${storeId}/create-product`,
        method: "POST",
        body: values,
      }),
    }),
    updateProduct: builder.mutation<
      { newProduct: ProductType },
      {
        storeId: string;
        values: z.infer<typeof productSchema>;
        productId: string;
      }
    >({
      query: ({ storeId, values, productId }) => ({
        url: `${storeId}/update-product/${productId}`,
        method: "PUT",
        body: values,
      }),
    }),
    deleteProduct: builder.mutation<
      any,
      { storeId: string; productId: string }
    >({
      query: ({ storeId, productId }) => ({
        url: `${storeId}/delete-product/${productId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useFetchProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productAPISlice;

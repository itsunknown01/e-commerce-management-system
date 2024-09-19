import * as z from "zod";
import { CategoryType } from "../../types/store";
import { apiSlice } from "../api/apiSlice";
import { categorySchema } from "../../schemas/store";

const categoryAPISlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchCategories: builder.query<CategoryType[], string>({
      query: (storeId) => `${storeId}/category`,
      providesTags: ["Category"]
    }),
    createCategory: builder.mutation<
      { newCategory: CategoryType },
      { storeId: string; category: z.infer<typeof categorySchema> }
    >({
      query: ({ category, storeId }) => ({
        url: `${storeId}/create-category`,
        method: "POST",
        body: category,
      }),
      invalidatesTags: ["Category"]
    }),
    updateCategory: builder.mutation<
      { updatedCategory: CategoryType },
      {
        category: z.infer<typeof categorySchema>;
        storeId: string;
        categoryId: string;
      }
    >({
      query: ({ category, storeId, categoryId }) => ({
        url: `${storeId}/update-category/${categoryId}`,
        method: "PUT",
        body: category,
      }),
      invalidatesTags: ["Category"]
    }),
    deleteCategory: builder.mutation<
      any,
      { categoryId: string; storeId: string }
    >({
      query: ({ categoryId, storeId }) => ({
        url: `${storeId}/delete-category/${categoryId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"]
    }),
  }),
});

export const {
  useFetchCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryAPISlice;
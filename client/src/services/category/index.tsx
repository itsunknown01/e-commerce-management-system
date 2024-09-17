import { CategoryType } from "../../types/store";
import { apiSlice } from "../api/apiSlice";

const categoryAPISlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        fetchCategories: builder.query<CategoryType[],string>({
            query: (storeId) => `${storeId}/category`,
        }),
        createCategory: builder.mutation({
            query: ({category,storeId}) => ({
                url: `${storeId}/create-category`,
                method: "POST",
                body: category,
            }),
        }),
        updateCategory: builder.mutation({
            query: ({category,storeId,categoryId}) => ({
                url: `${storeId}/update-category/${categoryId}`,
                method: "PUT",
                body: category,
            }),
        }),
        deleteCategory: builder.mutation({
            query: ({categoryId,storeId}) => ({
                url: `${storeId}/delete-category/${categoryId}`,
                method: "DELETE",
            }),
        }),
    }),
 });

export const {
    useFetchCategoriesQuery,
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation
} = categoryAPISlice
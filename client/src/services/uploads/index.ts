import { apiSlice } from "../api/apiSlice";

export const uploadAPISlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    singleUpload: builder.mutation<{imageUrl: string}, FormData>({
      query: (formData) => ({
        url: "/uploads/single-image",
        method: "POST",
        body: formData,
      }),
    }),
    multipleUpload: builder.mutation<{imageUrls: string[]}, FormData>({
      query: (formData) => ({
        url: "/uploads/multiple-images",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { useSingleUploadMutation,useMultipleUploadMutation } = uploadAPISlice;
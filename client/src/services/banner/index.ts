import * as z from "zod";

import { BannerTypes } from "../../types/store";
import { apiSlice } from "../api/apiSlice";
import { bannerSchema } from "../../schemas/store";

const BannerAPISlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchAllBanners: builder.query<BannerTypes[], string>({
      query: (storeId) => `${storeId}/banners`,
    }),
    createBanner: builder.mutation<
      BannerTypes,
      { storeId: string; values: z.infer<typeof bannerSchema> }
    >({
      query: ({ storeId, values }) => ({
        url: `${storeId}/create-banner`,
        method: "POST",
        body: values,
      }),
    }),
    updateBanner: builder.mutation<
      BannerTypes,
      {
        storeId: string;
        values: z.infer<typeof bannerSchema>;
        bannerId: string;
      }
    >({
      query: ({ storeId, values, bannerId }) => ({
        url: `${storeId}/update-banner/${bannerId}`,
        method: "PUT",
        body: values,
      }),
    }),
    deleteBanner: builder.mutation<any, { storeId: string; bannerId: string }>({
      query: ({ storeId, bannerId }) => ({
        url: `${storeId}/delete-banner/${bannerId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateBannerMutation,
  useFetchAllBannersQuery,
  useUpdateBannerMutation,
  useDeleteBannerMutation,
} = BannerAPISlice;

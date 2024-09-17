import * as z from "zod";

export enum BannerType {
  MainBanner = "Main Banner",
  SmallBanner = "Small Banner"
}

export const storeSchema = z.object({
  name: z.string().min(1),
});

export const bannerSchema = z.object({
  type: z.nativeEnum(BannerType),
  imageUrl: z.string().min(1),
});

export const categorySchema = z.object({
  name: z.string().min(1),
});

export const productSchema = z.object({
  title: z.string().min(1),
  brand: z.string().min(1),
  description: z.string().min(1),
  categoryId: z.string().min(1),
  discountPercentage: z.string().min(1),
  images: z.array(z.string()),
  price: z.string().min(1),
  rating: z.string().min(1),
  quantity: z.string().min(1),
  thumbnail: z.string().min(1),
  isFamous: z.boolean(),
  isFeatured: z.boolean(),
  isSpecial: z.boolean(),
})
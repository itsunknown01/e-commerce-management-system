import * as z from "zod";

export enum BannerType {
  MAIN = "MAIN",
  SMALL = "SMALL",
}

export const storeSchema = z.object({
  name: z.string().min(1),
});

export const bannerSchema = z.object({
  type: z.nativeEnum(BannerType),
  productId: z.string().min(1),
});

export const billboardSchema = z.object({
  label: z.string().min(1),
  imageUrl: z.string().min(1),
});

export const categorySchema = z.object({
  name: z.string().min(1),
  imageUrl: z.string().min(1),
  billboardId: z.string().min(1)
});

export const sizeSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(1)
});

export const colorSchema = z.object({
  name: z.string().min(1),
  value: z
    .string()
    .min(4)
    .max(9)
    .regex(/^#/, { message: "String must be a valid hex code" })
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
});

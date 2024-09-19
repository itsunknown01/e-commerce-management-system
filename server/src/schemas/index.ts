import { BannerType } from "@prisma/client";
import * as z from "zod";

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters is required",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
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

export const productSchema = z.object({
  title: z.string().min(1),
  brand: z.string().min(1),
  description: z.string().min(1),
  categoryId: z.string().min(1),
  colorId: z.string().min(1),
  sizesId: z.string().optional(),
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

import { Request, Response } from "express";
import { db } from "../../services/db";
import { productSchema } from "../../schemas";

export const fetchAllProducts = async (req: Request,res: Response) => {
  try {
    const {storeId} = req.params
    if(!storeId) return res.sendStatus(400)

      const user = req.user;
      if (!user) return res.sendStatus(404);
  
      const existingUser = await db.user.findUnique({
        where: {
          email: user.email,
        },
      });
  
      if (!existingUser) return res.sendStatus(403);
  
      const storeByUserId = await db.store.findFirst({
        where: {
          id: storeId,
          userId: existingUser.id,
        },
      });
  
      if (!storeByUserId) return res.sendStatus(405);

      const products = await db.product.findMany({
        where: {storeId: storeByUserId.id},
        include: {
          categories: true
        },
        orderBy: {createdAt: "desc"}
      });

      return res.status(200).json(products)
  } catch (error) {
    console.log("ALL PRODUCTS API ERROR", error);
  }
}

export const createProducts = async (req: Request, res: Response) => {
  try {
    const validation = productSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({ message: "Invalid Fields" });
    }

    const {
      title,
      brand,
      description,
      categoryId,
      discountPercentage,
      images,
      price,
      rating,
      quantity,
      thumbnail,
      isFamous,
      isFeatured,
      isSpecial,
    } = validation.data;

    const { storeId } = req.params;
    if (!storeId) return res.sendStatus(400);

    const user = req.user;
    if (!user) return res.sendStatus(404);

    const existingUser = await db.user.findUnique({
      where: {
        email: user.email,
      },
    });

    if (!existingUser) return res.sendStatus(403);

    const storeByUserId = await db.store.findFirst({
      where: {
        id: storeId,
        userId: existingUser.id,
      },
    });

    if (!storeByUserId) return res.sendStatus(405);

    const newProduct = await db.product.create({
      data: {
        storeId: storeByUserId.id,
        categoryId,
        title,
        brand,
        description,
        discountPercentage: Number(discountPercentage),
        images,
        price: Number(price),
        rating: Number(rating),
        quantity: Number(quantity),
        thumbnail,
        IsFamous: isFamous,
        IsFeatured: isFeatured,
        IsSpecial: isSpecial,
      },
    });

    return res.status(201).json({newProduct});
  } catch (error) {
    console.log("CREATE PRODUCT API ERROR", error);
  }
};
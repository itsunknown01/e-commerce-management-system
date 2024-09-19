import { Request, Response } from "express";
import { db } from "../../services/db";
import { productSchema } from "../../schemas";

export const fetchAllProducts = async (req: Request, res: Response) => {
  try {
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

    const products = await db.product.findMany({
      where: { storeId: storeByUserId.id },
      include: {
        categories: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return res.status(200).json(products);
  } catch (error) {
    console.log("ALL PRODUCTS API ERROR", error);
  }
};

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
      colorId,
      sizesId,
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

    const colorById = await db.color.findFirst({
      where: {
        id: colorId,
        storeId: storeByUserId.id
      },
    });

    if (!colorById) return res.sendStatus(405);

    const sizesById = await db.sizes.findFirst({
      where: {
        id: sizesId,
        storeId: storeByUserId.id,
      },
    });

    if (!sizesById) return res.sendStatus(405);

    const newProduct = await db.product.create({
      data: {
        storeId: storeByUserId.id,
        categoryId,
        colorId:colorById.id,
        sizesId:sizesById.id,
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

    return res.status(201).json({ newProduct });
  } catch (error) {
    console.log("CREATE PRODUCT API ERROR", error);
  }
};

export const updateProducts = async (req: Request, res: Response) => {
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
      sizesId,
      colorId,
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

    const { storeId, productId } = req.params;
    if (!storeId) return res.sendStatus(400);
    if (!productId) return res.sendStatus(400);

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

    const colorById = await db.color.findFirst({
      where: {
        id: colorId,
        storeId: storeByUserId.id
      },
    });

    if (!colorById) return res.sendStatus(405);

    const sizesById = await db.sizes.findFirst({
      where: {
        id: sizesId,
        storeId: storeByUserId.id,
      },
    });

    if (!sizesById) return res.sendStatus(405);

    const updateProduct = await db.product.update({
      where: {
        id: productId,
        storeId: storeByUserId.id,
      },
      data: {
        categoryId,
        colorId:colorById.id,
        sizesId:sizesById.id,
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

    return res.status(201).json({ updateProduct });
  } catch (error) {
    console.log("UPDATE PRODUCT API ERROR", error);
  }
};

export const deleteProducts = async (req: Request, res: Response) => {
  try {
    const { storeId, productId } = req.params;
    if (!storeId) return res.sendStatus(400);
    if (!productId) return res.sendStatus(400);

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

    await db.product.delete({
      where: {
        id: productId,
        storeId: storeByUserId.id,
      },
    });

    return res.status(201).json({ message: "Product deleted" });
  } catch (error) {
    console.log("DELETE PRODUCT API ERROR", error);
  }
};

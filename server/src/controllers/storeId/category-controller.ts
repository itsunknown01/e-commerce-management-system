import { Request, Response } from "express";
import { db } from "../../services/db";
import { categorySchema } from "../../schemas";

export const createSingleCategory = async (req: Request, res: Response) => {
  try {
    const validation = categorySchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({ message: "Invalid Fields" });
    }

    const { name } = validation.data;

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

    const newCategory = await db.category.create({
      data: {
        name,
        storeId: storeByUserId.id,
      },
    });

    return res.status(200).json({ newCategory });
  } catch (error) {
    console.log("REGISTER API ERROR", error);
  }
};

export const getAllCategories = async (req: Request, res: Response) => {
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

    const categories = await db.category.findMany({
      where: {
        storeId: storeByUserId.id,
      },
    });

    return res.status(200).json(categories);
  } catch (error) {
    console.log("REGISTER API ERROR", error);
  }
};

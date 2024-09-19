import { Request, Response } from "express";
import { db } from "../../services/db";
import { categorySchema } from "../../schemas";

export const createSingleCategory = async (req: Request, res: Response) => {
  try {
    const validation = categorySchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({ message: "Invalid Fields" });
    }

    const { name,imageUrl,billboardId } = validation.data;

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

    const billboardById = await db.billboard.findUnique({
      where: {
        id: billboardId,
        storeId: storeByUserId.id
      }
    })

    if (!billboardById) return res.sendStatus(405);

    const newCategory = await db.category.create({
      data: {
        name,
        image: imageUrl,
        storeId: storeByUserId.id,
        billboardId: billboardById.id
      },
    });

    return res.status(201).json({ newCategory });
  } catch (error) {
    console.log("CATEGORY CREATE API ERROR", error);
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
    console.log("CATEGORY GET API ERROR", error);
  }
};

export const updateSingleCategory = async (req: Request, res: Response) => {
  try {
    const validation = categorySchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({ message: "Invalid Fields" });
    }

    const { name,imageUrl,billboardId } = validation.data;

    const { storeId, categoryId } = req.params;

    if (!storeId) return res.sendStatus(400);
    if (!categoryId) return res.sendStatus(400);

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

    const billboardById = await db.billboard.findUnique({
      where: {
        id: billboardId,
        storeId: storeByUserId.id
      }
    })

    if (!billboardById) return res.sendStatus(405);

    const updatedCategory = await db.category.update({
      where: {
        id: categoryId,
        storeId: storeId,
      },
      data: {
        name,
        image: imageUrl,
        billboardId: billboardById.id
      },
    });

    return res.status(200).json({updatedCategory})
  } catch (error) {
    console.log("CATEGORY UPDATE API ERROR", error);
  }
};

export const deleteSingleCategory = async (req: Request,res: Response) => {
  try {
    const { storeId, categoryId } = req.params;

    if (!storeId) return res.sendStatus(400);
    if (!categoryId) return res.sendStatus(400);

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

    await db.category.delete({
      where: {
        id: categoryId
      }
    })

    return res.status(200).json({message: "Category deleted successfully"})
  } catch (error) {
    console.log("CATEGORY DELETE API ERROR", error);
  }
}
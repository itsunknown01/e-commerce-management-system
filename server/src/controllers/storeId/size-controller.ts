import { Request, Response } from "express";
import { db } from "../../services/db";
import { sizeSchema } from "../../schemas";

export const fetchAllSizes = async (req: Request, res: Response) => {
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

    const allSize = await db.sizes.findMany({
      where: {
        storeId: storeByUserId.id,
      },
    });

    return res.status(201).json(allSize);
  } catch (error) {
    console.log("FETCH SIZES API ERROR", error);
  }
};

export const createSizes = async (req: Request, res: Response) => {
  try {
    const validation = sizeSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({ message: "Invalid Fields" });
    }

    const { name, value } = validation.data;

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

    const newSize = await db.sizes.create({
      data: {
        storeId: storeByUserId.id,
        name,
        value,
      },
    });

    return res.status(201).json({ newSize });
  } catch (error) {
    console.log("CREATE SIZE API ERROR", error);
  }
};

export const updateSizes = async (req: Request, res: Response) => {
  try {
    const validation = sizeSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({ message: "Invalid Fields" });
    }

    const { name, value } = validation.data;

    const { storeId, sizeId } = req.params;
    if (!storeId) return res.sendStatus(400);
    if (!sizeId) return res.sendStatus(400);

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

    const updatedSize = await db.sizes.update({
      where: {
        id: sizeId,
        storeId: storeByUserId.id,
      },
      data: {
        name,
        value,
      },
    });

    return res.status(201).json({ updatedSize });
  } catch (error) {
    console.log("UPDATE SIZE API ERROR", error);
  }
};

export const deleteSizes = async (req: Request, res: Response) => {
  try {
    const { storeId, sizeId } = req.params;
    if (!storeId) return res.sendStatus(400);
    if (!sizeId) return res.sendStatus(400);

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

    await db.sizes.delete({
      where: {
        id: sizeId,
        storeId: storeByUserId.id,
      },
    });

    return res.status(201).json({ message: "Size deleted" });
  } catch (error) {
    console.log("DELETE SIZE API ERROR", error);
  }
};
import { Request, Response } from "express";
import { db } from "../../services/db";
import { colorSchema } from "../../schemas";

export const fetchAllColors = async (req: Request, res: Response) => {
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

    const allColor = await db.color.findMany({
      where: {
        storeId: storeByUserId.id,
      },
    });

    return res.status(201).json(allColor);
  } catch (error) {
    console.log("FETCH COLORS API ERROR", error);
  }
};

export const createColors = async (req: Request, res: Response) => {
  try {
    const validation = colorSchema.safeParse(req.body);

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

    const newColor = await db.color.create({
      data: {
        storeId: storeByUserId.id,
        name,
        value,
      },
    });

    return res.status(201).json({ newColor });
  } catch (error) {
    console.log("CREATE COLOR API ERROR", error);
  }
};

export const updateColors = async (req: Request, res: Response) => {
  try {
    const validation = colorSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({ message: "Invalid Fields" });
    }

    const { name, value } = validation.data;

    const { storeId, colorId } = req.params;
    if (!storeId) return res.sendStatus(400);
    if (!colorId) return res.sendStatus(400);

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

    const updatedColor = await db.color.update({
      where: {
        id: colorId,
        storeId: storeByUserId.id,
      },
      data: {
        name,
        value,
      },
    });

    return res.status(201).json({ updatedColor });
  } catch (error) {
    console.log("UPDATE COLOR API ERROR", error);
  }
};

export const deleteColors = async (req: Request, res: Response) => {
  try {
    const { storeId, colorId } = req.params;
    if (!storeId) return res.sendStatus(400);
    if (!colorId) return res.sendStatus(400);

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

    await db.color.delete({
      where: {
        id: colorId,
        storeId: storeByUserId.id,
      },
    });

    return res.status(201).json({ message: "Color deleted" });
  } catch (error) {
    console.log("DELETE COLOR API ERROR", error);
  }
};
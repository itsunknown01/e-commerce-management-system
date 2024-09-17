import { Request, Response } from "express";
import { db } from "../../services/db";

export const createSingleStore = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    if (!name) return res.sendStatus(400);

    const user = req.user;
    if (!user) return res.sendStatus(404);

    const existingUser = await db.user.findUnique({
      where: {
        email: user.email,
      },
    });

    if (!existingUser) return res.sendStatus(403);

    const newStore = await db.store.create({
      data: {
        name,
        userId: existingUser.id,
      },
    });

    return res.status(200).json({ newStore });
  } catch (error) {
    console.log("REGISTER API ERROR", error);
  }
};

export const getAllStores = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) return res.sendStatus(404);

    const existingUser = await db.user.findUnique({
      where: {
        email: user.email,
      },
    });

    if (!existingUser) return res.sendStatus(403);

    const stores = await db.store.findMany({
      where: {
        userId: existingUser.id,
      },
    });

    return res.status(200).json(stores);
  } catch (error) {
    console.log("REGISTER API ERROR", error);
  }
};

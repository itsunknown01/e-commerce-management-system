import { Request, Response } from "express";
import { db } from "../../services/db";
import { billboardSchema } from "../../schemas";

export const fetchAllBillboards = async (req: Request, res: Response) => {
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

    const allBillboard = await db.billboard.findMany({
      where: {
        storeId: storeByUserId.id,
      },
    });

    return res.status(201).json(allBillboard);
  } catch (error) {
    console.log("FETCH BILLBOARDS API ERROR", error);
  }
};

export const createBillboards = async (req: Request, res: Response) => {
  try {
    const validation = billboardSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({ message: "Invalid Fields" });
    }

    const { label, imageUrl } = validation.data;

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

    const newBillboard = await db.billboard.create({
      data: {
        storeId: storeByUserId.id,
        label,
        imageUrl,
      },
    });

    return res.status(201).json({ newBillboard });
  } catch (error) {
    console.log("CREATE BILLBOARD API ERROR", error);
  }
};

export const updateBillboards = async (req: Request, res: Response) => {
  try {
    const validation = billboardSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({ message: "Invalid Fields" });
    }

    const { label, imageUrl } = validation.data;

    const { storeId, billboardId } = req.params;
    if (!storeId) return res.sendStatus(400);
    if (!billboardId) return res.sendStatus(400);

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

    const updatedBillboard = await db.billboard.update({
      where: {
        id: billboardId,
        storeId: storeByUserId.id,
      },
      data: {
        label,
        imageUrl,
      },
    });

    return res.status(201).json({ updatedBillboard });
  } catch (error) {
    console.log("UPDATE BILLBOARD API ERROR", error);
  }
};
export const deleteBillboards = async (req: Request, res: Response) => {
  try {
    const { storeId, billboardId } = req.params;
    if (!storeId) return res.sendStatus(400);
    if (!billboardId) return res.sendStatus(400);

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

    await db.billboard.delete({
      where: {
        id: billboardId,
        storeId: storeByUserId.id,
      },
    });

    return res.status(201).json({ message: "Billboard deleted" });
  } catch (error) {
    console.log("DELETE BILLBOARD API ERROR", error);
  }
};

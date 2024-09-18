import { Request, Response } from "express";
import { bannerSchema } from "../../schemas";
import { db } from "../../services/db";

export const createBanners = async (req: Request, res: Response) => {
  try {
    const validation = bannerSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({ message: "Invalid Fields" });
    }

    const { type, productId } = validation.data;

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

    const productById = await db.product.findFirst({
      where: {
        storeId,
        id: productId,
      },
    });

    if (!productById) return res.sendStatus(405);

    const newBanner = await db.banner.create({
      data: {
        storeId: storeByUserId.id,
        productId: productById.id,
        type,
        thumbnail: productById.thumbnail,
      },
    });

    return res.status(201).json({ newBanner });
  } catch (error) {
    console.log("CREATE BANNER API ERROR", error);
  }
};

export const fetchAllBanners = async (req: Request, res: Response) => {
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

    const allBanner = await db.banner.findMany({
      where: {
        storeId: storeByUserId.id,
      },
      include: {
        product: true
      }
    });

    return res.status(201).json(allBanner);
  } catch (error) {
    console.log("FETCH BANNERS API ERROR", error);
  }
};

export const updateBanners = async (req: Request, res: Response) => {
  try {
    const validation = bannerSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({ message: "Invalid Fields" });
    }

    const { type, productId } = validation.data;

    const { storeId, bannerId } = req.params;
    if (!storeId) return res.sendStatus(400);
    if (!bannerId) return res.sendStatus(400);

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

    const productById = await db.product.findFirst({
      where: {
        storeId,
        id: productId,
      },
    });

    if (!productById) return res.sendStatus(405);

    const updatedBanner = await db.banner.update({
      where: {
        id: bannerId,
        storeId: storeByUserId.id,
      },
      data: {
        productId: productById.id,
        type,
        thumbnail: productById.thumbnail,
      },
    });

    return res.status(201).json({ updatedBanner });
  } catch (error) {
    console.log("UPDATE BANNER API ERROR", error);
  }
};

export const deleteBanners = async (req: Request, res: Response) => {
  try {
    const { storeId, bannerId } = req.params;
    if (!storeId) return res.sendStatus(400);
    if (!bannerId) return res.sendStatus(400);

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

    await db.banner.delete({
      where: {
        id: bannerId,
        storeId: storeByUserId.id,
      },
    });

    return res.status(201).json({ message: "Banner deleted" });
  } catch (error) {
    console.log("DELETE BANNER API ERROR", error);
  }
};
import { Request, Response } from "express";

export const singleImageUpload = async (req: Request, res: Response) => {
  try {
    const image = req.file;

    if (!image) return res.status(400).json({ message: "No file uploaded" });

    return res
      .status(201)
      .json({ imageUrl: `http://localhost:8000/uploads/${image.filename}` });
  } catch (error) {
    console.log("Image Uploads", error);
  }
};

export const multipleImageUpload = async (req: Request, res: Response) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: "No files uploaded" });
  }

  const uploadedFiles = (req.files as Express.Multer.File[]).map((file) => {
    const fileName = file.filename;
    const filePath = `http://localhost:8000/uploads/${fileName}`;
    return filePath;
  });

  return res
    .status(200)
    .json({ message: "Files uploaded successfully", imageUrls: uploadedFiles });
};

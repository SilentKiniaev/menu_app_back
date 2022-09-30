import { Router, Response, Request, NextFunction } from "express";
import { param, checkSchema } from "express-validator";
import { validateError } from "../middlewares/validation-error";
import prisma from "../prisma";
import upload from "../middlewares/upload";
import { uploadSingle } from "../cloudinary";
import { createMenuItemScheme } from "../middlewares/validation-error/schemas/create-menu-item";
const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const menu = await prisma.menuItem.findMany({
    // where: {
    // },
    // include: {
    //     images: {
    //         select: {
    //             url: true,
    //             createdAt: true
    //         }
    //     },
    //     category: true
    // }
  });
  res.send(menu);
});

router.post(
  "/",
  checkSchema(createMenuItemScheme, ["body"]),
  validateError,
  async (req: Request, res: Response) => {
    // const {categoryId, ...data} = req.body;
    const menuItem = await prisma.menuItem.create({
      data: req.body,
      // data: {
      //     ...data,
      //     categories: {
      //         create: [{
      //             assignedAt: new Date(),
      //             category: {
      //                 connect: {
      //                     id: categoryId
      //                 }
      //             }
      //         }]
      //     }
      // }
    });
    res.send(menuItem);
  }
);

router.patch(
  "/:id",
  param("id").isNumeric(),
  checkSchema(createMenuItemScheme, ["body"]),
  validateError,
  async (req: Request, res: Response) => {
    const menuItem = await prisma.menuItem.update({
      where: {
        id: +req.params.id,
      },
      data: req.body,
    });
    res.send(menuItem);
  }
);

// router.post('/images/:id', upload.array('files', 3), async (req: Request, res: Response, next: NextFunction) => {
//     const files = req.files as Express.Multer.File[];
//     console.log(files[0].buffer)
//     const uploadedFiles = await uploadMultiple(files);
//     const data = uploadedFiles.map((file: any) => ({
//         url: file.url,
//         menuItemId: +req.params.id
//     }));
//     prisma.image.createMany({ data })
//         .then((count) => {
//             console.log(count, data);
//             res.send(data);
//         })
//         .catch((e) => next(e));
// });

router.post(
  "/image/:id",
  param("id").isNumeric(),
  validateError,
  upload.single("file"),
  async (req: Request, res: Response, next: NextFunction) => {
    const file: Express.Multer.File = <Express.Multer.File>req.file;
    const uploadedFile = await uploadSingle(file);
    prisma.menuItem
      .update({
        where: {
          id: +req.params.id,
        },
        data: {
          imageUrl: uploadedFile.url,
        },
      })
      .then((item) => {
        console.log(item, uploadedFile.url);
        res.send({
          url: uploadedFile.url,
        });
      })
      .catch((e) => next(e));
  }
);

export default router;

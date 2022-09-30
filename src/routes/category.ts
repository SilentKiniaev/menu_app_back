import { Router, Request, Response } from "express";
import prisma from "../prisma";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const categories = await prisma.category.findMany({});
  res.send(categories);
});

export default router;

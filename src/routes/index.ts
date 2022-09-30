import { Router } from "express";
import menuRouter from "./menu-item";
import category from "./category";

const router = Router();

router.use("/menu", menuRouter);
router.use("/category", category);

export default router;

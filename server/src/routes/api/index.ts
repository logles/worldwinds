import { Router } from "express";
const router = Router();

import weatherRoutes from "./weatherRoutes.js"; //weatherRouts is in .ts?

router.use("/weather", weatherRoutes);

export default router;

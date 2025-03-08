import { Router } from "express";
const router = Router();

import weatherRoutes from "./weatherRoutes.js";

import profileRoutes from "./profileRoutes.js";

router.use("/weather", weatherRoutes);

router.use("/profile", profileRoutes);

export default router;

/*JWT Creat Password Profile*/

import { Router } from "express";
import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import { Profile } from "../../models/index.js";

const router = Router();

// CREATE a new profile
router.post("/", async (req: Request, res: Response) => {
  try {
    const newProfile = req.body;
    console.log(req.body);
    newProfile.password = await bcrypt.hash(req.body.password, 10);
    const userData = await Profile.create(newProfile);
    res.status(200).json(userData);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

export default router;

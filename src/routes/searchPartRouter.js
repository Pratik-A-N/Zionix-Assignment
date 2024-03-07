import { Router } from "express";
import SearchPartController from "../controllers/searchPartController.js";

const router = Router();

router.post('/', SearchPartController.getPartNumberPrice)

export default router;
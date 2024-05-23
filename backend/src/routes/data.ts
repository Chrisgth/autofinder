import express from "express";
import * as DataController from "../controllers/data";

const router = express.Router();

router.get("/formattedData", DataController.getFormattedData);
router.patch("/updateCommonValues", DataController.updateCommonValues);

export default router;

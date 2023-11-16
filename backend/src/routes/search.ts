import express from "express";
import * as SearchController from "../controllers/search";

const router = express.Router();

router.get("/", SearchController.getSearches);

router.post("/insert", SearchController.insertSearch);

export default router;

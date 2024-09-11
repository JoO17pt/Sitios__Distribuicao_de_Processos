import express from "express";
import search from "../controllers/SearchController.js";
import sessionInit from "../middlewares/sessionInit.js";

const router = express.Router();

router.get("/", search);
router.post("/", sessionInit, search);

export default router;
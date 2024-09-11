import express from "express";
import {login, register, logout} from "../controllers/UsersController.js";

const router = express.Router();

router.get("/login", login);
router.post("/login", login);

router.get("/logout", logout);

router.get("/register", register);
router.post("/register", register);

export default router;
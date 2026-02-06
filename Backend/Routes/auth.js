import express from "express";
import { handleRegisterUser, handleLogin, handleProfileCreation } from "../Controllers/auth.js";

const router = express.Router();

router.post('/register', handleRegisterUser);
router.post('/login', handleLogin);
router.post('/createProfile', handleProfileCreation)

export default router;

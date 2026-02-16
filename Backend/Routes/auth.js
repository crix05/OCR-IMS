import express from "express";
import { handleRegisterUser, handleLogin, handleProfileCreation } from "../Controllers/auth.js";
import { verifyToken } from "../Utils/jwt.js";

const router = express.Router();

router.post('/register', handleRegisterUser);
router.post('/login', handleLogin);
router.post('/createProfile', verifyToken, handleProfileCreation);

export default router;

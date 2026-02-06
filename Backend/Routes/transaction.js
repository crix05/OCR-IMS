import express from "express";
import { verifyToken } from "../Utils/jwt.js";
import { handleTransaction } from "../Controllers/transaction.js";

const router = express.Router();

router.use(verifyToken);
router.post('/', handleTransaction);

export default router;
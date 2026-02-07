import express from "express";
import { handleTransaction } from "../Controllers/transaction.js";

const router = express.Router();

router.post('/', handleTransaction);

export default router;
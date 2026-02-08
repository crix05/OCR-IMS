import express from "express";
import { verifyToken } from "../Utils/jwt.js";
import { 
    handleItemAddition, 
    handleCategoryAddition, 
    handleFetchItems, 
    handleFetchCategories,
    handleDeleteCategory,
    handleDeleteItem
} from "../Controllers/items.js";

const router = express.Router();

router.use(verifyToken);
router.get('/getCategories', verifyToken, handleFetchCategories);
router.get('/getItems', handleFetchItems);
router.post('/addItem', handleItemAddition);
router.post('/addCategory', handleCategoryAddition);
router.post('/deleteCategory', handleDeleteCategory);
router.post('/deleteItem', handleDeleteItem);

export default router;
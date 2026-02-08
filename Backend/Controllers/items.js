import { 
    addItem, 
    addCategory, 
    fetchCategories, 
    fetchItems,
    deleteCategory,
    deleteItem
 } from '../Services/items.js'

export async function handleItemAddition(req, res) {
    try {
        const item = req.body;
        if (
            !item.item_name ||
            !item.category_id ||
            item.rate === undefined ||
            item.qty_available === undefined ||
            item.threshold === undefined
        ) {
            return res.status(400).json({error: 'Data missing in mandatory fields'});
        }
        const newItem = await addItem(item);
        return res.status(201).json(newItem);
    } catch(error) {
        if (error.message === "Item already exists") {
            return res.status(400).json({message: error.message});
        }
        console.log(error);
        return res.status(500).json({error: error.message});
    }
}

export async function handleCategoryAddition(req, res) {
    try {
        const category = req.body;
        if (
            !category.category_name
        ) {
            return res.status(400).json({error: 'Data missing in mandatory fields'});
        }
        const newCategory = await addCategory(category);
        return res.status(201).json(newCategory);
    } catch(error) {
        if (error.message === "Category already exists") {
            return res.status(400).json({message: error.message});
        }
        return res.status(500).json({error: error});
    }
}

export async function handleFetchCategories(req, res) {
    try {
        const uid = req.uid;
        const categories = await fetchCategories(uid);
        return res.status(201).json(categories.rows);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

export async function handleFetchItems(req, res) {
    try {
        const uid = req.uid;
        const items = await fetchItems(uid);
        return res.status(201).json(items.rows);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

export async function handleDeleteCategory(req, res) {
    try {
        const category_id = req.body.category_id;
        const uid = req.body.uid;
        const deletedCategory = await deleteCategory(category_id, uid);
        return res.status(201).json(deletedCategory);
    } catch(error) {
        res.status(500).json({error: error.message});
    }
}

export async function handleDeleteItem(req, res) {
    try {
        const item_id = req.body.item_id;
        const uid = req.body.uid;
        const deletedItem = await deleteItem(item_id, uid);
        return res.status(201).json(deletedItem);
    } catch(error) {
        res.status(500).json({error: error.message});
    }
}
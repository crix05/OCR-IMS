import { 
    addItemModel, 
    addCategoryModel, 
    fetchCategoriesModel, 
    fetchItemsModel, 
    findCategoryByName, 
    findItemByName,
    deleteCategoryModel,
    deleteItemModel,
    updateCategoryModel,
    updateItemModel
} from "../Models/items.js";

export async function addItem(item) {
    const existingItem = await findItemByName(item);
    if(existingItem) {
        throw new Error ('Item already exists');;
    }
    const newItem = await addItemModel(item);
    if(!newItem) {
        throw new Error ('Insesrtion failed');
    }
    return newItem;
}

export async function addCategory(category) {
    const existingCategory = await findCategoryByName(category)
    if(existingCategory) {
        throw new Error ('Category already exists');;
    }
    const newCategory = await addCategoryModel(category);
    if(!newCategory) {
        throw new Error ('Insertion failed');
    }
    return newCategory;
}

export async function fetchCategories(uid) {
    const categories = await fetchCategoriesModel(uid);
    if(!categories) {
        throw new Error ('No entries found');
    }
    return categories;
}

export async function fetchItems(uid) {
    const items = await fetchItemsModel(uid);
    if(!items) {
        throw new Error ('No entries found');
    }
    return items;
}

export async function deleteCategory(category_id, uid) {
    const deletedCategory = await deleteCategoryModel(category_id, uid);
    if(!deletedCategory) {
        throw new Error ('No such entry found');
    }
    return deletedCategory;
}

export async function deleteItem(item_id, uid) {
    const deletedItem = await deleteItemModel(item_id, uid);
    if(!deletedItem) {
        throw new Error ('No such entry found');
    }
    return deletedItem;
}

export async function updateCategory(col, val, category_id, uid) {
    const updatedCategory = await updateCategoryModel(col, val, category_id, uid);
    if(!updatedCategory) {
        throw new Error ('No such entry found');
    }
    return updatedCategory;
}

export async function updateItem(col, val, item_id, uid) {
    const updatedItem = await updateItemModel(col, val, item_id, uid);
    if(!updatedItem) {
        throw new Error ('No such entry found');
    }
    return updatedItem;
}  
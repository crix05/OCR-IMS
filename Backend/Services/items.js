import { 
    addItemModel, 
    addCategoryModel, 
    fetchCategoriesModel, 
    fetchItemsModel, 
    findCategoryByName, 
    findItemByName 
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


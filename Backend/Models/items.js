import { pool } from "../pool.js";
import { insertRow, fetchRows } from "./baseModel.js";

// Categories 
export async function addCategoryModel(category) {
    const result = await insertRow(pool, "categories", category);
    return result.rows[0];
}

export async function fetchCategoriesModel(uid) {
    const result = await fetchRows(pool, "categories", "uid", uid)
    return result;
}

export async function findCategoryByName(category) {
    const result = await fetchRows(pool, "categories", "category_name", category.category_name)
    return result.rows[0];
}



// Items
export async function addItemModel(item) {
    const result = await insertRow(pool, "items", item);
    return result.rows[0];
}

export async function fetchItemsModel(uid) {
    const result = await fetchRows(pool, "items", "uid", uid)
    return result;
}

export async function findItemByName(item) {
    const result = await fetchRows(pool, "items", "item_name", item.item_name)
    return result.rows[0];
}

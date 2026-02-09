import { pool } from "../pool.js";
import { insertRow, fetchRows, deleteRows, updateRows } from "./baseModel.js";

// Categories 
export async function addCategoryModel(category) {
    const result = await insertRow(pool, "categories", category);
    return result.rows[0];
}

export async function fetchCategoriesModel(uid) {
    const result = await fetchRows(pool, "categories", "uid", uid);
    return result;
}

export async function findCategoryByName(category) {
    const result = await fetchRows(pool, "categories", 
        "category_name", category.category_name, 
        "uid", category.uid
    );
    return result.rows[0];
}

export async function deleteCategoryModel(category_id, uid) {
    const result = await deleteRows(pool, "categories", 
        "category_id", category_id, 
        "uid", uid
    );
    return result.rows[0];
}

export async function updateCategoryModel(col, val, category_id, uid) {
    const result = await updateRows(pool, "categories", 
        `${col}`, val, 
        "uid", uid, 
        "category_id", category_id
    );

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
    const result = await fetchRows(pool, "items", 
        "item_name", item.item_name, 
        "uid", item.uid
    );
    return result.rows[0];
}

export async function deleteItemModel(item_id, uid) {
    const result = await deleteRows(pool, "items", 
        "item_id", item_id, 
        "uid", uid
    );
    return result.rows[0];
}

export async function updateItemModel(col, val, item_id, uid) {
    const result = await updateRows(pool, "items", 
        `${col}`, val, 
        "uid", uid, 
        "item_id", item_id
    );

    return result.rows[0];
}


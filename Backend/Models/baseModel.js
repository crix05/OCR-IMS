export async function insertRow(connection, tableName, data) {
    if (!tableName) {
        throw new Error("Table name is required");
    }

    const filteredData = Object.fromEntries(
        Object.entries(data).filter(([_, value]) => value !== undefined)
    )

    const cols = Object.keys(filteredData)
    const val = Object.values(filteredData)

    const placeholders = cols.map((_, index) => `$${index + 1}`);

    const query = `
        INSERT INTO ${tableName} (${cols.join(", ")})
        VALUES (${placeholders.join(", ")})
        Returning *;
    `;
    // .join() -> Converts array to string

    const result = await connection.query(query, val);
    return result;
}

export async function fetchRows(connection, tableName, col1, val1, col2 = null, val2 = null) {
    if (!tableName || !col1 || val1 === undefined) {
        throw new Error("Mandatory details missing");
    }

    let query = `SELECT * FROM ${tableName} WHERE ${col1} = $1`;
    let values = [val1];

    if (col2 && val2 !== undefined) {
        query += ` AND ${col2} = $2`;
        values.push(val2);
    }

    const result = await connection.query(query, values);
    return result;
}

export async function deleteRows(connection, tableName, col1, val1, col2 = null, val2 = null) {
    if (!tableName || !col1 || val1 === undefined) {
        throw new Error("Mandatory details missing");
    }

    let query = `DELETE FROM ${tableName} WHERE ${col1} = $1`;
    let values = [val1];

    if (col2 && val2 !== undefined) {
        query += ` AND ${col2} = $2`;
        values.push(val2);
    }

    query += ` RETURNING *`;

    const result = await connection.query(query, values);
    return result;
}

export async function updateRows(connection, tableName, col1, val1, col2, val2, col3 = null, val3 = null) {
    if (
        !tableName ||
        !col1 ||
        !col2 ||
        val1 === undefined ||
        val2 === undefined
    ) {
        throw new Error("Mandatory details missing");
    }

    let query = `UPDATE ${tableName} SET ${col1} = $1 WHERE ${col2} = $2`;
    let values = [val1, val2];

    if (col3 && val3 !== undefined) {
        query += ` AND ${col3} = $3`;
        values.push(val3);
    }

    query += ` RETURNING *`;

    const result = await connection.query(query, values);
    return result;
}

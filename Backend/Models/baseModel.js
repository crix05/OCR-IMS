export async function insertRow(connection, tableName, data) {
    if(!tableName) {
        throw new Error("Table name is required");
    }

    const filteredData = Object.fromEntries(
        Object.entries(data).filter(([_, value]) => value !== undefined )
    )

    const cols = Object.keys(filteredData)
    const val = Object.values(filteredData)

    const placeholders = cols.map((_, index) => `$${index+1}`);

    const query = `
        INSERT INTO ${tableName} (${cols.join(", ")})
        VALUES (${placeholders.join(", ")})
        Returning *;
    `;
    // .join() -> Converts array to string

    const result = await connection.query(query, val);
    return result;
}

export async function fetchRows(connection, tableName, colName, val) {
  if (!tableName || !colName || val === undefined) {
    throw new Error("Mandatory details missing");
  }

  const query = `SELECT * FROM ${tableName} WHERE ${colName} = $1`;
  const result = await connection.query(query, [val]);

  return result;
}

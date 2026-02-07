import { pool } from "../pool.js";

// Transactions
export async function createUserTransaction(client, tranDetails) {
  const {
    uid,
    customer_name = null,
    customer_mob = null,
    transaction_date,
    created_at,
    discount = null,
    amount,
  } = tranDetails;

  const query = `
    INSERT INTO transactions
    (uid, customer_name, customer_mob, transaction_date, created_at, discount, amount)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
  `;

  const values = [
    uid,
    customer_name,
    customer_mob,
    transaction_date,
    created_at,
    discount,
    amount,
  ];

  const result = await client.query(query, values);
  return result.rows[0];
}


// Transaction items
export async function createTransactionItems(client, item, transaction_id) {
  const {
    item_id,
    item_name,
    qty,
    unit = null,
    amount
  } = item;

  const query = `
    INSERT INTO transaction_items
    (item_id, item_name, transaction_id, qty, unit, amount)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;

  const values = [
    item_id,
    item_name,
    transaction_id,
    qty,
    unit,
    amount
  ];

  const result = await client.query(query, values);
  return result.rows[0];
}
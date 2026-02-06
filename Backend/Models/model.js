import { pool } from "../pool.js";

// Onboarding / Authentication
export async function findUserByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await pool.query(query, [email]);
    return result.rows[0];
}

export async function createUser(details) {
    const { name, email, password, role } = details;
    const query = 'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *';
    const result = await pool.query(query, [name, email, password, role]);
    return result.rows[0];
}

export async function createUserProfile(profile) {
  const query = `
    INSERT INTO client_profiles
    (uid, phone, address, state_name, pincode, gst_num, company_name)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
  `;

  const values = [
    profile.uid,
    profile.phone,
    profile.address,
    profile.state_name,
    profile.pincode,
    profile.gst_num,
    profile.company_name
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
}


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




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







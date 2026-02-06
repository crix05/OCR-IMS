import pkg from 'pg';
const { Pool } = pkg;

export const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'OCR_DB',
  password: 'Tanmay',
  port: 5432
});

// Pool handles:
// Reusing connections
// Managing multiple queries at the same time
// Closing idle connections automatically



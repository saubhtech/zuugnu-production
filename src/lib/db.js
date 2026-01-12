import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://saubhtech:ManiKiMala1954@88.222.241.228:5432/saubh',
  ssl: false
});

// Test the connection
pool.on('connect', () => {
  console.log('✅ Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('❌ Database error:', err);
});

// Query helper function (needed by API routes)
export const query = async (text, params) => {
  try {
    const res = await pool.query(text, params);
    return res;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
};

export default pool;
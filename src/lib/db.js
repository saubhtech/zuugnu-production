import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://saubhtech:ManiKiMala1954@88.222.241.228:5432/saubh',
  ssl: false
});

export default pool;
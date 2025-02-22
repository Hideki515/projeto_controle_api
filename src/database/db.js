import { env } from '../../env.js';
import mysql from 'mysql2';

// Conectar ao banco de dados
const db = mysql.createConnection({
  host: env.DB_HOST,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_DATABASE
});

export default db;
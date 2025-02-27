import dotenv from 'dotenv';

dotenv.config();

// export const env = {
//   PORT: process.env.PORT || 3000,
//   DB_HOST: process.env.DB_HOST,
//   DB_USER: process.env.DB_USER,
//   DB_DATABASE: process.env.DB_DATABASE,
//   DB_PASSWORD: process.env.DB_PASSWORD ?? '',
// };

export const env = {
  PORT: process.env.PORT || 3000,
  DB_HOST: process.env.MYSQL_ADDON_HOST,
  DB_PORT: process.env.MYSQL_ADDON_PORT,
  DB_USER: process.env.MYSQL_ADDON_USER,
  DB_DATABASE: process.env.MYSQL_ADDON_DB,
  DB_PASSWORD: process.env.MYSQL_ADDON_PASSWORD,
  DB_URI: process.env.MYSQL_ADDON_URI
}
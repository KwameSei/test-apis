import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import knexConnection from "../mysql_connect.js";
import promise from "bluebird";
import { readdir, readFile } from "fs/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const db = knexConnection.client.config.connection.database || process.env.DB_DATABASE || '';

// Create replace all function
const replaceAll = (str, delimiter, replace) => {
  return str.split(delimiter).join(replace);
};

(async () => {
  try {
    const migrationsDir = join(__dirname, '../migrations');
    const files = await readdir(migrationsDir, 'utf-8');

    await promise.each(files, async (file) => {
      const data = await readFile(join(migrationsDir, file), 'utf-8');
      const sql = replaceAll(data, '{}', db);

      try {
        const response = await knexConnection.raw(sql);
        console.log(response);
      } catch (err) {
        console.log(err);
        throw err;
      }
    });

    console.log('Migration files run successfully');
  } catch (err) {
    console.log('Error reading or running migration files');
    throw err;
  }
})();

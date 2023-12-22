import fs from 'fs';
import path from 'path';

// Get the current working directory
const currentWorkingDir = process.cwd();  // process.cwd() returns the current working directory of the Node.js process

// Define the migrations directory path
const migrationsDir = path.resolve(currentWorkingDir, 'database', 'migrations');

// Create the migrations directory if it doesn't exist
if (!fs.existsSync(migrationsDir)) {
  fs.mkdirSync(migrationsDir, { recursive: true });
}

// Get the table name from the command line argument --tableName=tableName
let tableName = 'defaultTableName'; // Set a default table name if not provided

const tableNameArg = process.argv.find((arg) => arg.includes('--tableName='));

if (tableNameArg) {
  tableName = tableNameArg.split('=')[1];
}

// Create a migration file
const fileName = new Date().getTime() + '_' + tableName + '.sql';

// Write to the migrations file
fs.writeFile(path.resolve(migrationsDir, fileName), '', (err) => {
  if (err) {
    throw new Error(err);
  }
  console.log(`Migration file created at ${path.resolve(migrationsDir, fileName)}`);
});

// To run the migration file
// node database/actions/create-migrations.js --tableName=users
// yarn create-migration i.e. this will run all the migrations and create default tables
// yarn create-migration --tableName=tablename i.e. this will run the migration for tablename(e.g. users) table
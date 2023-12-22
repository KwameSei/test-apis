// import mysql from 'mysql';
import dotenv from 'dotenv';
import { createPool } from 'mysql2';
import { createConnection } from 'mysql2';
import knex from 'knex';

dotenv.config();

// const poolConnect = createPool({
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
//   connectionLimit: 10,  // connection limit for each pool instance (default: 10)
// });

// poolConnect.getConnection((err, connection) => {
//   if (err) {
//     console.error('Error connecting to MySQL database:', err);
//     return;
//   }
//   console.log('Connected to MySQL database!');
//   connection.release(); // release the connection back to the pool
// });

// export default poolConnect;

// export const dbConnection = createConnection({
//   host: process.env.HOST,
//   port: process.env.DB_PORT,
//   user: process.env.USER,
//   password: process.env.PASSWORD,
//   database: process.env.DB,
// });

// dbConnection.connect((err) => {
//   if (err) {
//     console.error('Error connecting to MySQL database:', err);
//     return;
//   }
//   console.log('Connected to MySQL database!');
// });

// export default dbConnection;


// const connectDB = mysql.createConnection({
//   host: 'localhost',
//   user: 'your_username',
//   password: 'your_password',
//   database: 'your_database_name'
// });

// connection.connect((err) => {
//   if (err) {
//     console.error('Error connecting to MySQL database:', err);
//     return;
//   }
//   console.log('Connected to MySQL database!');
// });

// export default connectDB;

let config = {
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    multipleStatements: true,
  },
}

// Pass the config to knex to establish the connection.
const knexConnection = knex(config);

export default knexConnection;

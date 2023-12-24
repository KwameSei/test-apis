// import mysql from 'mysql';
import dotenv from 'dotenv';
import { createPool } from 'mysql2';
import { createConnection } from 'mysql2';
import knex from 'knex';

dotenv.config();

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

// configuration for test database connection
if (process.env.NODE_ENV === 'test') {
  config = {
    client: 'mysql2',
    connection: {
      host: process.env.TEST_DB_HOST,
      port: process.env.TEST_DB_PORT,
      user: process.env.TEST_DB_USER,
      password: process.env.TEST_DB_PASSWORD,
      database: process.env.TEST_DB_DATABASE,
      multipleStatements: true,
    },
  };
}

// Pass the config to knex to establish the connection.
const knexConnection = knex(config);

export default knexConnection;

// NB: To run the server, use either of the command below:
// NODE_ENV=development yarn dev
// NODE_ENV=test yarn test





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

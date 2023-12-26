import createApp from './app.js';
import dotenv from 'dotenv';

dotenv.config();

const server = createApp();

server.listen(process.env.APP_PORT, () => {
  console.log('Server is running on port: ', process.env.APP_PORT);
});


// NB: To run the server, use either of the command below:
// NODE_ENV=development yarn dev
// NODE_ENV=test yarn test-env
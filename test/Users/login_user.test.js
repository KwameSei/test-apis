import request from 'supertest';
import app from '../../app.js';
import knexConnection from '../../database/mysql_connect.js';

describe('User Login', () => {
  beforeAll(async () => {
    await knexConnection.raw('CREATE DATABASE IF NOT EXISTS test_apis');
    await knexConnection.raw('USE test_apis');
    // await knexConnection.raw('CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), email VARCHAR(255), password VARCHAR(255)');
  });

  afterAll(async () => {
    // await knexConnection.raw('DROP DATABASE IF EXISTS test_apis_test');
    await knexConnection.destroy();
  });

  let authToken;  // Declare authToken variable to store token

  it('should login user and authenticate them', async () => {
    const response = await request(app)
      .post('/api/v1/users/login')
      .send({
        email: 'nat@gmail.com',
        password: 'password',
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data[0]).toHaveProperty('id');
    expect(response.body.data[0]).toHaveProperty('name');
    expect(response.body.data[0]).toHaveProperty('email');
    expect(response.body.data[0]).toHaveProperty('role_id');

    authToken = response.body.token;
  });

  it('should access authentticated and authorized route with valid token', async () => {
    const response = await request(app)
      .get('/api/v1/users/register')
      .set('Authorization', `Bearer ${authToken}`); // Set Authorization header

    expect(response.statusCode).toBe(200);  // Check if status code is 200
    expect(response.body).toHaveProperty('data'); // Check if response body has data property
    expect(response.body.data[0]).toHaveProperty('id'); // Check if data property has id property
    expect(response.body.data[0]).toHaveProperty('name'); // Check if data property has name property
    expect(response.body.data[0]).toHaveProperty('email'); // Check if data property has email property
    expect(response.body.data[0]).toHaveProperty('role_id'); // Check if data property has role_id property
  });

  it('should return 400 if email is not provided', async () => {
    const response = await request(app)
      .post('/api/v1/users/login')
      .send({
        password: 'password',
      });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('User email and password are required');
  });

  it('should return 400 if password is not provided', async () => {
    const response = await request(app)
      .post('/api/v1/users/login')
      .send({
        email: 'nat@gmail.com',
      });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('User email and password are required');
  });

  it('should return 401 if user not found', async () => {
    // Existing user in the database
    const existingUser = {
      email: 'nat@gmail.com',
      password: 'password',
    };

    // Delete existing user from the database
    await knexConnection('users').where('email', existingUser.email).del();

    const response = await request(app)
      .post('/api/v1/users/login')
      .send(existingUser);

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Invalid email or password');
  });

  it('should return 500 if server error occurs', async () => {
    const response = await request(app)
      .post('/api/v1/users/login')
      .send({
        email: 'nat@gmail.com',
        password: 'password',
      });

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Internal server error');
  });

  it('should return 401 if password is incorrect', async () => {
    const existingUser = {
      email: 'nat@gmail.com',
      password: 'password',
    };

    // Ensure user exists in the database
    await knexConnection('users').insert(existingUser);

    // Attempt to login with incorrect password
    const response = await request(app)
      .post('/api/v1/users/login')
      .send({
        email: existingUser.email,
        password: 'wrongpassword',
      });
      
    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Invalid password');
  });

  it('should return 200 if user is logged in', async () => {
    // Existing user in the database
    const existingUser = {
      email: 'nat@gmail.com',
      password: 'password',
    };

    // Ensure user exists in the database
    await knexConnection('users').insert(existingUser);

    // Login to get token
    const response = await request(app)
      .post('/api/v1/users/login')
      .send(existingUser);

    // Attempt to login with the token
    const loginResponse = await request(app)
      .get('/api/v1/users/login')
      .set('Authorization', `Bearer ${response.body.token}`);

    expect(loginResponse.statusCode).toBe(200);
    expect(loginResponse.body).toHaveProperty('data');
    expect(loginResponse.body.data[0]).toHaveProperty('id');
  });

  it('should return 500 if server error occurs', async () => {
    const response = await request(app)
      .post('/api/v1/users/login')
      .send({
        email: 'nat@gmail.com',
        password: 'password',
      });

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Internal server error');
  });
});
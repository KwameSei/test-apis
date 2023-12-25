import request from 'supertest';
import app from '../../app.js';
import knexConnection from '../../database/mysql_connect.js';

describe('Create Operation', () => {
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

  it('should create a new user and authenticate them', async () => {
    const response = await request(app)
      .post('/api/v1/users/register')
      .send({
        name: 'Nat Osei',
        email: 'nat@gmail.com',
        password: 'password',
        role_id: 1
      });

    // Check if user was created successfully
    const user = await knexConnection('users').where({ email: 'nat@gmail.com' }).first();

    // If user was not created successfully, throw error
    if (!user) {
      throw new Error('User was not created successfully');
    }

    // Then add user to database
    await knexConnection('users').insert({
      name: 'Nat Osei',
      email: 'nathanielosei92@gmail.com',
      password: 'password',
      role_id: 1
    });
    
    // expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('email');
    expect(user).toHaveProperty('password');
    expect(user).toHaveProperty('role_id');

    // expect(response.statusCode).toBe(201);  // Check if status code is 201
    // expect(response.body).toHaveProperty('data'); // Check if response body has data property
    // expect(response.body.data[0]).toHaveProperty('id'); // Check if data property has id property
    // expect(response.body.data[0]).toHaveProperty('name'); // Check if data property has name property
    // expect(response.body.data[0]).toHaveProperty('email'); // Check if data property has email property
    // expect(response.body.data[0]).toHaveProperty('role_id'); // Check if data property has role_id property

    // Authenticate user
    const loginResponse = await request(app)
      .post('/api/v1/users/login')
      .send({
        email: 'nat@gmail.com',
        password: 'password',
      });

    // Store token in authToken variable
    authToken = loginResponse.body.token;

    // Check if user was authenticated successfully
    expect(loginResponse.statusCode).toBe(200);
    expect(loginResponse.body).toHaveProperty('token');
    expect(loginResponse.body).toHaveProperty('data');
    expect(loginResponse.body.data).toHaveProperty('id');
    expect(loginResponse.body.data).toHaveProperty('name');
    expect(loginResponse.body.data).toHaveProperty('email');
  });

  it('should access authentticated and authorized route with valid token', async () => {
    const response = await request(app)
      .get('/api/v1/users/register')
      .set('Authorization', `Bearer ${authToken}`); // Set Authorization header

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data[0]).toHaveProperty('id');
    expect(response.body.data[0]).toHaveProperty('name');
    expect(response.body.data[0]).toHaveProperty('email');
    expect(response.body.data[0]).toHaveProperty('role_id');
  });
    
  it('should return 400 if name is not provided', async () => {
    const response = await request(app)
      .post('/api/v1/users/register')
      .send({
        email: 'nat@gmail.com',
        password: 'password',
        role_id: 1
      });

    expect(response.statusCode).toBe(400);  // Check if status code is 400
    expect(response.body).toHaveProperty('message'); // Check if response body has message property
    expect(response.body.message).toBe('User email, password and name are required'); // Check if message property has Name is required
  }
  );

  it('should return 401 if email is not provided', async () => {
    const response = await request(app)
      .post('/api/v1/users/register')
      .send({
        name: 'Nat Osei',
        password: 'password',
        role_id: 1
      });

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('User email, password and name are required');
  }
  );

  it('should return 401 if password is not provided', async () => {
    const response = await request(app)
      .post('/api/v1/users/register')
      .send({
        name: 'Nat Osei',
        email: 'nat@gmail.com',
        role_id: 1
      });

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('User email, password and name are required');
  });

  it('should return 400 if role_id is not provided', async () => {
    const response = await request(app)
      .post('/api/v1/users/register')
      .send({
        name: 'Nat Osei',
        email: 'nat@gmail.com',
        password: 'password',
      });

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('role_id is required');
  });

  it('should return 409 if user already exists', async () => {
    // Existing user in the database
    const existingUser = {
      name: 'Nat Osei',
      email: 'nat@gmail.com',
      password: 'password',
      role_id: 1
    };

    // Ensure user exists in the database
    await knexConnection('users').insert(existingUser);

    // Attempt to register the same user
    const response = await request(app)
      .post('/api/v1/users/register')
      .send(existingUser);

    expect(response.statusCode).toBe(409);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('User already exists');
  });

  it('should return 500 if server error occurs', async () => {
    const response = await request(app)
      .post('/api/v1/users/register')
      .send({
        name: 'Nat Osei',
        email: 'nat@gmail.com',
        password: 'password',
        role_id: 1
      });

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Internal server error'); 
  });
});
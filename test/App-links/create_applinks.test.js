import supertest from "supertest";
import createApp from "../../app.js";
import knexConnection from "../../database/mysql_connect.js";
import dotenv from "dotenv";

dotenv.config();

// Create app instance
const server = createApp();

describe("Create App Links Operation", () => {
  beforeAll(async () => {
    await knexConnection.raw("CREATE DATABASE IF NOT EXISTS test_apis");
    await knexConnection.raw("USE test_apis");
  });

  afterAll(async () => {
    await knexConnection.destroy();
  });

  let authToken;

  beforeAll(async () => {
    const response = await supertest(server)
      .post("/api/v1/users/login")
      .send({
        email: process.env.LOGIN_USER_EMAIL,
        password: process.env.LOGIN_USER_PASSWORD,
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("data");

    const userData = response.body.data;

    console.log("userData:", userData);

    if (!userData.user || !userData.user.id) {
      throw new Error("User data is missing or incorrect");
    }

    if (!userData.token) {
      throw new Error("User token is missing or incorrect");
    }

    const user = await knexConnection("users")
      .where({ email: process.env.LOGIN_USER_EMAIL })
      .first();

    if (!user) {
      throw new Error("User was not logged in successfully");
    }

    authToken = userData.token;
    console.log("authToken:", authToken);

    expect(user).toHaveProperty("id");
    expect(user).toHaveProperty("name");
    expect(user).toHaveProperty("email");
    expect(user).toHaveProperty("password");
    expect(user).toHaveProperty("role_id");
  });

  it("should create app links", async () => {
    try {
      const response = await supertest(server)
        .post("/api/v1/app/create-app-link")
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          name: "Test App",
          url: "https://testapp.com",
          icon: "https://testapp.com/test.png",
        });

      console.log("create app link response:", response.body);

      expect(response.statusCode).toBe(201); // Assuming a successful creation status
      expect(response.body).toHaveProperty("data");

      const appData = response.body.data;

      console.log("appData:", appData);

      const app = await knexConnection("app_links")
        .where({ name: "Test App" })
        .first();

      expect(app).toBeDefined(); // Assuming the app is found in the database
      expect(app).toHaveProperty("id");
      expect(app).toHaveProperty("name");
      expect(app).toHaveProperty("url");
      expect(app).toHaveProperty("icon");
      expect(app).toHaveProperty("user_id");
    } catch (error) {
      if (error.message) {
        console.error(error.message);
      } else {
        console.error(error);
      }
      throw error; // Re-throw the error to fail the test
    }
  });
});

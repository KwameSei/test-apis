import supertest from "supertest";
import createApp from "../../app.js";
import knexConnection from "../../database/mysql_connect.js";
import dotenv from "dotenv";

dotenv.config();

// Create app instance
const server = createApp();

// Create request instance
const request = supertest(server);

// delete applinks test suite
describe("Delete app links operation", () => {
  // create applinks database before each test
  beforeAll(async () => {
    await knexConnection.raw("CREATE DATABASE IF NOT EXISTS test_apis");
    await knexConnection.raw("USE test_apis");
  });

  afterAll(async () => {
    await knexConnection.destroy();
  });

  let authToken;

  // login before each test
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

    expect(user).toHaveProperty("id");
    expect(user).toHaveProperty("name");
    expect(user).toHaveProperty("email");
    expect(user).toHaveProperty("password");
    expect(user).toHaveProperty("role_id");
  });

  // delete applinks test
  // it("should delete an app link successfully", async () => {
  //   try {
  //     const response = await request
  //     .delete("/api/v1/app/delete-app-link/4")
  //     .set("Authorization", `Bearer ${authToken}`);

  //     // check response
  //     const res = response.body;
  //     expect(res).toHaveProperty("success");
  //     expect(res).toHaveProperty("status");
  //     expect(res).toHaveProperty("message");
  //     expect(res).toHaveProperty("data");

  //     // check data
  //     const data = res.data;
  //     expect(data).toHaveProperty("id");
  //     expect(data).toHaveProperty("name");
  //     expect(data).toHaveProperty("url");
  //     expect(data).toHaveProperty("icon");

  //     // check status
  //     expect(res.success).toBe(true);
  //     expect(res.status).toBe(200);
  //     expect(res.message).toBe("App deleted successfully");

  //     // check data values
  //     expect(data.id).toBe("4");
      
  //     // check database
  //     const app = await knexConnection("app_links")
  //       .where({ id: 4 })
  //       .first();

  //     // check that app does not exist in the database
  //     expect(app).toBeUndefined();

  //   } catch (error) {
  //     throw error;
  //   }
  // });

  // delete applinks test
  it("should return an error if app link id is not valid", async () => {
    try {
      const response = await request
      .delete("/api/v1/app/delete-app-link/100")
      .set("Authorization", `Bearer ${authToken}`);

      // check response
      const res = response.body;
      expect(res).toHaveProperty("success");
      expect(res).toHaveProperty("status");
      expect(res).toHaveProperty("message");

      // check status
      expect(res.success).toBe(false);
      expect(res.status).toBe(404);
      expect(res.message).toBe("App not found");

    } catch (error) {
      throw error;
    }
  });

  it("should return an error if user is not the owner of the app", async () => {
    try {
      const response = await request
      .delete("/api/v1/app/delete-app-link/1")
      .set("Authorization", `Bearer ${authToken}`);

      // check response
      const res = response.body;
      expect(res).toHaveProperty("success");
      expect(res).toHaveProperty("status");
      expect(res).toHaveProperty("message");

      // check status
      expect(res.success).toBe(false);
      expect(res.status).toBe(403);
      expect(res.message).toBe("You are not allowed to delete this app");

    } catch (error) {
      throw error;
    }
  });

  it("should return an error if user is not authenticated", async () => {
    try {
      const response = await request
      .delete("/api/v1/app/delete-app-link/1");

      // check response
      const res = response.body;
      expect(res).toHaveProperty("success");
      expect(res).toHaveProperty("status");
      expect(res).toHaveProperty("message");

      // check status
      expect(res.success).toBe(false);
      expect(res.status).toBe(401);
      expect(res.message).toBe("Unauthorized! Please provide a valid tokend");

    } catch (error) {
      throw error;
    }
  });

  it("should return an error if user is not authorized", async () => {
    try {
      const response = await request
      .delete("/api/v1/app/delete-app-link/1")
      .set("Authorization", `Bearer ${authToken}`);

      // check response
      const res = response.body;
      expect(res).toHaveProperty("success");
      expect(res).toHaveProperty("status");
      expect(res).toHaveProperty("message");

      // check status
      expect(res.success).toBe(false);
      expect(res.status).toBe(403);
      expect(res.message).toBe("You are not allowed to delete this app");

    } catch (error) {
      throw error;
    }
  });
});
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

  it("should create app links", async () => {
    try {
      const response = await supertest(server)
        .post("/api/v1/app/create-app-link")
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          name: process.env.TEST_APP_NAME,
          url: process.env.TEST_APP_URL,
          icon: process.env.TEST_APP_ICON,
        });

      expect(response.statusCode).toBe(201); // Assuming a successful creation status
      expect(response.body).toHaveProperty("data");

      const appData = response.body.data;

      const app = await knexConnection("app_links")
        .where({ name: process.env.TEST_APP_NAME })
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

  it("should not create app links if the app name already exists", async () => {
    try {
      const response = await supertest(server)
        .post("/api/v1/app/create-app-link")
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          name: process.env.TEST_APP_NAME,
          url: process.env.TEST_APP_URL,
          icon: process.env.TEST_APP_ICON,
        });

      expect(response.statusCode).toBe(409); // Assuming a conflict status
      expect(response.body).toHaveProperty("message");

      const message = response.body.message;

      expect(message).toBe("App already exists");
    } catch (error) {
      if (error.message) {
        console.error(error.message);
      } else {
        console.error(error);
      }
      throw error; // Re-throw the error to fail the test
    }
  });

  it("should not create app links if the app name is missing", async () => {
    try {
      const response = await supertest(server)
        .post("/api/v1/app/create-app-link")
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          url: process.env.TEST_APP_URL,
          icon: process.env.TEST_APP_ICON,
        });

      expect(response.statusCode).toBe(400); // Assuming a bad request status
      expect(response.body).toHaveProperty("message");

      const message = response.body.message;

      expect(message).toBe("App Links name, icon and url required");
    } catch (error) {
      if (error.message) {
        console.error(error.message);
      } else {
        console.error(error);
      }
      throw error; // Re-throw the error to fail the test
    }
  });

  it("should not create app links if the app url is missing", async () => {
    try {
      const response = await supertest(server)
        .post("/api/v1/app/create-app-link")
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          name: process.env.TEST_APP_NAME,
          icon: process.env.TEST_APP_ICON,
        });

      console.log("create app link response:", response.body);

      expect(response.statusCode).toBe(400); // Assuming a bad request status
      expect(response.body).toHaveProperty("message");

      const message = response.body.message;

      console.log("message:", message);

      expect(message).toBe("App Links name, icon and url required");
    } catch (error) {
      if (error.message) {
        console.error(error.message);
      } else {
        console.error(error);
      }
      throw error; // Re-throw the error to fail the test
    }
  });

  it("should not create app links if the app icon is missing", async () => {
    try {
      const response = await supertest(server)
        .post("/api/v1/app/create-app-link")
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          name: process.env.TEST_APP_NAME,
          url: process.env.TEST_APP_URL,
        });

      console.log("create app link response:", response.body);

      expect(response.statusCode).toBe(400); // Assuming a bad request status
      expect(response.body).toHaveProperty("message");

      const message = response.body.message;

      console.log("message:", message);

      expect(message).toBe("App Links name, icon and url required");
    } catch (error) {
      if (error.message) {
        console.error(error.message);
      } else {
        console.error(error);
      }
      throw error; // Re-throw the error to fail the test
    }
  });

  it("should not create app links if the app name is empty", async () => {
    try {
      const response = await supertest(server)
        .post("/api/v1/app/create-app-link")
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          name: "",
          url: process.env.TEST_APP_URL,
          icon: process.env.TEST_APP_ICON,
        });

      console.log("create app link response:", response.body);

      expect(response.statusCode).toBe(400); // Assuming a bad request status
      expect(response.body).toHaveProperty("message");

      const message = response.body.message;

      console.log("message:", message);

      expect(message).toBe("App Links name, icon and url required");
    } catch (error) {
      if (error.message) {
        console.error(error.message);
      } else {
        console.error(error);
      }
      throw error; // Re-throw the error to fail the test
    }
  });

  it("should not create app links if the app url is empty", async () => {
    try {
      const response = await supertest(server)
        .post("/api/v1/app/create-app-link")
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          name: process.env.TEST_APP_NAME,
          url: "",
          icon: process.env.TEST_APP_ICON,
        });

      console.log("create app link response:", response.body);

      expect(response.statusCode).toBe(400); // Assuming a bad request status
      expect(response.body).toHaveProperty("message");

      const message = response.body.message;

      console.log("message:", message);

      expect(message).toBe("App Links name, icon and url required");
    } catch (error) {
      if (error.message) {
        console.error(error.message);
      } else {
        console.error(error);
      }
      throw error; // Re-throw the error to fail the test
    }
  });

  it("should not create app links if the app icon is empty", async () => {
    try {
      const response = await supertest(server)
        .post("/api/v1/app/create-app-link")
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          name: process.env.TEST_APP_NAME,
          url: process.env.TEST_APP_URL,
          icon: "",
        });

      expect(response.statusCode).toBe(400); // Assuming a bad request status
      expect(response.body).toHaveProperty("message");

      const message = response.body.message;

      console.log("message:", message);

      expect(message).toBe("App Links name, icon and url required");
    } catch (error) {
      if (error.message) {
        console.error(error.message);
      } else {
        console.error(error);
      }
      throw error; // Re-throw the error to fail the test
    }
  });

  it("should return unauthorized if the user is not logged in", async () => {
    try {
      const response = await supertest(server)
        .post("/api/v1/app/create-app-link")
        .send({
          name: process.env.TEST_APP_NAME,
          url: process.env.TEST_APP_URL,
          icon: process.env.TEST_APP_ICON,
        });

      console.log("create app link response:", response.body);

      expect(response.statusCode).toBe(401); // Assuming an unauthorized status
      expect(response.body).toHaveProperty("message");

      const message = response.body.message;

      console.log("message:", message);

      expect(message).toBe("Unauthorized! Please provide a valid token");
    } catch (error) {
      console.error(error);
      throw error; // Re-throw the error to fail the test
    }
  });

  it("should return unauthorized with invalid token", async () => {
    try {
      const response = await supertest(server)
        .post("/api/v1/app/create-app-link")
        .set("Authorization", `Bearer ${authToken}invalid`)
        .send({
          name: process.env.TEST_APP_NAME,
          url: process.env.TEST_APP_URL,
          icon: process.env.TEST_APP_ICON,
        });

      console.log("create app link response:", response.body);

      expect(response.statusCode).toBe(401); // Assuming an unauthorized status
      expect(response.body).toHaveProperty("message");

      const message = response.body.message;

      console.log("message:", message);

      expect(message).toBe("Unauthorized! Please provide a valid token");
    } catch (error) {
      console.error(error);
      throw error; // Re-throw the error to fail the test
    }
  });

  it("should return bad request for invalid user input", async () => {
    try {
      const response = await supertest(server)
        .post("/api/v1/app/create-app-link")
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          name: process.env.TEST_INVALID_NAME,
          url: process.env.TEST_INVALID_URL,
          icon: process.env.TEST_INVALID_ICON,
          invalid: "invalid",
        });

      console.log("create app link response:", response.body);

      expect(response.statusCode).toBe(400); // Assuming a bad request status
      expect(response.body).toHaveProperty("message");

      const message = response.body.message;

      console.log("message:", message);

      expect(message).toBe("App Links name, icon and url required");
    } catch (error) {
      console.error(error);
      throw error; // Re-throw the error to fail the test
    }
  });
});

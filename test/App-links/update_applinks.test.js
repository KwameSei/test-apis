import supertest from "supertest";
import createApp from "../../app.js";
import knexConnection from "../../database/mysql_connect.js";
import dotenv from "dotenv";

dotenv.config();

// Create app instance
const server = createApp();

// Update appLinks test suite

describe("Update app links operation", () => {
  // Create applinks database before each test
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

  it("should update app links successfully", async () => {
    const response = await supertest(server)
      .put("/api/v1/app/update-app-link/1")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        name: process.env.TEST_APP_NAME,
        icon: process.env.TEST_APP_ICON,
        url: process.env.TEST_APP_URL,
      });
  
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("data");
  
    const updatedAppLinks = response.body.data;
    console.log("updatedAppLinks:", updatedAppLinks);
  
    // Check if updated app links is in the database
    const updatedAppLinksInDB = await knexConnection("app_links")
      .where({ name: process.env.TEST_APP_NAME })
      .first();

    console.log("updatedAppLinksInDB.id:", updatedAppLinksInDB.id);
    console.log("updatedAppLinks.id:", updatedAppLinks.id);
  
    expect(updatedAppLinksInDB).toHaveProperty("id");
    expect(updatedAppLinksInDB).toHaveProperty("name");
    expect(updatedAppLinksInDB).toHaveProperty("icon");
    expect(updatedAppLinksInDB).toHaveProperty("url");
    expect(updatedAppLinksInDB).toHaveProperty("user_id");
  
    // expect(updatedAppLinksInDB.id).toBe(updatedAppLinks.id.toString());
    expect(updatedAppLinksInDB.name).toBe(updatedAppLinks.name);
    expect(updatedAppLinksInDB.icon).toBe(updatedAppLinks.icon);
    expect(updatedAppLinksInDB.url).toBe(updatedAppLinks.url);
    expect(updatedAppLinksInDB.user_id).toBe(updatedAppLinks.user_id);
  
    expect(updatedAppLinksInDB.name).toBe(process.env.TEST_APP_NAME);
    expect(updatedAppLinksInDB.icon).toBe(process.env.TEST_APP_ICON);
    expect(updatedAppLinksInDB.url).toBe(process.env.TEST_APP_URL);
  });

  it("should return error if app links does not exist", async () => {
    const response = await supertest(server)
      .put("/api/v1/app/update-app-link/100")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        name: process.env.TEST_APP_NAME,
        icon: process.env.TEST_APP_ICON,
        url: process.env.TEST_APP_URL,
      });
  
    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty("error");
    const error = response.body.error;
    expect(error).toBe("Apps not found");
  });

  it("should return error if app links id is not valid", async () => {
    const response = await supertest(server)
      .put("/api/v1/app/update-app-link/abc")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        name: process.env.TEST_APP_NAME,
        icon: process.env.TEST_APP_ICON,
        url: process.env.TEST_APP_URL,
      });
  
      expect(response.statusCode).toBe(404);
      expect(response.body).toHaveProperty("error");
      const error = response.body.error;
      expect(error).toBe("Apps not found");
  });

  it("should return error if app links name is not valid", async () => {
    const response = await supertest(server)
      .put("/api/v1/app/update-app-link/1")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        name: 123,
        icon: process.env.TEST_APP_ICON,
        url: process.env.TEST_APP_URL,
      });
  
    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty("error");
    const error = response.body.error;
    expect(error).toBe("App name, icon and url required, invalid inputs are not allowed");
  });

  it("should return error if app links icon is not valid", async () => {
    const response = await supertest(server)
      .put("/api/v1/app/update-app-link/1")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        name: process.env.TEST_APP_NAME,
        icon: 123,
        url: process.env.TEST_APP_URL,
      });
  
    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty("error");
    const error = response.body.error;
    expect(error).toBe("App name, icon and url required, invalid inputs are not allowed");
  });

  it("should return error if app links url is not valid", async () => {
    const response = await supertest(server)
      .put("/api/v1/app/update-app-link/1")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        name: process.env.TEST_APP_NAME,
        icon: process.env.TEST_APP_ICON,
        url: 123,
      });
  
    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty("error");
    const error = response.body.error;
    expect(error).toBe("App name, icon and url required, invalid inputs are not allowed");
  });

  it("should return error if app links name is missing", async () => {
    const response = await supertest(server)
      .put("/api/v1/app/update-app-link/1")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        icon: process.env.TEST_APP_ICON,
        url: process.env.TEST_APP_URL,
      });
  
    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty("error");
  
    const error = response.body.error;
    expect(error).toBe("App Links name, icon and url required");
  });

  it("should return error if app links icon is missing", async () => {
    const response = await supertest(server)
      .put("/api/v1/app/update-app-link/1")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        name: process.env.TEST_APP_NAME,
        url: process.env.TEST_APP_URL,
      });
  
    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty("error");
  
    const error = response.body.error;
  
    expect(error).toBe("App Links name, icon and url required");
  });

  it("should return error if app links url is missing", async () => {
    const response = await supertest(server)
      .put("/api/v1/app/update-app-link/1")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        name: process.env.TEST_APP_NAME,
        icon: process.env.TEST_APP_ICON,
      });
  
    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty("error");
  
    const error = response.body.error;
  
    expect(error).toBe("App Links name, icon and url required");
  });

  it("should return error if app links name is empty", async () => {
    const response = await supertest(server)
      .put("/api/v1/app/update-app-link/1")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        name: "",
        icon: process.env.TEST_APP_ICON,
        url: process.env.TEST_APP_URL,
      });
  
    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty("error");
  
    const error = response.body.error;
  
    expect(error).toBe("App Links name, icon and url required");
  });

  it("should return error if app links icon is empty", async () => {
    const response = await supertest(server)
      .put("/api/v1/app/update-app-link/1")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        name: process.env.TEST_APP_NAME,
        icon: "",
        url: process.env.TEST_APP_URL,
      });
  
    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty("error");
  
    const error = response.body.error;
  
    expect(error).toBe("App Links name, icon and url required");
  });

  it("should return error if app links url is empty", async () => {
    const response = await supertest(server)
      .put("/api/v1/app/update-app-link/1")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        name: process.env.TEST_APP_NAME,
        icon: process.env.TEST_APP_ICON,
        url: "",
      });
  
    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty("error");
    const error = response.body.error;
    expect(error).toBe("App Links name, icon and url required");
  });

  // Deny access to unauthorized users
  it("should return error if user is not logged in", async () => {
    const response = await supertest(server)
      .put("/api/v1/app/update-app-link/1")
      .send({
        name: process.env.TEST_APP_NAME,
        icon: process.env.TEST_APP_ICON,
        url: process.env.TEST_APP_URL,
      });
  
    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty("error");
  
    const error = response.body.error;
  
    expect(error).toBe("Unauthorized! Please provide a valid token");
  });
});
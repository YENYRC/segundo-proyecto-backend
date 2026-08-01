import request from "supertest";
import app from "../app.js";

describe("Auth endpoints", () => {
    
  const testUser = {
    name: "Usuario Test",
    email: `test${Date.now()}@example.com`,
    password: "password123",
  };

  test("POST /api/auth/register - debería registrar un usuario nuevo", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send(testUser);

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty("email", testUser.email);
  });

  test("POST /api/auth/register - debería fallar si falta el email", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({ name: "Sin Email", password: "password123" });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });

  test("POST /api/auth/login - debería hacer login con credenciales correctas", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: testUser.email, password: testUser.password });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty("token");
  });

  test("POST /api/auth/login - debería fallar con contraseña incorrecta", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: testUser.email, password: "wrongpassword" });

    expect(response.status).toBeGreaterThanOrEqual(400);
    expect(response.body.success).toBe(false);
  });
});
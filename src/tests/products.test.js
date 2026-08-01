import request from "supertest";
import app from "../app.js";

describe("Products endpoints", () => {
  let adminToken;
  let createdProductId;

  const newProduct = {
    name: `Producto Test ${Date.now()}`,
    price: "9.99",
    stock: "5",
  };

  beforeAll(async () => {
    const loginResponse = await request(app)
      .post("/api/auth/login")
      .send({ email: "test21@example.com", password: "123456" });

    adminToken = loginResponse.body.data.token;
  });

  test("GET /api/products - debería devolver la lista de productos (público)", async () => {
    const response = await request(app).get("/api/products");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  test("POST /api/products - debería fallar sin autenticación", async () => {
    const response = await request(app)
      .post("/api/products")
      .send(newProduct);

    expect(response.status).toBe(401);
  });

  test("POST /api/products - debería crear un producto con token de admin", async () => {
    const response = await request(app)
      .post("/api/products")
      .set("Authorization", `Bearer ${adminToken}`)
      .field("name", newProduct.name)
      .field("price", newProduct.price)
      .field("stock", newProduct.stock);

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty("name", newProduct.name);

    createdProductId = response.body.data.id;
  });

  test("GET /api/products/:id - debería obtener el producto creado", async () => {
    const response = await request(app).get(`/api/products/${createdProductId}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty("id", createdProductId);
  });
});
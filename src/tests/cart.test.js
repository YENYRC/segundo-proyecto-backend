import request from "supertest";
import app from "../app.js";

describe("Cart endpoints", () => {
  let adminToken;
  let testProductId;

  beforeAll(async () => {
    const loginResponse = await request(app)
      .post("/api/auth/login")
      .send({ email: "test21@example.com", password: "123456" });

    adminToken = loginResponse.body.data.token;

    const productResponse = await request(app)
      .post("/api/products")
      .set("Authorization", `Bearer ${adminToken}`)
      .field("name", `Producto Carrito Test ${Date.now()}`)
      .field("price", "5.5")
      .field("stock", "10");

    testProductId = productResponse.body.data.id;
  });

  test("GET /api/cart - debería fallar sin autenticación", async () => {
    const response = await request(app).get("/api/cart");

    expect(response.status).toBe(401);
  });

  test("POST /api/cart - debería añadir un producto al carrito", async () => {
    const response = await request(app)
      .post("/api/cart")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ productId: testProductId, quantity: 2 });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty("productId", testProductId);
  });

  test("GET /api/cart - debería devolver el carrito con el producto añadido", async () => {
    const response = await request(app)
      .get("/api/cart")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);

    const foundItem = response.body.data.find(
      (item) => item.productId === testProductId
    );
    expect(foundItem).toBeDefined();
  });

  test("DELETE /api/cart/:productId - debería eliminar el producto del carrito", async () => {
    const response = await request(app)
      .delete(`/api/cart/${testProductId}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });
});
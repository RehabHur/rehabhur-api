import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "./app.js";

describe("GET /", () => {
  it("debería responder correctamente", async () => {
    const response = await request(app).get("/");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "Servidor funcionando"
    });
  });
});
import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "./app.js";

describe("API de rehabilitación", () => {
  it("debería responder con la salud del servidor en la ruta de salud", async () => {
    const response = await request(app).get("/health");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "Servidor funcionando",
    });
  });

  it("debería devolver la lista de ejercicios", async () => {
    const response = await request(app).get("/api/v1/exercises");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0]).toHaveProperty("name");
  });
});
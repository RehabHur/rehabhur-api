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

  it("mantiene disponible la ruta raíz de salud", async () => {
    const response = await request(app).get("/");

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Servidor funcionando");
  });

  it("debería devolver la lista de ejercicios", async () => {
    const response = await request(app).get("/api/v1/exercises");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0]).toHaveProperty("name");
  });

  it("permite crear, consultar, actualizar y eliminar docentes", async () => {
    const created = await request(app)
      .post("/api/v1/teachers")
      .send({
        name: "Docente de prueba",
        last_name: "Temporal",
        email: "docente.prueba@example.com",
        dni: "99999999",
        commission: 2026,
      });

    expect(created.status).toBe(201);
    expect(created.body).toMatchObject({
      name: "Docente de prueba",
      last_name: "Temporal",
      commission: 2026,
    });

    const id = created.body.id as number;
    const found = await request(app).get(`/api/v1/teachers/${id}`);
    expect(found.status).toBe(200);
    expect(found.body.id).toBe(id);

    const updated = await request(app)
      .patch(`/api/v1/teachers/${id}`)
      .send({ name: "Docente actualizado" });
    expect(updated.status).toBe(200);
    expect(updated.body.name).toBe("Docente actualizado");

    const deleted = await request(app).delete(`/api/v1/teachers/${id}`);
    expect(deleted.status).toBe(204);
    expect((await request(app).get(`/api/v1/teachers/${id}`)).status).toBe(404);
  });

  it("devuelve errores consistentes para entradas inválidas", async () => {
    const invalidId = await request(app).get("/api/v1/teachers/no-es-un-id");
    expect(invalidId.status).toBe(400);
    expect(invalidId.body.error.code).toBe("INVALID_ID");

    const invalidBody = await request(app)
      .post("/api/v1/teachers")
      .send({ email: "no-es-un-correo" });
    expect(invalidBody.status).toBe(400);
    expect(invalidBody.body.error.code).toBe("VALIDATION_ERROR");
    expect(invalidBody.body.error.details).toBeInstanceOf(Array);
  });

  // it("expone y valida las rutas de pacientes", async () => {
  //   const patients = await request(app).get("/api/v1/patients");
  //   expect(patients.status).toBe(200);
  //   expect(patients.body.length).toBeGreaterThan(0);

  //   const originalName = patients.body[0].name as string;
  //   const updated = await request(app)
  //     .patch(`/api/v1/patients/${patients.body[0].id}`)
  //     .send({ name: "Paciente temporal" });
  //   expect(updated.status).toBe(200);
  //   expect(updated.body.name).toBe("Paciente temporal");

  //   const restored = await request(app)
  //     .patch(`/api/v1/patients/${patients.body[0].id}`)
  //     .send({ name: originalName });
  //   expect(restored.body.name).toBe(originalName);
  // });

  // it("devuelve un error normalizado para rutas inexistentes", async () => {
  //   const response = await request(app).get("/api/v1/recurso-inexistente");

  //   expect(response.status).toBe(404);
  //   expect(response.body.error.code).toBe("ROUTE_NOT_FOUND");
  // });
});
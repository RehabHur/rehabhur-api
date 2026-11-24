import { afterEach, describe, expect, it } from "vitest";

import { getDatabaseConnectionString } from "./database.js";

const variableNames = [
    "DATABASE_URL",
    "PGHOST",
    "PGPORT",
    "PGDATABASE",
    "PGUSER",
    "PGPASSWORD",
    "PGSSLMODE",
] as const;

const originalValues = new Map(
    variableNames.map((name) => [name, process.env[name]]),
);

afterEach(() => {
    for (const name of variableNames) {
        const value = originalValues.get(name);
        if (value === undefined) {
            delete process.env[name];
        } else {
            process.env[name] = value;
        }
    }
});

describe("getDatabaseConnectionString", () => {
    it("prefiere DATABASE_URL cuando está configurada", () => {
        process.env.DATABASE_URL = "postgresql://db.example/api";
        process.env.PGHOST = "ignored.example";

        expect(getDatabaseConnectionString()).toBe("postgresql://db.example/api");
    });

    it("construye una URL codificando credenciales desde las variables PG", () => {
        delete process.env.DATABASE_URL;
        process.env.PGHOST = "db.example";
        process.env.PGPORT = "5433";
        process.env.PGDATABASE = "rehab hur";
        process.env.PGUSER = "rehab user";
        process.env.PGPASSWORD = "p@ss:word";
        process.env.PGSSLMODE = "require";

        const url = new URL(getDatabaseConnectionString());

        expect(url.hostname).toBe("db.example");
        expect(url.port).toBe("5433");
        expect(url.pathname).toBe("/rehab%20hur");
        expect(url.username).toBe("rehab%20user");
        expect(url.password).toBe("p%40ss%3Aword");
        expect(url.searchParams.get("schema")).toBe("public");
        expect(url.searchParams.get("sslmode")).toBe("require");
    });

    it("rechaza un puerto de PostgreSQL inválido", () => {
        delete process.env.DATABASE_URL;
        process.env.PGPORT = "70000";

        expect(getDatabaseConnectionString).toThrow("PGPORT debe ser un entero entre 1 y 65535");
    });
});

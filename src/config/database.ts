export const getDatabaseConnectionString = (): string => {
    const configuredUrl = process.env.DATABASE_URL?.trim();
    if (configuredUrl) {
        return configuredUrl;
    }

    const port = Number(process.env.PGPORT?.trim() || 5432);
    if (!Number.isInteger(port) || port < 1 || port > 65535) {
        throw new Error("PGPORT debe ser un entero entre 1 y 65535");
    }

    const url = new URL("postgresql://localhost");
    url.hostname = process.env.PGHOST?.trim() || "localhost";
    url.port = String(port);
    url.username = process.env.PGUSER?.trim() || "postgres";
    url.password = process.env.PGPASSWORD ?? "";
    url.pathname = `/${encodeURIComponent(process.env.PGDATABASE?.trim() || "rehabhur")}`;
    url.searchParams.set("schema", "public");
    const sslMode = process.env.PGSSLMODE?.trim();
    if (sslMode) {
        url.searchParams.set("sslmode", sslMode);
    }
    return url.toString();
};

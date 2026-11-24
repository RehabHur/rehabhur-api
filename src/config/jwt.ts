import "dotenv/config";
import type { SignOptions } from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
    throw new Error("Falta configurar JWT_SECRET en el entorno");
}

const decodedSecret = Buffer.from(jwtSecret, "base64");

if (decodedSecret.length !== 32 || decodedSecret.toString("base64") !== jwtSecret) {
    throw new Error("JWT_SECRET debe ser una clave Base64 válida de 256 bits");
}

export const JWT_SECRET = jwtSecret;

export const ACCESS_TOKEN_TTL = (process.env.JWT_ACCESS_TTL?.trim() || "15m") as SignOptions["expiresIn"];
export const REFRESH_TOKEN_TTL = (process.env.JWT_REFRESH_TTL?.trim() || "7d") as SignOptions["expiresIn"];

const parseDurationMs = (value: string): number => {
    const match = /^(\d+)([smhd])$/.exec(value.trim());
    if (!match) {
        throw new Error("La duración de los tokens debe tener el formato 15m, 1h o 7d");
    }

    const amount = Number(match[1]);
    const unit = match[2] as "s" | "m" | "h" | "d";
    const multipliers = {
        s: 1_000,
        m: 60_000,
        h: 3_600_000,
        d: 86_400_000,
    };

    return amount * multipliers[unit];
};

export const REFRESH_TOKEN_TTL_MS = parseDurationMs(String(REFRESH_TOKEN_TTL));

import "dotenv/config";
import type { CookieOptions } from "express";

import { REFRESH_TOKEN_TTL_MS } from "./jwt.js";

const sameSiteValues = ["lax", "strict", "none"] as const;
type SameSite = (typeof sameSiteValues)[number];

const parseSameSite = (value: string | undefined): SameSite => {
    const normalized = value?.trim().toLowerCase() || "lax";

    if (!sameSiteValues.includes(normalized as SameSite)) {
        throw new Error("COOKIE_SAME_SITE debe ser lax, strict o none");
    }

    return normalized as SameSite;
};

const parseBoolean = (value: string | undefined, fallback: boolean): boolean => {
    if (value === undefined || value.trim() === "") {
        return fallback;
    }

    return value.trim().toLowerCase() === "true";
};

export const REFRESH_COOKIE_NAME = process.env.REFRESH_COOKIE_NAME?.trim() || "refreshToken";
export const REFRESH_COOKIE_PATH = process.env.REFRESH_COOKIE_PATH?.trim() || "/api/v1/auth";

const sameSite = parseSameSite(process.env.COOKIE_SAME_SITE);

// SameSite=None exige Secure por especificación. En desarrollo (HTTP) usar lax.
export const COOKIE_SECURE = parseBoolean(process.env.COOKIE_SECURE, sameSite === "none");

if (sameSite === "none" && !COOKIE_SECURE) {
    throw new Error("COOKIE_SECURE debe ser true cuando COOKIE_SAME_SITE=none");
}

const domain = process.env.COOKIE_DOMAIN?.trim() || undefined;

const baseOptions: CookieOptions = {
    httpOnly: true,
    secure: COOKIE_SECURE,
    sameSite,
    path: REFRESH_COOKIE_PATH,
    domain,
};

export const refreshCookieOptions: CookieOptions = {
    ...baseOptions,
    maxAge: REFRESH_TOKEN_TTL_MS,
};

// Mismos atributos que la cookie original para que el navegador la reemplace.
export const clearRefreshCookieOptions: CookieOptions = {
    ...baseOptions,
};

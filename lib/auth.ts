import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const COOKIE_NAME = "wedding_admin_session";
const alg = "HS256";

function getSecretKey() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not set. Add it to your .env file.");
  }
  return new TextEncoder().encode(secret);
}

/** Verifies the admin's plaintext credentials against env vars.
 * For a real deployment, replace this with a hashed-password lookup
 * (bcryptjs is already a dependency) or move to a proper allow-list table. */
export function verifyAdminCredentials(email: string, password: string) {
  return (
    email.trim().toLowerCase() === (process.env.ADMIN_EMAIL || "").toLowerCase() &&
    password === process.env.ADMIN_PASSWORD
  );
}

export async function createAdminSession(email: string) {
  const token = await new SignJWT({ email, role: "admin" })
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecretKey());

  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export function clearAdminSession() {
  cookies().set(COOKIE_NAME, "", { path: "/", maxAge: 0 });
}

export async function getAdminSession() {
  const token = cookies().get(COOKIE_NAME)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    return payload as { email: string; role: string };
  } catch {
    return null;
  }
}

/** Edge-safe verification for middleware (no `cookies()` helper there). */
export async function verifySessionToken(token: string | undefined) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    return payload as { email: string; role: string };
  } catch {
    return null;
  }
}

export const SESSION_COOKIE_NAME = COOKIE_NAME;

import "server-only";

import { cookies } from "next/headers";

import type { AccessLevel } from "../../types/product";
import {
  createSessionToken,
  SESSION_DURATION,
  verifySessionToken,
} from "./session-token";

const SESSION_COOKIE = "signal_session";

export async function createSession(): Promise<void> {
  const token = createSessionToken();
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION,
  });
}

export async function getSession() {
  const cookieStore = await cookies();

  return verifySessionToken(
    cookieStore.get(SESSION_COOKIE)?.value,
  );
}

export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.delete(SESSION_COOKIE);
}

export async function getAccessLevel(): Promise<AccessLevel> {
  const session = await getSession();

  return session ? "authenticated" : "public";
}

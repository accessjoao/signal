import "server-only";

import {
  createHmac,
  randomUUID,
  timingSafeEqual,
} from "node:crypto";

export const SESSION_DURATION = 60 * 60 * 24 * 7;

export interface SessionPayload {
  id: string;
  expiresAt: number;
}

function getSessionSecret(): string {
  const secret = process.env.SESSION_SECRET;

  if (!secret || secret.length < 32) {
    throw new Error(
      "SESSION_SECRET must be configured with at least 32 characters.",
    );
  }

  return secret;
}

function sign(value: string): string {
  return createHmac("sha256", getSessionSecret())
    .update(value)
    .digest("base64url");
}

export function createSessionToken(): string {
  const payload: SessionPayload = {
    id: randomUUID(),
    expiresAt: Date.now() + SESSION_DURATION * 1000,
  };

  const encodedPayload = Buffer.from(
    JSON.stringify(payload),
  ).toString("base64url");

  return `${encodedPayload}.${sign(encodedPayload)}`;
}

export function verifySessionToken(
  token: string | undefined,
): SessionPayload | null {
  if (!token || token.length > 2048) {
    return null;
  }

  const parts = token.split(".");

  if (parts.length !== 2) {
    return null;
  }

  const [encodedPayload, providedSignature] = parts;

  if (
    !encodedPayload ||
    !providedSignature ||
    !/^[A-Za-z0-9_-]+$/.test(encodedPayload) ||
    !/^[A-Za-z0-9_-]{43}$/.test(providedSignature)
  ) {
    return null;
  }

  const expectedSignature = sign(encodedPayload);

  const providedBuffer = Buffer.from(providedSignature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (
    providedBuffer.length !== expectedBuffer.length ||
    !timingSafeEqual(providedBuffer, expectedBuffer)
  ) {
    return null;
  }

  try {
    const payload: unknown = JSON.parse(
      Buffer.from(encodedPayload, "base64url").toString("utf8"),
    );

    if (
      typeof payload !== "object" ||
      payload === null ||
      !("id" in payload) ||
      !("expiresAt" in payload) ||
      typeof payload.id !== "string" ||
      payload.id.length === 0 ||
      typeof payload.expiresAt !== "number" ||
      !Number.isSafeInteger(payload.expiresAt) ||
      payload.expiresAt <= Date.now()
    ) {
      return null;
    }

    return {
      id: payload.id,
      expiresAt: payload.expiresAt,
    };
  } catch {
    return null;
  }
}

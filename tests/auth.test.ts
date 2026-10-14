import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";

import { validateCredentials } from "../lib/auth/auth";
import {
  createSessionToken,
  verifySessionToken,
} from "../lib/auth/session-token";

const TEST_SECRET = "test-secret-for-signal-authentication-123456";

describe("Authentication", () => {
  const originalSecret = process.env.SESSION_SECRET;

  beforeAll(() => {
    process.env.SESSION_SECRET = TEST_SECRET;
  });

  afterAll(() => {
    if (originalSecret === undefined) {
      delete process.env.SESSION_SECRET;
    } else {
      process.env.SESSION_SECRET = originalSecret;
    }

    vi.useRealTimers();
  });

  describe("Credential validation", () => {
    it("accepts non-empty credentials", () => {
      expect(validateCredentials("partner", "password123")).toEqual({
        username: "partner",
        password: "password123",
      });
    });

    it("trims the username", () => {
      expect(validateCredentials("  partner  ", "password")).toEqual({
        username: "partner",
        password: "password",
      });
    });

    it("rejects empty credentials", () => {
      expect(validateCredentials("", "password")).toBeNull();
      expect(validateCredentials("partner", "")).toBeNull();
    });

    it("rejects whitespace-only credentials", () => {
      expect(validateCredentials("   ", "password")).toBeNull();
      expect(validateCredentials("partner", "   ")).toBeNull();
    });

    it("rejects non-string inputs", () => {
      expect(validateCredentials(null, "password")).toBeNull();
      expect(validateCredentials("partner", undefined)).toBeNull();
      expect(validateCredentials(123, "password")).toBeNull();
    });
  });

  describe("Session tokens", () => {
    it("creates and verifies a valid token", () => {
      const token = createSessionToken();
      const session = verifySessionToken(token);

      expect(session).not.toBeNull();
      expect(session?.id).toBeTruthy();
      expect(session?.expiresAt).toBeGreaterThan(Date.now());
    });

    it("rejects missing tokens", () => {
      expect(verifySessionToken(undefined)).toBeNull();
      expect(verifySessionToken("")).toBeNull();
    });

    it("rejects malformed tokens", () => {
      expect(verifySessionToken("invalid")).toBeNull();
      expect(verifySessionToken("a.b.c")).toBeNull();
      expect(verifySessionToken("a.b")).toBeNull();
    });

    it("rejects oversized tokens", () => {
      expect(verifySessionToken("a".repeat(2049))).toBeNull();
    });

    it("rejects tampered tokens", () => {
      const token = createSessionToken();
      const [payload, signature] = token.split(".");

      const modifiedPayload =
        payload[0] === "a" ? `b${payload.slice(1)}` : `a${payload.slice(1)}`;

      expect(
        verifySessionToken(`${modifiedPayload}.${signature}`),
      ).toBeNull();
    });

    it("rejects expired tokens", () => {
      vi.useFakeTimers();

      try {
        vi.setSystemTime(new Date("2026-10-14T12:00:00Z"));

        const token = createSessionToken();

        vi.setSystemTime(new Date("2026-10-22T12:00:00Z"));

        expect(verifySessionToken(token)).toBeNull();
      } finally {
        vi.useRealTimers();
      }
    });

    it("rejects invalid signatures", () => {
      const token = createSessionToken();
      const [payload] = token.split(".");

      expect(
        verifySessionToken(`${payload}.${"a".repeat(43)}`),
      ).toBeNull();
    });
  });
});

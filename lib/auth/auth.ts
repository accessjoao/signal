import "server-only";

export interface LoginCredentials {
  username: string;
  password: string;
}

export function validateCredentials(
  username: unknown,
  password: unknown,
): LoginCredentials | null {
  if (
    typeof username !== "string" ||
    typeof password !== "string"
  ) {
    return null;
  }

  const normalizedUsername = username.trim();

  if (!normalizedUsername || !password.trim()) {
    return null;
  }

  return {
    username: normalizedUsername,
    password,
  };
}

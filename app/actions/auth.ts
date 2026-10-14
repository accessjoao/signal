"use server";

import { redirect } from "next/navigation";

import { validateCredentials } from "../../lib/auth/auth";
import { createSession, deleteSession } from "../../lib/auth/session";

export type LoginState = {
  error: string | null;
};

export async function login(
  _previousState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const credentials = validateCredentials(
    formData.get("username"),
    formData.get("password"),
  );

  if (!credentials) {
    return {
      error: "Please enter a username and password.",
    };
  }

  await createSession();

  redirect("/partner");
}

export async function logout(): Promise<void> {
  await deleteSession();

  redirect("/login");
}

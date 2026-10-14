import { Suspense } from "react";
import { redirect } from "next/navigation";
import { connection } from "next/server";

import { getSession } from "../../lib/auth/session";
import LoginForm from "./login-form";

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginPageLoading />}>
      <LoginContent />
    </Suspense>
  );
}

async function LoginContent() {
  await connection();

  const session = await getSession();

  if (session) {
    redirect("/partner");
  }

  return <LoginForm />;
}

function LoginPageLoading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F8F7F4] px-6">
      <p className="text-sm text-neutral-500">
        Loading sign in...
      </p>
    </main>
  );
}

"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

export default function GoogleButton() {
  return (
    <button
      type="button"
      onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
      className="flex w-full items-center justify-center gap-3 rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 font-medium transition hover:border-zinc-600 hover:bg-zinc-800 text-white"
    >
      <FcGoogle className="text-xl" />
      Continue with Google
    </button>
  );
}

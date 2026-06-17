"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";

import Divider from "./Divider";
import GoogleButton from "./GoogleButton";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function login(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl: "/dashboard",
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid email or password");
      return;
    }

    window.location.href = "/dashboard";
  }

  return (
    <>
      <GoogleButton />

      <Divider />

      <form onSubmit={login} className="space-y-5">
        <input
          type="email"
          placeholder="Email"
          className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-white outline-none focus:border-violet-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-white outline-none focus:border-violet-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-sm text-red-400">{error}</p>}

        <button
          disabled={loading}
          className="w-full rounded-xl bg-violet-600 py-3 font-semibold transition hover:bg-violet-500 disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-zinc-500">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="text-violet-400 hover:text-violet-300"
        >
          Create account
        </Link>
      </p>
    </>
  );
}

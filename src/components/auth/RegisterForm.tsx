"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";

import Divider from "./Divider";
import GoogleButton from "./GoogleButton";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function register(e: React.FormEvent) {
    e.preventDefault();

    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setLoading(false);
      setError(data.error);
      return;
    }

    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/dashboard",
    });
  }

  return (
    <>
      <GoogleButton />

      <Divider />

      <form onSubmit={register} className="space-y-5">
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-white outline-none focus:border-violet-500"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-white outline-none focus:border-violet-500"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-white outline-none focus:border-violet-500"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-white outline-none focus:border-violet-500"
        />

        {error && <p className="text-sm text-red-400">{error}</p>}

        <button
          disabled={loading}
          className="w-full rounded-xl bg-violet-600 py-3 font-semibold transition hover:bg-violet-500 disabled:opacity-50"
        >
          {loading ? "Creating account..." : "Create Account"}
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-zinc-500">
        Already have an account?{" "}
        <Link href="/login" className="text-violet-400 hover:text-violet-300">
          Sign In
        </Link>
      </p>
    </>
  );
}

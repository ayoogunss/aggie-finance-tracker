"use client";

import { FormEvent, useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function LoginPage() {
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const supabase = createClient();

    setLoading(true);
    setMessage("");

    if (isSigningUp) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      setMessage(
        error ? error.message : "Account created. Check your email to confirm it."
      );
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setMessage(error.message);
      } else {
        window.location.href = "/";
      }
    }

    setLoading(false);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 px-6">
      <section className="w-full max-w-md rounded-xl bg-white p-8 shadow-md">
        <h1 className="text-3xl font-bold text-[#500000]">
          Aggie Finance Tracker
        </h1>

        <h2 className="mt-3 text-xl font-semibold">
          {isSigningUp ? "Create an account" : "Sign in"}
        </h2>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="block font-medium">
              Email
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block font-medium">
              Password
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
              minLength={6}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#500000] px-4 py-2 font-medium text-white hover:bg-[#700000] disabled:opacity-50"
          >
            {loading
              ? "Please wait..."
              : isSigningUp
                ? "Create Account"
                : "Sign In"}
          </button>
        </form>

        {message && (
          <p className="mt-4 rounded-lg bg-gray-100 p-3 text-sm">{message}</p>
        )}

        <button
          type="button"
          onClick={() => {
            setIsSigningUp(!isSigningUp);
            setMessage("");
          }}
          className="mt-5 text-sm font-medium text-[#500000] hover:underline"
        >
          {isSigningUp
            ? "Already have an account? Sign in"
            : "Need an account? Sign up"}
        </button>
      </section>
    </main>
  );
}
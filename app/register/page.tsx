"use client";

import Link from "next/link";
import { useActionState } from "react";
import { registerAction, type AuthState } from "./actions";

const initialState: AuthState = { ok: true };

export default function RegisterPage() {
  const [state, formAction, pending] = useActionState(registerAction, initialState);

  return (
    <main className="min-h-screen flex items-center justify-center bg-neutral-950 text-neutral-100 px-6">
      <div className="w-full max-w-md rounded-2xl border border-neutral-800 bg-neutral-950/60 p-6">
        <h1 className="text-3xl font-serif">Criar conta</h1>

        {state.message ? (
          <p className={`mt-3 text-sm ${state.ok ? "text-emerald-300" : "text-red-300"}`}>
            {state.message}
          </p>
        ) : (
          <p className="mt-2 text-sm text-neutral-400">Entre para o arquivo sagrado dos primos.</p>
        )}

        <form action={formAction} className="mt-6 space-y-3">
          <input
            name="name"
            type="text"
            placeholder="Seu nome"
            required
            className="w-full rounded-xl bg-neutral-900 border border-neutral-800 px-4 py-3 outline-none"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            className="w-full rounded-xl bg-neutral-900 border border-neutral-800 px-4 py-3 outline-none"
          />
          <input
            name="password"
            type="password"
            placeholder="Senha (mín. 6)"
            required
            className="w-full rounded-xl bg-neutral-900 border border-neutral-800 px-4 py-3 outline-none"
          />

          <button
            disabled={pending}
            className="w-full rounded-xl bg-amber-300 py-3 font-semibold text-neutral-950 hover:bg-amber-200 transition disabled:opacity-60"
          >
            {pending ? "Criando..." : "Criar conta"}
          </button>
        </form>

        <p className="mt-4 text-sm text-neutral-400">
          Já tem conta?{" "}
          <Link className="text-amber-300 hover:underline" href="/login">
            Entrar
          </Link>
        </p>
      </div>
    </main>
  );
}
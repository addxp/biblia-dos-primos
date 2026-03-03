"use client";

import Link from "next/link";
import { useActionState } from "react";
import { loginAction } from "./actions";

type State = { ok: boolean; message?: string };
const initialState: State = { ok: true };

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <main className="min-h-screen flex items-center justify-center bg-neutral-950 text-neutral-100 px-6">
      <div className="w-full max-w-md rounded-2xl border border-neutral-800 bg-neutral-950/60 p-6">
        <h1 className="text-3xl font-serif">Entrar</h1>

        {state.message ? (
          <p className={`mt-3 text-sm ${state.ok ? "text-emerald-300" : "text-red-300"}`}>
            {state.message}
          </p>
        ) : (
          <p className="mt-2 text-sm text-neutral-400">Acesse os registros sagrados do clã.</p>
        )}

        {/* IMPORTANTE: action={formAction} */}
        <form action={formAction} className="mt-6 space-y-3">
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
            placeholder="Senha"
            required
            className="w-full rounded-xl bg-neutral-900 border border-neutral-800 px-4 py-3 outline-none"
          />

          <button
            disabled={pending}
            className="w-full rounded-xl bg-amber-300 py-3 font-semibold text-neutral-950 disabled:opacity-60"
          >
            {pending ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="mt-4 text-sm text-neutral-400">
          Não tem conta? <Link className="text-amber-300 hover:underline" href="/register">Criar conta</Link>
        </p>
      </div>
    </main>
  );
}
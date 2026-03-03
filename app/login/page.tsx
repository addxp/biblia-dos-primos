import Link from "next/link";
import { loginAction } from "./actions";

export default function LoginPage({
  searchParams,
}: {
  searchParams?: { error?: string };
}) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-neutral-950 text-neutral-100 px-6">
      <div className="w-full max-w-md rounded-2xl border border-neutral-800 bg-neutral-950/60 p-6">
        <h1 className="text-3xl font-serif">Entrar</h1>

        {searchParams?.error && (
          <p className="mt-3 text-sm text-red-300">
            Email ou senha inválidos.
          </p>
        )}

        <form action={loginAction} className="mt-6 space-y-3">
          <input name="email" type="email" placeholder="Email" required
            className="w-full rounded-xl bg-neutral-900 border border-neutral-800 px-4 py-3" />
          <input name="password" type="password" placeholder="Senha" required
            className="w-full rounded-xl bg-neutral-900 border border-neutral-800 px-4 py-3" />

          <button className="w-full rounded-xl bg-amber-300 py-3 font-semibold text-neutral-950">
            Entrar
          </button>
        </form>

        <p className="mt-4 text-sm text-neutral-400">
          Não tem conta? <Link className="text-amber-300 hover:underline" href="/register">Criar conta</Link>
        </p>
      </div>
    </main>
  );
}
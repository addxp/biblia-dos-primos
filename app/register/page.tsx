import Link from "next/link";
import { registerAction } from "./actions";

export default function RegisterPage({
  searchParams,
}: {
  searchParams?: { error?: string };
}) {
  const error = searchParams?.error;

  const msg =
    error === "1"
      ? "Preencha email e senha."
      : error === "2"
      ? "Senha precisa ter pelo menos 6 caracteres."
      : error === "3"
      ? "Não foi possível criar a conta (email pode já existir)."
      : null;

  return (
    <main className="min-h-screen flex items-center justify-center bg-neutral-950 text-neutral-100 px-6">
      <div className="w-full max-w-md rounded-2xl border border-neutral-800 bg-neutral-950/60 p-6">
        <h1 className="text-3xl font-serif">Criar conta</h1>

        {msg ? (
          <p className="mt-3 text-sm text-red-300">{msg}</p>
        ) : (
          <p className="mt-2 text-sm text-neutral-400">
            Entre para o arquivo sagrado dos primos.
          </p>
        )}

        <form action={registerAction} className="mt-6 space-y-3">
          <input
            name="name"
            type="text"
            placeholder="Seu nome"
            required
            className="w-full rounded-xl bg-neutral-900 border border-neutral-800 px-4 py-3"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            className="w-full rounded-xl bg-neutral-900 border border-neutral-800 px-4 py-3"
          />
          <input
            name="password"
            type="password"
            placeholder="Senha (mín. 6)"
            required
            className="w-full rounded-xl bg-neutral-900 border border-neutral-800 px-4 py-3"
          />

          <button className="w-full rounded-xl bg-amber-300 py-3 font-semibold text-neutral-950">
            Criar conta
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